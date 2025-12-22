"use client";

import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { Copy, Download } from "lucide-react";
import ShowToast from "@/components/Common/ShowToast";
import {
  API_MEMBER_CARD,
  API_MEMBER_CARD_DOWNLOAD,
} from "@/utils/api/APIConstant";
import {
  getApiWithOutQuery,
  downloadFile,
} from "@/utils/endpoints/common";
import MemberCardWidget from "@/components/MemberCardWidget";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";

interface MemberCardData {
  memberId: string;
  qrCodeDataUrl: string;
  email?: string;
}

const MemberCardPage = () => {
  const dispatch = useDispatch();
  const [card, setCard] = useState<MemberCardData | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      dispatch(showLoader());

      try {
        const res = await getApiWithOutQuery({
          url: API_MEMBER_CARD,
        });

        if (!res?.success) {
          ShowToast(
            res?.message || "Failed to load member card",
            "error"
          );
          return;
        }

        setCard(res.data);
      } catch (err) {
        console.error("Member card fetch failed", err);
        ShowToast("Failed to load member card", "error");
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchCard();
  }, [dispatch]);

  const handleCopy = async () => {
    if (!card?.memberId) return;
    await navigator.clipboard.writeText(card.memberId);
    ShowToast("Member ID copied", "success");
  };

  const handleDownloadQR = async () => {
    const blob = await downloadFile(API_MEMBER_CARD_DOWNLOAD);
    if (!blob) return;

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "member-qr.png";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (!card) return null;

  return (
    <>
      <Section>
        <div className="max-w-md mx-auto space-y-4">
          <MemberCardWidget />

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-2"
            >
              <Copy size={16} />
              Copy Member ID
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadQR}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download QR
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default MemberCardPage;
