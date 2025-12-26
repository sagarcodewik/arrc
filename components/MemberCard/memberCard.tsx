"use client";

import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { Copy, CreditCard, Download, TrendingUp } from "lucide-react";
import ShowToast from "@/components/Common/ShowToast";
import {
  API_MEMBER_CARD,
  API_MEMBER_CARD_DOWNLOAD,
} from "@/utils/api/APIConstant";
import { getApiWithOutQuery, downloadFile } from "@/utils/endpoints/common";
import MemberCardWidget from "@/components/MemberCardWidget";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";
import { useRouter } from "next/navigation";
interface MemberCardData {
  memberId: string;
  qrCodeDataUrl: string;
  email?: string;
}

const MemberCardPage = () => {
  const dispatch = useDispatch();
  const [card, setCard] = useState<MemberCardData | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchCard = async () => {
      dispatch(showLoader());

      try {
        const res = await getApiWithOutQuery({
          url: API_MEMBER_CARD,
        });

        if (!res?.success) {
          ShowToast(res?.message || "Failed to load member card", "error");
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

          <div className="rounded-2xl border border-sky-200/50 bg-card text-card-foreground bg-gradient-to-r from-sky-100/50 to-blue-100/50 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="p-5 lg:p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-sky-200/50 flex items-center justify-center">
                  {" "}
                  <CreditCard className="w-7 h-7 lg:w-8 lg:h-8 text-slate-700" />{" "}
                </div>
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-1">
                    Ready for the next step?
                  </h3>
                  <p className="text-sm lg:text-base text-slate-600">
                    {" "}
                    Connect your investment accounts to start earning rewards
                    with every purchase.
                  </p>
                </div>
                <Button
                  variant="sky"
                  size="default"
                  rounded="lg"
                  type="button"
                  onClick={() => router.push("/Accounts")}
                  className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors w-full sm:w-auto"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Link your accounts</span>
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default MemberCardPage;
