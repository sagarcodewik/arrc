"use client";
import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { CreditCard, RefreshCw, TrendingUp, Wallet, } from "lucide-react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LuLayers } from "react-icons/lu";

type StatItem = {title: string; value: string | number; icon: React.ReactNode; delta?: string; subLabel?: string;};
const stats: StatItem[] = [
  { title: "Total Value", value: "$0.00", icon: <Wallet size={18} className="text-white" />,},
  { title: "Total Gain/Loss", value: "$0.00", delta: "0.00%", icon: <TrendingUp size={18} className="text-white" />,},
  { title: "Linked Accounts", value: 3, icon: <CreditCard size={18} className="text-white" />,},
];

const PortfolioPage = () => {
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
              <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">Your Portfolio</h1>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Track your investments and growth</p>
            </div>
            </div>
            <div className="flex gap-2 items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto">
             <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap"><RefreshCw size={18} className="flex-shrink-0"/> <span>Refresh Portfolio</span></Button>
            </div>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
           {stats.map(({ title, value, delta, icon }) => (
            <div key={title} className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="shrink-0 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{icon}</div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <p className="text-[15px] font-medium text-black line-clamp-1">{title}</p>
                  <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1">{value}</h3>
                  {delta && (<p className="text-xs lg:text-sm text-green-600 mb-0 flex items-center gap-1.5"><HiArrowTrendingUp size={18} /> {delta}</p>)}
                </div>
              </div>
            </div>
           ))}
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 h-full flex flex-col gap-4 lg:gap-6">
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <TrendingUp className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Recent Rewards</h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4 min-h-48 lg:min-h-64">
                  <p className="font-medium text-slate-700">No data to display</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4 lg:gap-6">
              <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <LuLayers className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-slate-900">Asset Distribution</h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4 min-h-48 lg:min-h-64">
                  <p className="font-medium text-slate-700">No data to display</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-6 lg:col-span-6 flex flex-col gap-2">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900">Holdings</h3>
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4 min-h-48 lg:min-h-64">
                  <div className="relative">
                    <div className="h-26 w-26 rounded-full overflow-hidden">
                      <TrendingUp className="h-full w-full rounded-full object-cover text-cyan-600"/>
                    </div>
                  </div>
                  <p className="font-medium text-slate-700">Your Portfolio is Empty</p>
                  <p className="text-sm text-slate-500 mt-1">Start shopping with our merchant partners to earn stock rewards and build your portfolio.</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default PortfolioPage;
