"use client";
import { useEffect, useState, useRef } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import { CreditCard, RefreshCw, TrendingUp, Wallet, } from "lucide-react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LuLayers } from "react-icons/lu";
import Input from "../ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";

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

  // Close menu when clicking outside
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
            {/* Reports Tabes */}
            {/* <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="p-4 flex items-center justify-center gap-2 border-b border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900">Spending by Category</h3>
                <div className="flex items-center gap-2">
                <div className="relative" ref={menuRef}>
                  <Button variant="outline" size="icon" aria-label="User menu" onClick={() => setUserOpen((prev) => !prev)} className="h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">S</span>
                  </Button>

                  {userOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white text-sm shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
                      <div className="py-1">
                        <Button variant="link" className="justify-start">Profile</Button>
                        <Button variant="link" className="justify-start">Settings</Button>
                        <Button variant="link" className="justify-start">Sign out</Button>
                      </div>
                    </div>
                  )}
                </div>
                  <p>123</p>
                  <p>123</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4 min-h-48 lg:min-h-64">
                <p className="font-medium text-slate-700">No data to display</p>
              </div>
            </div> */}
          </div>
        </Section>
      </AnimateSection>

    </>
  );
};

export default TransactionsPage;
