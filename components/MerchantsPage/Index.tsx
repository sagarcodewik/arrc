"use client";
import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import { CircleCheckBig, Filter, Plus, RefreshCw, Sparkles, Trash2, Zap } from "lucide-react";
import { FaCircleNotch } from "react-icons/fa";

const MerchantsPage = () => {
  const [active, setActive] = useState(false);
  
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {if (openAccountModal) {setShowFirst(true); setCompleted(false);}}, [openAccountModal]);

  useEffect(() => {
    if (!showFirst) {
      const timer = setTimeout(() => setCompleted(true), 4000);
      const closeTimer = setTimeout(() => setOpenAccountModal(false), 8000);
      return () => {clearTimeout(timer); clearTimeout(closeTimer);};
    }
  }, [showFirst]);

  return (
    <>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4 w-full">
            <div className="flex-1">
            <div className="text-center md:text-left">
              <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">Merchant Partners</h1>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Shop with our partners and earn stock rewards</p>
            </div>
            </div>
            <div className="flex gap-2 items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto">
             <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap"><RefreshCw size={18} className="flex-shrink-0"/> <span>Refresh Data</span></Button>
            </div>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2 lg:gap-3">
             <div className="flex items-center gap-2 w-full sm:w-auto">
               <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-slate-500" />
               <span className="text-xs lg:text-sm font-medium text-slate-600">Filter by category:</span>
             </div>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">All Categories</Button>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-purple-200 shadow-purple-100 shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
              <span className="text-3xl">🏦</span>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 tracking-tight">Charles Schwab IRA (Demo)</h3>
                <p className="text-sm text-slate-600">Charles Schwab</p>
              </div>
              </div>
              <div className="flex flex-col items-end gap-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border-emerald-200">
                <CircleCheckBig size={14} className="mr-1" /> connected
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300">
                <Sparkles size={14} className="mr-1" /> Demo
              </div>
              </div>
              </div>
              <div className="p-6 pt-0 space-y-4 flex-grow">
              <div className="p-4 rounded-2xl border bg-purple-50/70 border-purple-200/80">
              <div className="text-sm text-slate-500">Current Balance</div>
              <div className="text-2xl font-bold text-slate-900">$75,000.00</div>
              <p className="text-xs text-purple-600 mt-1">Sample balance for testing</p>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
              <p><strong>Account Type:</strong> <span className="capitalize">ira</span></p>
              <p><strong>Account Number:</strong> •••• 9012</p>
              <p><strong>Last Sync:</strong> 12/9/2025, 3:53:08 PM</p>
              </div>
              </div>
              <div className="p-6 pt-0">
              <Button variant="dangerOutline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full"><Trash2 size={18} className="flex-shrink-0"/> <span>Remove Demo</span></Button>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-purple-200 shadow-purple-100 shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
              <span className="text-3xl">⚓</span>
              <div>
                <h3 className="font-semibold text-lg text-slate-900 tracking-tight">Vanguard Roth IRA (Demo)</h3>
                <p className="text-sm text-slate-600">Vanguard</p>
              </div>
              </div>
              <div className="flex flex-col items-end gap-2">
               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border-emerald-200">
                <CircleCheckBig size={14} className="mr-1" /> connected
               </div>
               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300">
                <Sparkles size={14} className="mr-1" /> Demo
               </div>
              </div>
              </div>
              <div className="p-6 pt-0 space-y-4 flex-grow">
               <div className="p-4 rounded-2xl border bg-purple-50/70 border-purple-200/80">
                <div className="text-sm text-slate-500">Current Balance</div>
                <div className="text-2xl font-bold text-slate-900">$75,000.00</div>
                <p className="text-xs text-purple-600 mt-1">Sample balance for testing</p>
               </div>
               <div className="text-xs text-slate-500 space-y-1">
                <p><strong>Account Type:</strong> <span className="capitalize">roth ira</span></p>
                <p><strong>Account Number:</strong> •••• 5678</p>
                <p><strong>Last Sync:</strong> 12/9/2025, 3:53:08 PM</p>
               </div>
              </div>
              <div className="p-6 pt-0">
              <Button variant="dangerOutline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full"><Trash2 size={18} className="flex-shrink-0"/> <span>Remove Demo</span></Button>
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-purple-200 shadow-purple-100 shadow-sm flex flex-col h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 flex items-start justify-between gap-4">
               <div className="flex items-center gap-3">
               <span className="text-3xl">🏛️</span>
               <div>
                <h3 className="font-semibold text-lg text-slate-900 tracking-tight">Fidelity Brokerage (Demo)</h3>
                <p className="text-sm text-slate-600">Fidelity</p>
               </div>
               </div>
               <div className="flex flex-col items-end gap-2">
               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 border-emerald-200">
                <CircleCheckBig size={14} className="mr-1" /> connected
               </div>
               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300">
                <Sparkles size={14} className="mr-1" /> Demo
               </div>
               </div>
              </div>
              <div className="p-6 pt-0 space-y-4 flex-grow">
               <div className="p-4 rounded-2xl border bg-purple-50/70 border-purple-200/80">
                <div className="text-sm text-slate-500">Current Balance</div>
                <div className="text-2xl font-bold text-slate-900">$25,000.00</div>
                <p className="text-xs text-purple-600 mt-1">Sample balance for testing</p>
               </div>
               <div className="text-xs text-slate-500 space-y-1">
                <p><strong>Account Type:</strong> <span className="capitalize">brokerage</span></p>
                <p><strong>Account Number:</strong> •••• 1234</p>
                <p><strong>Last Sync:</strong> 12/9/2025, 3:53:08 PM</p>
               </div>
              </div>
              <div className="p-6 pt-0">
              <Button variant="dangerOutline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full"><Trash2 size={18} className="flex-shrink-0"/> <span>Remove Demo</span></Button>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>

      {/* Modal Start */}
      <Modal open={openAccountModal} onClose={() => setOpenAccountModal(false)} variant="transparent" rounded="none" maxWidth="2xl" showCloseButton={false}>
        <div className="flex flex-col gap-6 w-full text-slate-700 lg:p-4">
          {showFirst ? (
            <div className="rounded-2xl border bg-white/95 backdrop-blur-sm border-purple-200 shadow-lg">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2 text-purple-600"><Sparkles /> Explore with Demo Mode</h3>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-900 mb-3 font-semibold">🎮 Try ARRC Risk-Free</p>
                  <p className="text-purple-800 text-sm mb-4">Plaid integration isn't configured yet, but you can explore all features with realistic demo accounts!</p>
                  <div className="bg-white/50 rounded p-3 border border-purple-200">
                    <p className="text-sm text-purple-700"><strong>Demo accounts include:</strong></p>
                    <ul className="list-disc list-inside ml-2 mt-2 space-y-1 text-sm text-purple-700">
                      <li>Fidelity Brokerage - $25,000</li>
                      <li>Vanguard Roth IRA - $50,000</li>
                      <li>Charles Schwab IRA - $75,000</li>
                    </ul>
                  </div>
                </div>
                <Button variant="gradientPurplePink" size="default" rounded="lg" className="inline-flex items-center justify-center gap-2 w-full" onClick={() => setShowFirst(false)}><Sparkles /> Create Demo Accounts</Button>
                <p className="text-xs text-center text-slate-500">Perfect for testing and seeing how ARRC works! 🚀</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl border bg-white/95 backdrop-blur-sm border-purple-200 shadow-lg min-h-64">
              {!completed ? (
                <div className="w-full h-full flex flex-col gap-2">
                  <div className="w-full text-center"><FaCircleNotch size={28} className="text-green-700 animate-spin mx-auto" /></div>
                  <h3 className="text-xl font-bold text-center">Creating Demo Accounts...</h3>
                  <p className="text-sm font-normal text-center antialiased">Setting up your demo accounts for exploration.</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-2">
                  <div className="w-full text-center relative">
                    <CircleCheckBig size={36} className="text-green-700 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex animate-ping opacity-75"/>
                    <CircleCheckBig size={50} className="text-green-700 mx-auto animate-pulse"/>
                  </div>
                  <h3 className="text-xl font-bold text-center">Demo Accounts Created!</h3>
                  <p className="text-sm font-normal text-center antialiased">Your demo accounts are ready to explore. These are sample accounts for testing.</p>
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 border-purple-300 w-fit mx-auto"><Sparkles size={14} className="mr-1" /> Demo Mode</div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default MerchantsPage;
