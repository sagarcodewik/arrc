"use client";

import { useRouter } from "next/navigation";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import {TrendingUp, CreditCard, QrCode, Copy, Download,} from "lucide-react";
import ShowToast from "@/components/Common/ShowToast";

const MEMBER_ID = "2542041";
const QR_IMAGE_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/40b836f82_generated_image.png";

const MemberCardPage = () => {
  const router = useRouter();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MEMBER_ID);
      ShowToast("Member ID copied", "success");
    } catch {
      ShowToast("Failed to copy Member ID", "error");
    }
  };
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(QR_IMAGE_URL);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ARRC-member-qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      ShowToast("Failed to download QR code", "error");
    }
  };

  return (
    <AnimateSection>
      <Section customClass="relative mb-6">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-2 lg:col-start-3 mx-auto flex flex-col gap-4 lg:gap-6">
            <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                <QrCode className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-600" />
                <h3 className="text-slate-900 text-base lg:text-lg font-semibold tracking-tight">Your ARRC Member Card</h3>
              </div>
              <div className="p-6 space-y-4 lg:space-y-6">
                <div className="text-center space-y-3 lg:space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs lg:text-sm font-medium text-slate-600">ARRC Member ID</p>
                    <div className="flex items-center justify-center gap-2 lg:gap-3 flex-wrap">
                      <div className="inline-flex items-center rounded-full font-semibold text-base font-mono bg-cyan-100/50 text-cyan-800 px-3 lg:px-4 py-1 lg:py-2 border border-cyan-200/60">{MEMBER_ID}</div>
                      <Button size="icon" variant="slateSoft" rounded="lg" onClick={handleCopy}><Copy className="w-3 h-3 lg:w-4 lg:h-4" /></Button>
                    </div>
                  </div>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="bg-white p-3 lg:p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
                      <img src={QR_IMAGE_URL} alt="ARRC QR Code" className="w-36 h-36 lg:w-48 lg:h-48 object-contain mx-auto"/>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs lg:text-sm text-slate-600 px-2">Show this QR code at participating merchants to earn rewards</p>
                      <Button variant="outline" size="default" type="button" className="inline-flex items-center justify-center gap-2" onClick={handleDownloadQR}>
                        <Download className="w-3 h-3 lg:w-4 lg:h-4" /> Download QR Code
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
                  <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">How to use:</h4>
                  <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
                    <li>Show QR code at checkout for instant rewards</li>
                    <li>Use your 7-digit ARRC ID if QR code can’t be scanned</li>
                    <li>Both methods automatically track your purchases</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-sky-200/50 bg-gradient-to-r from-sky-100/50 to-blue-100/50 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="p-5 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-sky-200/50 flex items-center justify-center"><CreditCard className="w-7 h-7 lg:w-8 lg:h-8 text-slate-700" /></div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-1">Ready for the next step?</h3>
                    <p className="text-sm lg:text-base text-slate-600">Connect your investment accounts to start earning rewards with every purchase.</p>
                  </div>
                  <Button variant="sky" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 w-full sm:w-auto" onClick={() => router.push("/accounts")}>
                    <CreditCard className="w-4 h-4" /><span>Link your accounts</span><TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:col-span-4 lg:col-span-4 lg:col-start-2 mx-auto flex flex-col gap-4 lg:gap-6">
            <div className="rounded-2xl border border-sky-200/50 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-3 text-center">Start Earning Rewards Today</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">At Checkout:</h4>
                  <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc">
                    <li>Show your QR code to the cashier</li>
                    <li>Or provide your 7-digit ARRC ID</li>
                    <li>Earn instant cashback rewards</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">Automatic Investment:</h4>
                  <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc">
                    <li>Rewards are automatically invested</li>
                    <li>Build your portfolio with every purchase</li>
                    <li>Track growth in your dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </AnimateSection>
  );
};

export default MemberCardPage;


// "use client";
// import { useEffect } from "react";
// import AnimateSection from "../AnimateSection";
// import Section from "../Section";
// import { Button } from "../ui/Button";
// import { TrendingUp, CreditCard, QrCode, Copy, Download,} from "lucide-react";

// const MemberCardPage = () => {

//   return (
//     <>
//     <AnimateSection>
//      <Section customClass="relative mb-6">
//       <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
//         <div className="sm:col-span-2 lg:col-span-2 lg:col-start-3 mx-auto flex flex-col gap-4 lg:gap-6">
//           <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
//           <div className="p-4 flex items-center gap-2 border-b border-slate-100">
//             <QrCode className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-600" />
//             <h3 className="text-slate-900 text-base lg:text-lg font-semibold tracking-tight">Your ARRC Member Card</h3>
//           </div>
//           <div className="p-6 space-y-4 lg:space-y-6">
//             <div className="text-center space-y-3 lg:space-y-4">
//               <div className="space-y-2">
//                 <p className="text-xs lg:text-sm font-medium text-slate-600">ARRC Member ID</p>
//                 <div className="flex items-center justify-center gap-2 lg:gap-3 flex-wrap">
//                   <div className="inline-flex items-center rounded-full font-semibold text-base font-mono bg-cyan-100/50 text-cyan-800 px-3 lg:px-4 py-1 lg:py-2 border border-cyan-200/60">2542041</div>
//                   <Button size="icon" variant="slateSoft" rounded="lg" className=""><Copy className="w-3 h-3 lg:w-4 lg:h-4" /></Button>
//                 </div>
//               </div>
//               <div className="space-y-3 lg:space-y-4">
//                 <div className="bg-white p-3 lg:p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
//                   <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/40b836f82_generated_image.png" alt="ARRC QR Code" className="w-36 h-36 lg:w-48 lg:h-48 object-contain mx-auto"/>
//                 </div>
//                 <div className="space-y-2">
//                   <p className="text-xs lg:text-sm text-slate-600 px-2"> Show this QR code at participating merchants to earn rewards</p>
//                   <Button variant="outline" size="default" type="button" className="inline-flex items-center justify-center gap-2"> <Download className="w-3 h-3 lg:w-4 lg:h-4" />{" "} Download QR Code</Button>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
//               <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">How to use:</h4>
//               <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
//                 <li>Show QR code at checkout for instant rewards</li>
//                 <li>Use your 7-digit ARRC ID if QR code can’t be scanned</li>
//                 <li>Both methods automatically track your purchases</li>
//               </ul>
//             </div>
//           </div>
//           </div>
//           <div className="rounded-2xl border border-sky-200/50 bg-card text-card-foreground bg-gradient-to-r from-sky-100/50 to-blue-100/50 shadow-lg hover:shadow-2xl transition-all duration-500">
//           <div className="p-5 lg:p-6">
//             <div className="flex flex-col items-center text-center space-y-4">
//               <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-sky-200/50 flex items-center justify-center"> <CreditCard className="w-7 h-7 lg:w-8 lg:h-8 text-slate-700" /> </div>
//               <div>
//                 <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-1">Ready for the next step?</h3>
//                 <p className="text-sm lg:text-base text-slate-600"> Connect your investment accounts to start earning rewards with every purchase.</p>
//               </div>
//               <Button variant="sky" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors w-full sm:w-auto">
//                 <CreditCard className="w-4 h-4" />{" "} <span>Link your accounts</span>{" "} <TrendingUp className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//           </div>
//         </div>
//         <div className="sm:col-span-4 lg:col-span-4 lg:col-start-2 mx-auto flex flex-col gap-4 lg:gap-6">
//          <div className="rounded-2xl border border-sky-200/50 bg-card text-card-foreground bg-white shadow-lg hover:shadow-2xl transition-all duration-500 p-4 lg:p-6">
//             <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-3 text-center">Start Earning Rewards Today</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
//               <div className="bg-white">
//                 <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">At Checkout:</h4>
//                 <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
//                   <li>Show your QR code to the cashier</li>
//                   <li>Or provide your 7-digit ARRC ID</li>
//                   <li>Earn instant cashback rewards</li>
//                 </ul>
//               </div>
//               <div className="bg-white">
//                 <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">Automatic Investment:</h4>
//                 <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
//                   <li>Rewards are automatically invested</li>
//                   <li>Build your portfolio with every purchase</li>
//                   <li>Track growth in your dashboard</li>
//                 </ul>
//               </div>
//             </div>
//          </div>
//         </div>
//       </div>
//      </Section>
//     </AnimateSection>
//     </>
//   );
// };

// export default MemberCardPage;