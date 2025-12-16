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
    link.download = "ARRC-member-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="text-center text-slate-500 py-10">
        Loading member card...
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
      <div className="p-4 flex items-center gap-2 border-b border-slate-100">
        <QrCode className="w-5 h-5 text-cyan-600" />
        <h3 className="text-slate-900 text-lg font-semibold">
          Your ARRC Member Card
        </h3>
      </div>

      <div className="p-6 space-y-5 text-center">
        {/* MEMBER ID */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">
            ARRC Member ID
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full font-semibold font-mono bg-cyan-100/60 text-cyan-800 px-4 py-2 border border-cyan-200/60">
              {card.memberId}
            </span>
            <Button size="icon" variant="slateSoft" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* QR */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner inline-block">
          <Image
            src={card.qrCodeDataUrl}
            alt="ARRC QR Code"
            width={180}
            height={180}
            unoptimized
            className="mx-auto"
          />
        </div>

        <p className="text-sm text-slate-600 px-4">
          Show this QR code at participating merchants to earn rewards
        </p>

        <Button
          variant="outline"
          className="w-full flex items-center gap-2 justify-center"
          onClick={handleDownloadQR}
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </Button>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-left">
          <h4 className="font-semibold text-sky-800 mb-2 text-sm">
            How to use:
          </h4>
          <ul className="text-xs text-sky-700 space-y-1 list-disc ps-4">
            <li>Show QR code at checkout for instant rewards</li>
            <li>Use your 7-digit ARRC ID if QR can’t be scanned</li>
            <li>Purchases are tracked automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberCardWidget;
