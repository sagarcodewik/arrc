"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Copy, Download, QrCode } from "lucide-react";
import ShowToast from "@/components/Common/ShowToast";
import {
  API_MEMBER_CARD,
  API_MEMBER_CARD_DOWNLOAD,
} from "@/utils/api/APIConstant";
import {
  getApiWithOutQuery,
  downloadFile,
} from "@/utils/endpoints/common";

interface MemberCardData {
  memberId: string;
  qrCodeDataUrl: string;
}

const MemberCardWidget = () => {
  const [card, setCard] = useState<MemberCardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);

      const res = await getApiWithOutQuery({ url: API_MEMBER_CARD });
      if (!res?.success) {
        ShowToast("Failed to load member card", "error");
        setLoading(false);
        return;
      }

      setCard(res.data);
      setLoading(false);
    };

    fetchCard();
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const handleCopy = async () => {
    if (!card?.memberId) return;
    await navigator.clipboard.writeText(card.memberId);
    ShowToast("Member ID copied", "success");
  };

  const handleDownloadQR = async () => {
    const blob = await downloadFile(API_MEMBER_CARD_DOWNLOAD);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ARRC-member-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Loading member card...
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* HEADER */}
      <div className="p-4 flex items-center gap-2 border-b border-slate-100">
        <QrCode className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-600" />
        <h3 className="text-slate-900 text-base lg:text-lg font-semibold tracking-tight">
          Your ARRC Member Card
        </h3>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-4 lg:space-y-6">
        <div className="text-center space-y-3 lg:space-y-4">
          {/* MEMBER ID */}
          <div className="space-y-2">
            <p className="text-xs lg:text-sm font-medium text-slate-600">
              ARRC Member ID
            </p>

            <div className="flex items-center justify-center gap-2 lg:gap-3 flex-wrap">
              <div className="inline-flex items-center rounded-full font-semibold text-base font-mono bg-cyan-100/50 text-cyan-800 px-3 lg:px-4 py-1 lg:py-2 border border-cyan-200/60">
                {card.memberId}
              </div>

              <Button
                size="icon"
                variant="slateSoft"
                rounded="lg"
                onClick={handleCopy}
              >
                <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
              </Button>
            </div>
          </div>

          {/* QR CODE */}
          <div className="space-y-3 lg:space-y-4">
            <div className="bg-white p-3 lg:p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
              <Image
                src={card.qrCodeDataUrl}
                alt="ARRC QR Code"
                width={280}
                height={180}
                unoptimized
                className="w-36 h-36 lg:w-48 lg:h-48 object-contain mx-auto"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs lg:text-sm text-slate-600 px-2">
                Show this QR code at participating merchants to earn rewards
              </p>

              <Button
                variant="outline"
                size="default"
                type="button"
                className="inline-flex items-center justify-center gap-2"
                onClick={handleDownloadQR}
              >
                <Download className="w-3 h-3 lg:w-4 lg:h-4" />
                Download QR Code
              </Button>
            </div>
          </div>
        </div>

        {/* HOW TO USE */}
        <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
          <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">
            How to use:
          </h4>
          <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
            <li>Show QR code at checkout for instant rewards</li>
            <li>Use your 7-digit ARRC ID if QR can’t be scanned</li>
            <li>Both methods automatically track your purchases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberCardWidget;
