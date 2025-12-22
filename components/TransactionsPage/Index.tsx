"use client";
import { useEffect, useState, useRef } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import { CreditCard, RefreshCw, TrendingUp, Wallet, ShoppingCart, ShoppingBag, Fuel, Utensils, Film, Plane, HeartPulse, MoreHorizontal,} from "lucide-react";
import { LuDownload, LuLayers, LuTag } from "react-icons/lu";
import Input from "../ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { FiActivity, FiBox, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import Switch from "../ui/Swich";
import { RadioCardGroup } from "../ui/RadioButton";


type StatItem = {title: string; value: string | number; icon: React.ReactNode; delta?: string; subLabel?: string;};
const stats: StatItem[] = [
  { title: "Total Value", value: "$0.00", icon: <Wallet size={18} className="text-white" />,},
  { title: "Total Gain/Loss", value: "$0.00", delta: "0.00%", icon: <TrendingUp size={18} className="text-white" />,},
  { title: "Linked Accounts", value: 3, icon: <CreditCard size={18} className="text-white" />,},
];

const TransactionsPage = () => {
  const [active, setActive] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef(null);
  const [category, setCategory] = useState("shopping");
  const [value, setValue] = useState("Pie");

  const options = [
    { label: "Pie", value: "Pie" },
    { label: "Bar", value: "Bar" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userRef = useRef<HTMLDivElement>(null);
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
              <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">Transaction History</h1>
              <p className="text-slate-600 text-sm sm:text-base font-medium">Track your reward earnings and investments</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6">
            <div className="grid grid-cols-4 rounded-md bg-cyan-50 border border-cyan-200 p-1 text-md text-slate-600">
              <Button variant={active ? "ghost" : "white"} size="sm" rounded="md" className="border-0 h-auto py-2">📊 <span className="hidden sm:inline">Transactions</span></Button>
              <Button variant={active ? "white" : "ghost"} size="sm" rounded="md" className="border-0 h-auto py-2">📈 <span className="hidden sm:inline">Reports</span></Button>
              <Button variant={active ? "white" : "ghost"} size="sm" rounded="md" className="border-0 h-auto py-2">🏷 <span className="hidden sm:inline">Categories</span></Button>
              <Button variant={active ? "white" : "ghost"} size="sm" rounded="md" className="border-0 h-auto py-2">⚙️ <span className="hidden sm:inline">Rules</span></Button>
            </div>
            <div className="space-y-6">
              <Input controlId="search" placeholder="Search by merchant, transaction ID, subcategory..." leftIcon={<IoSearchOutline className="h-4 w-4 lg:h-5 lg:w-5" />} variant="default" size="lg" className="!bg-white shadow-sm"/>
              <div className="py-16 text-center rounded-2xl border border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-blue-50">
                <FiActivity className="text-6xl text-emerald-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Transactions Found</h3>
                <p className="text-slate-600">Start shopping with our merchant partners to see your transactions here.</p>
              </div>
            </div>
            {/* Reports Tabes Start*/}
            <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">  
              <div className="grid grid-cols-1 gap-3 p-4 border-b border-slate-100 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="flex-none">
                 <h3 className="text-base sm:text-lg font-semibold text-slate-900">Spending by Category</h3>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2 justify-start sm:justify-end">
                  <div className="relative" ref={menuRef}>
                    <Button variant="outline" size="sm" aria-label="Date range" onClick={() => setUserOpen((prev) => !prev)} className="inline-flex items-center gap-1.5 text-black whitespace-nowrap">
                      <span className="text-sm font-semibold">Last 30 days</span>
                      <IoIosArrowDown className={`transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}/>
                    </Button>
                    {userOpen && (
                      <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                        <Link href="#" className="block px-4 py-2 hover:bg-gray-50">Profile</Link>
                        <Link href="#" className="block px-4 py-2 hover:bg-gray-50">Settings</Link>
                        <Link href="#" className="block px-4 py-2 hover:bg-gray-50 text-red-600">Sign out</Link>
                      </div>
                    )}
                  </div>
                  <Switch value={value} onChange={setValue} options={options} className=" rounded-2xl border border-slate-300 bg-white shrink sm:shrink-0 w-full sm:max-w-[160px] lg:max-w-[120px] lg:min-w-[120px]"/>
                  <Button variant="outline" size="sm" aria-label="Export" className="inline-flex items-center gap-1.5 text-black whitespace-nowrap">
                    <LuDownload /> <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>
              {/* Empty State */}
              <div className="flex flex-col items-center justify-center text-center px-4 min-h-[12rem] lg:min-h-[16rem] flex-auto">
                <p className="font-medium text-slate-700">No data to display</p>
              </div>
              {/* Bottom Containt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center lg:gap-6 p-4 border-t border-slate-100">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">$0.00</h3>
                  <p>Total Spending</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">$0.00</h3>
                  <p>Total Spending</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">$0.00</h3>
                  <p>Total Spending</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900">$0.00</h3>
                  <p>Total Spending</p>
                </div>
              </div>
            </div>
            {/* Categories Tabes Start*/}
            <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="text-2xl font-semibold sm:text-lg text-slate-900 leading-none tracking-tight flex items-center gap-2"><LuTag className="w-5 h-5 text-indigo-600"/> Spending by Category</h3>
              </div>
              <div className="w-full p-4 flex flex-col gap-3">
                <RadioCardGroup
                  name="category"
                  value={category}
                  onChange={setCategory}
                  className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                  options={[
                    {label: "Groceries",value: "groceries",icon: <ShoppingBag size={22} />,},
                    {label: "Gas & Fuel",value: "gas_fuel",icon: <Fuel size={22} />,},
                    {label: "Dining",value: "dining",icon: <Utensils size={22} />,},
                    {label: "Shopping",value: "shopping",icon: <ShoppingCart size={22} />,},
                    {label: "Entertainment",value: "entertainment",icon: <Film size={22} />,},
                    {label: "Travel",value: "travel",icon: <Plane size={22} />,},
                    {label: "Healthcare",value: "healthcare",icon: <HeartPulse size={22} />,},
                    {label: "Other",value: "other",icon: <MoreHorizontal size={22} />,},
                  ]}/>
                  <div className="p-3 bg-slate-50 rounded-lg text-center border border-slate-200"><p className="text-sm text-slate-600">Filter transactions by <span className="font-semibold">Other</span></p></div>
              </div>
            </div>
            {/* Rules Tabes Start*/}
            <div className="flex flex-col gap-6">
              <div className="h-full rounded-2xl bg-cyan-50 border border-cyan-200 transition-all duration-500 flex flex-col">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-2xl font-semibold sm:text-lg text-slate-900 leading-none tracking-tight flex items-center gap-2"><LuTag className="w-5 h-5 text-indigo-600"/> Spending by Category</h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                <p className="text-sm text-cyan-700">Transactions are automatically categorized based on merchant name patterns using AI-powered detection.</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">🛒</span>
                   <span className="text-xs text-slate-600 capitalize">grocery</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">⛽</span>
                   <span className="text-xs text-slate-600 capitalize">gas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">🍽️</span>
                   <span className="text-xs text-slate-600 capitalize">dining</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">🛍️</span>
                   <span className="text-xs text-slate-600 capitalize">retail</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">🎬</span>
                   <span className="text-xs text-slate-600 capitalize">entertainment</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">✈️</span>
                   <span className="text-xs text-slate-600 capitalize">travel</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">🏥</span>
                   <span className="text-xs text-slate-600 capitalize">healthcare</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white/60 border border-slate-200 rounded-lg">
                   <span className="text-xl">📦</span>
                   <span className="text-xs text-slate-600 capitalize">other</span>
                  </div>
                </div>
              </div>
              </div>
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">  
               <div className="grid grid-cols-1 gap-3 p-4 border-b border-slate-100 sm:grid-cols-[1fr_auto] sm:items-center">
                 <h3 className="text-2xl font-semibold sm:text-lg text-slate-900 leading-none tracking-tight flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-600" /> Top Merchants</h3>
               </div>
               {/* Empty State */}
               <div className="flex flex-col items-center justify-center text-center px-4 min-h-[12rem] lg:min-h-[16rem] flex-auto">
                <p className="font-medium text-slate-700">No Transaction data yet</p>
              </div>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>

    </>
  );
};

export default TransactionsPage;
