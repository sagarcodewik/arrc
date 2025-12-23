"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch } from "react-redux";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import {
  CreditCard,
  RefreshCw,
  TrendingUp,
  Wallet,
  ShoppingBag,
  Fuel,
  Utensils,
  Film,
  Plane,
  HeartPulse,
  MoreHorizontal,
  Activity,
  BarChart2,
  Tag,
  SlidersHorizontal,
  Download,
  ShoppingCart,
} from "lucide-react";
import { LuDownload, LuTag } from "react-icons/lu";
import Input from "../ui/Input";
import { IoSearchOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Switch from "../ui/Swich";
import { RadioCardGroup } from "../ui/RadioButton";

import {
  API_PLAID_TRANSACTIONS_DETAILS,
  API_PLAID_TRANSACTIONS_SYNC,
} from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import SpendingChart from "@/components/TransactionsPage/SpendingChart";
import {
  exportSpendingPDF,
  exportSpendingExcel,
} from "./exportReports";
import { showLoader, hideLoader } from "@/redux/loaderSlice";
import RulesTab from "./RulesTab";

type Transaction = {
  _id: string;
  name: string;
  amount: number;
  date: string;
  pending: boolean;
  merchantName?: string;
  category?: string[] | null;
};

type DateRange = "7" | "30" | "90" | "365";
const rangeLabelMap: Record<DateRange, string> = {
  "7": "Last 7 days",
  "30": "Last 30 days",
  "90": "Last 90 days",
  "365": "Last year",
};

type StatItem = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  delta?: string;
  subLabel?: string;
};
const CATEGORY_OPTIONS = [
  {
    label: "Groceries",
    value: "groceries",
    icon: <ShoppingBag size={22} />,
    activeColor: "text-emerald-600 border-emerald-500",
  },
  {
    label: "Gas & Fuel",
    value: "gas_fuel",
    icon: <Fuel size={22} />,
    activeColor: "text-orange-500 border-orange-500",
  },
  {
    label: "Dining",
    value: "dining",
    icon: <Utensils size={22} />,
    activeColor: "text-red-500 border-red-500",
  },
  {
    label: "Shopping",
    value: "shopping",
    icon: <ShoppingCart size={22} />,
    activeColor: "text-green-600 border-green-600",
  },
  {
    label: "Entertainment",
    value: "entertainment",
    icon: <Film size={22} />,
    activeColor: "text-purple-500 border-purple-500",
  },
  {
    label: "Travel",
    value: "travel",
    icon: <Plane size={22} />,
    activeColor: "text-blue-500 border-blue-500",
  },
  {
    label: "Healthcare",
    value: "healthcare",
    icon: <HeartPulse size={22} />,
    activeColor: "text-pink-500 border-pink-500",
  },
  {
    label: "Other",
    value: "other",
    icon: <MoreHorizontal size={22} />,
    activeColor: "text-slate-600 border-slate-500",
  },
];
const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"Pie" | "Bar">("Pie");
  const [dateRange, setDateRange] = useState<DateRange>("30");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "transactions" | "reports" | "categories" | "rules"
  >("transactions");

  const menuRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const chartOptions = [
    { label: "Pie", value: "Pie" },
    { label: "Bar", value: "Bar" },
  ];

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      dispatch(showLoader());
      await getApiWithOutQuery({
        url: API_PLAID_TRANSACTIONS_SYNC,
      });

      const res = await getApiWithOutQuery({
        url: API_PLAID_TRANSACTIONS_DETAILS,
      });

      const list = Array.isArray(res?.data) ? res.data : [];
      setTransactions(list);
    } catch (e) {
      setTransactions([]);
    } finally {
      dispatch(hideLoader());
    }
  };

  const isWithinRange = (dateStr: string) => {
    const txnDate = new Date(dateStr);
    const now = new Date();

    const days = Number(dateRange);
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - days);

    return txnDate >= pastDate && txnDate <= now;
  };

  const merchantCategories = useMemo(() => {
    const map: Record<string, number> = {};

    transactions.forEach((txn) => {
      const category = txn.merchantName || "Uncategorized";
      map[category] = (map[category] || 0) + 1;
    });

    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const category = txn.category?.[0] || txn.merchantName || "Uncategorized";

      const matchesCategory = selectedCategory
        ? category === selectedCategory
        : true;

      const text = `${txn.name} ${txn.merchantName ?? ""}`.toLowerCase();

      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [transactions, search, selectedCategory]);

  const reportData = useMemo(() => {
    const spendingTxns = transactions
      .filter((t) => t.amount < 0)
      .filter((t) => isWithinRange(t.date));

    let totalSpending = 0;
    const categoryMap: Record<string, number> = {};

    spendingTxns.forEach((txn) => {
      const amount = Math.abs(txn.amount);
      totalSpending += amount;

      const category = txn.merchantName || txn.name || "Uncategorized";
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    const categories = Object.keys(categoryMap);

    return {
      totalSpending,
      categoriesCount: categories.length,
      transactionsCount: spendingTxns.length,
      avgTransaction:
        spendingTxns.length > 0 ? totalSpending / spendingTxns.length : 0,
      categoryMap,
    };
  }, [transactions, dateRange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setRangeOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryOptions = useMemo(() => {
    return merchantCategories.map((cat) => ({
      label: cat.name,
      value: cat.name,
      icon: <Tag size={22} />,
      subLabel: `${cat.count} transactions`,
    }));
  }, [merchantCategories]);

  return (
    <>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4 w-full">
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">
                  Transaction History
                </h1>
                <p className="text-slate-600 text-sm sm:text-base font-medium">
                  Track your reward earnings and investments
                </p>
              </div>
            </div>
            {/* <div className="flex gap-2 items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto">
              <Button
                variant="outline"
                size="default"
                rounded="lg"
                type="button"
                onClick={loadTransactions}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <RefreshCw size={18} className="flex-shrink-0" />{" "}
                <span>Refresh Portfolio</span>
              </Button>
            </div> */}
          </div>
        </Section>
      </AnimateSection>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-6">
            <div className="grid grid-cols-4 rounded-md bg-cyan-50 border border-cyan-200 p-1 text-md text-slate-600">
              <Button
                variant={activeTab === "transactions" ? "white" : "ghost"}
                size="sm"
                rounded="md"
                className="border-0 h-auto py-2"
                onClick={() => setActiveTab("transactions")}
              >
                📊 <span className="hidden sm:inline">Transactions</span>
              </Button>
              <Button
                variant={activeTab === "reports" ? "white" : "ghost"}
                size="sm"
                rounded="md"
                className="border-0 h-auto py-2"
                onClick={() => setActiveTab("reports")}
              >
                📈 <span className="hidden sm:inline">Reports</span>
              </Button>
              <Button
                variant={activeTab === "categories" ? "white" : "ghost"}
                size="sm"
                rounded="md"
                className="border-0 h-auto py-2"
                onClick={() => setActiveTab("categories")}
              >
                🏷 <span className="hidden sm:inline">Categories</span>
              </Button>
              <Button
                variant={activeTab === "rules" ? "white" : "ghost"}
                size="sm"
                rounded="md"
                className="border-0 h-auto py-2"
                onClick={() => setActiveTab("rules")}
              >
                ⚙️ <span className="hidden sm:inline">Rules</span>
              </Button>
            </div>

            {activeTab === "transactions" && (
              <div className="space-y-6">
                <Input
                  controlId="search"
                  placeholder="Search by merchant, transaction ID, subcategory..."
                  leftIcon={
                    <IoSearchOutline className="h-4 w-4 lg:h-5 lg:w-5" />
                  }
                  variant="default"
                  size="lg"
                  className="!bg-white shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {filteredTransactions.length === 0 ? (
                  <div className="py-16 text-center rounded-2xl border border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-blue-50">
                    <FiActivity className="text-6xl text-emerald-500 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      No Transactions Found
                    </h3>
                    <p className="text-slate-600">
                      Start shopping with our merchant partners to see your
                      transactions here.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border bg-white">
                    {filteredTransactions.map((txn) => (
                      <div
                        key={txn._id}
                        className="flex items-center justify-between border-b p-4 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {txn.merchantName || txn.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {txn.date} · {txn.category?.[0] || "General"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              txn.amount < 0
                                ? "text-green-600"
                                : "text-gray-900"
                            }`}
                          >
                            ${Math.abs(txn.amount).toFixed(2)}
                          </p>
                          {txn.pending && (
                            <p className="text-xs text-orange-500">Pending</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "reports" && (
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="grid grid-cols-1 gap-3 p-4 border-b border-slate-100 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="flex-none">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      Spending by Category
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 justify-start sm:justify-end">
                    <div className="relative" ref={menuRef}>
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label="Date range"
                        onClick={() => setRangeOpen((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-black whitespace-nowrap"
                      >
                        <span className="text-sm font-semibold">
                          {rangeLabelMap[dateRange]}
                        </span>
                        <IoIosArrowDown
                          className={`transition-transform duration-200 ${
                            rangeOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                      {rangeOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white text-sm shadow-lg">
                          {(Object.keys(rangeLabelMap) as DateRange[]).map(
                            (range) => (
                              <button
                                key={range}
                                onClick={() => {
                                  setDateRange(range);
                                  setRangeOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                                  dateRange === range
                                    ? "font-semibold text-cyan-600"
                                    : "text-gray-700"
                                }`}
                              >
                                {rangeLabelMap[range]}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    <Switch
                      value={chartType}
                      onChange={(val) => setChartType(val as "Pie" | "Bar")}
                      options={chartOptions}
                      className="rounded-2xl border border-slate-300 bg-white shrink sm:shrink-0 w-full sm:max-w-[160px] lg:max-w-[120px] lg:min-w-[120px]"
                    />
                    <div className="relative" ref={exportRef}>
                      <Button
                        variant="outline"
                        size="sm"
                        aria-label="Export"
                        onClick={() => setExportOpen((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-black whitespace-nowrap"
                      >
                        <LuDownload />{" "}
                        <span className="hidden sm:inline">Export</span>
                      </Button>
                      {exportOpen && (
                        <div className="absolute right-0 z-50 mt-2 w-40 rounded-md border bg-white shadow-lg">
                          <button
                            onClick={() => {
                              exportSpendingPDF(reportData.categoryMap);
                              setExportOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Download PDF
                          </button>
                          <button
                            onClick={() => {
                              exportSpendingExcel(reportData.categoryMap);
                              setExportOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            Download Excel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {reportData.transactionsCount === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center px-4 min-h-[12rem] lg:min-h-[16rem] flex-auto">
                    <p className="font-medium text-slate-700">
                      No data to display
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 flex items-center justify-center max-h-[650px]">
                      <SpendingChart
                        chartType={chartType.toLowerCase() as "pie" | "bar"}
                        dataMap={reportData.categoryMap}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center lg:gap-6 p-4 border-t border-slate-100">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                          ${reportData.totalSpending.toFixed(2)}
                        </h3>
                        <p>Total Spending</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {reportData.categoriesCount}
                        </h3>
                        <p>Categories</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                          {reportData.transactionsCount}
                        </h3>
                        <p>Transactions</p>
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                          ${reportData.avgTransaction.toFixed(2)}
                        </h3>
                        <p>Avg per Transaction</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "categories" && (
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                  <h3 className="text-2xl font-semibold sm:text-lg text-slate-900 leading-none tracking-tight flex items-center gap-2">
                    <LuTag className="w-5 h-5 text-indigo-600" /> Spending by
                    Category
                  </h3>
                </div>
                <div className="w-full p-4 flex flex-col gap-3">
                  {categoryOptions.length > 0 ? (
                    <RadioCardGroup
                      name="category"
                      value={selectedCategory || ""}
                      onChange={(val) => {
                        setSelectedCategory(val);
                        setActiveTab("transactions");
                      }}
                      className="grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                      options={CATEGORY_OPTIONS}
                    />
                  ) : (
                    <p className="text-center text-slate-500">
                      No categories found
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div className="flex flex-col gap-6">
                <RulesTab />
              </div>
            )}
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default TransactionsPage;