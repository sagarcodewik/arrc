"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { Copy, Download } from "lucide-react";
import ShowToast from "@/components/Common/ShowToast";
import { API_MEMBER_CARD,API_MEMBER_CARD_DOWNLOAD } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { downloadFile } from "@/utils/endpoints/common";
import MemberCardWidget from "@/components/MemberCardWidget";


interface MemberCardData {
  memberId: string;
  qrCodeDataUrl: string;
  email?: string;
}

const MemberCardPage = () => {
  const [card, setCard] = useState<MemberCardData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      const res = await getApiWithOutQuery({
        url: API_MEMBER_CARD,
      });

      if (!res?.success) {
        ShowToast(res?.message || "Failed to load member card", "error");
        setLoading(false);
        return;
      }

      setCard(res.data);
      setLoading(false);
    };

    fetchCard();
  }, []);

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


  if (loading) {
    return (
      <Section>
        <div className="text-center text-slate-500">Loading member card...</div>
      </Section>
    );
  }

  if (!card) return null;

  return (
    <>
 <Section>
  <div className="max-w-md mx-auto">
    <MemberCardWidget />
  </div>
</Section>
    </>
  );
};

export default MemberCardPage;
