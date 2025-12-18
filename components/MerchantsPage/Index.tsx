"use client";
import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import { CircleCheckBig, Filter, Plus, RefreshCw, Sparkles, Trash2, Zap } from "lucide-react";
import { FaCircleNotch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { LuBuilding } from "react-icons/lu";

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
            <div className="sm:col-span-2 lg:col-span-3">
             <Input controlId="search" placeholder="Search merchants..." leftIcon={<IoSearchOutline className="h-4 w-4 lg:h-5 lg:w-5" />} variant="default" size="lg" className="!bg-white shadow-sm"/>
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2 lg:gap-3">
             <div className="flex items-center gap-2 w-full sm:w-auto">
               <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-slate-500" />
               <span className="text-xs lg:text-sm font-medium text-slate-600">Filter by category:</span>
             </div>
             <Button variant={active ? "cyan" : "cyan"} size="sm" rounded="full" className="!rounded-full h-auto py-2">All Categories</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Grocery</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Gas</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Dining</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Retail</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Entertainment</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Travel</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">Healthcare</Button>
             <Button variant={active ? "cyan" : "outline"} size="sm" rounded="full" className="!rounded-full h-auto py-2">other</Button>
            </div>
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden">
                      <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" alt="Starbucks logo" className="w-8 h-8 object-contain"/>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Starbucks</h3>
                      <p className="text-sm font-medium text-slate-500 capitalize">dining</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">⭐ Featured</span>
                </div>
              </div>
              <div className="p-6 pt-0 flex-grow space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">America's favorite coffee chain offering premium coffee, teas, and food items.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">% Reward Rate</div>
                    <div className="text-xl font-bold text-cyan-700">0.035%</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">🏢 Stock</div>
                    <div className="text-xl font-bold text-slate-800">SBUX</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span className="text-slate-500 font-medium">Price:</span>
                  <span className="font-bold text-slate-800">$262.48</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-600"><HiArrowTrendingUp /> 1.31%</span>
                  <span className="text-xs font-medium text-slate-400">(Delayed)</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full">👑 Reward Tiers</Button>
              </div>
            </div>
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg w-8 h-8 flex items-center justify-center">
                        <LuBuilding className="object-contain"/>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Target</h3>
                      <p className="text-sm font-medium text-slate-500 capitalize">retail</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">⭐ Featured</span>
                </div>
              </div>
              <div className="p-6 pt-0 flex-grow space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">One-stop shopping destination for home, clothing, electronics, and groceries.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">% Reward Rate</div>
                    <div className="text-xl font-bold text-cyan-700">0.025%</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">🏢 Stock</div>
                    <div className="text-xl font-bold text-slate-800">TGT</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span className="text-slate-500 font-medium">Price:</span>
                  <span className="font-bold text-slate-800">$187.38</span>
                  <span className="flex items-center gap-1 font-bold text-red-600"><HiArrowTrendingDown /> -0.10%</span>
                  <span className="text-xs font-medium text-slate-400">(Delayed)</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full">👑 Reward Tiers</Button>
              </div>
            </div>
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 space-y-1.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden">
                      <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg w-8 h-8 flex items-center justify-center">
                        <LuBuilding className="object-contain"/>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Apple</h3>
                      <p className="text-sm font-medium text-slate-500 capitalize">retail</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">⭐ Featured</span>
                </div>
              </div>
              <div className="p-6 pt-0 flex-grow space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">Premium technology products including iPhone, iPad, Mac, and accessories.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">% Reward Rate</div>
                    <div className="text-xl font-bold text-cyan-700">0.02%</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">🏢 Stock</div>
                    <div className="text-xl font-bold text-slate-800">AAPL</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span className="text-slate-500 font-medium">Price:</span>
                  <span className="font-bold text-slate-800">$174.80</span>
                  <span className="flex items-center gap-1 font-bold text-red-600"><HiArrowTrendingDown /> -1.02%</span>
                  <span className="text-xs font-medium text-slate-400">(Delayed)</span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full">👑 Reward Tiers</Button>
              </div>
            </div>
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 space-y-1.5">
               <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                    <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-lg"/>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">Amiri Royalty Rewards Club, LLC</h3>
                    <p className="text-sm font-medium text-slate-500 capitalize">Retail</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 whitespace-nowrap">
                  ⭐ Featured
                </span>
               </div>
              </div>
              <div className="p-6 pt-0 flex-grow space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">Premium organic and natural foods supermarket chain.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">% Reward Rate</div>
                    <div className="text-xl font-bold text-cyan-700">0.04%</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">🏢 Stock</div>
                    <div className="text-xl font-bold text-slate-800">AMZN</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full">👑 Reward Tiers</Button>
              </div>
            </div>
            <div className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
              <div className="p-6 space-y-1.5">
               <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg w-8 h-8 flex items-center justify-center">
                      <LuBuilding className="object-contain"/>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">Admin Overview</h3>
                    <p className="text-sm font-medium text-slate-500 capitalize">other</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 whitespace-nowrap">
                  ⭐ Featured
                </span>
               </div>
              </div>
              <div className="p-6 pt-0 flex-grow space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">Premium organic and natural foods supermarket chain.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">% Reward Rate</div>
                    <div className="text-xl font-bold text-cyan-700">0.04%</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-1">🏢 Stock</div>
                    <div className="text-xl font-bold text-slate-800">AMZN</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Button variant="outline" size="default" rounded="lg" type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full">👑 Reward Tiers</Button>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default MerchantsPage;
