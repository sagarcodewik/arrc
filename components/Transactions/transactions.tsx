"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Activity,
  BarChart2,
  Tag,
  SlidersHorizontal,
  Download,
} from "lucide-react";

import {
  API_PLAID_TRANSACTIONS_DETAILS,
  API_PLAID_TRANSACTIONS_SYNC,
} from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import SpendingChart from "@/components/Transactions/SpendingChart";
import {
  exportSpendingPDF,
  exportSpendingExcel,
} from "../Transactions/exportReports";
import { useDispatch } from "react-redux";
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
export default function TransactionsPage() {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [dateRange, setDateRange] = useState<DateRange>("30");
  const [rangeOpen, setRangeOpen] = useState(false);

  const [exportOpen, setExportOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "transactions" | "reports" | "categories" | "rules"
  >("transactions");

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Transaction History
        </h1>
        <p className="text-sm text-gray-500">
          Track your reward earnings and investments
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border bg-cyan-50 p-1">
        <TabButton
          active={activeTab === "transactions"}
          icon={<Activity size={16} />}
          label="Transactions"
          onClick={() => setActiveTab("transactions")}
        />
        <TabButton
          active={activeTab === "reports"}
          icon={<BarChart2 size={16} />}
          label="Reports"
          onClick={() => setActiveTab("reports")}
        />
        <TabButton
          active={activeTab === "categories"}
          icon={<Tag size={16} />}
          label="Categories"
          onClick={() => setActiveTab("categories")}
        />
      <TabButton
        active={activeTab === "rules"}
        icon={<SlidersHorizontal size={16} />}
        label="Rules"
        onClick={() => setActiveTab("rules")}
      />
      </div>
      {activeTab === "transactions" && (
        <>
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-lg border bg-white px-10 py-3 text-sm outline-none focus:border-cyan-400"
            />
          </div>

          {filteredTransactions.length === 0 && <EmptyState />}

          {filteredTransactions.length > 0 && (
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
                        txn.amount < 0 ? "text-green-600" : "text-gray-900"
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
        </>
      )}
      {activeTab === "reports" && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Spending by Category</h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setRangeOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-md border bg-white px-3 py-1 text-sm"
                >
                  {rangeLabelMap[dateRange]}
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {rangeOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-44 rounded-md border bg-white shadow-lg">
                    {(Object.keys(rangeLabelMap) as DateRange[]).map(
                      (range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setDateRange(range);
                            setRangeOpen(false);
                          }}
                          className={`flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 ${
                            dateRange === range
                              ? "font-medium text-black"
                              : "text-gray-700"
                          }`}
                        >
                          {rangeLabelMap[range]}
                          {dateRange === range && <span>✓</span>}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => setChartType("pie")}
                className={`rounded-md px-3 py-1 text-sm ${
                  chartType === "pie" ? "bg-black text-white" : "border"
                }`}
              >
                Pie
              </button>

              <button
                onClick={() => setChartType("bar")}
                className={`rounded-md px-3 py-1 text-sm ${
                  chartType === "bar" ? "bg-black text-white" : "border"
                }`}
              >
                Bar
              </button>
              <div className="relative">
                <button
                  onClick={() => setExportOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-md border bg-white px-3 py-1 text-sm"
                >
                  <Download size={14} />
                  Export
                </button>

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
            <div className="py-20 text-center text-gray-500">
              No transaction data available for this period
            </div>
          ) : (
            <>
              <div className="mt-6 h-[320px] flex items-center justify-center">
                <SpendingChart
                  chartType={chartType}
                  dataMap={reportData.categoryMap}
                />
              </div>

              <div className="mt-10 grid grid-cols-4 gap-6 border-t pt-6 text-center">
                <Stat
                  label="Total Spending"
                  value={`$${reportData.totalSpending.toFixed(2)}`}
                />
                <Stat label="Categories" value={reportData.categoriesCount} />
                <Stat
                  label="Transactions"
                  value={reportData.transactionsCount}
                />
                <Stat
                  label="Avg per Transaction"
                  value={`$${reportData.avgTransaction.toFixed(2)}`}
                />
              </div>
            </>
          )}
        </div>
      )}
      {activeTab === "categories" && (
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Categories (by Merchant)
          </h3>

          {merchantCategories.length === 0 && (
            <p className="text-sm text-gray-500">No categories available</p>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {merchantCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setActiveTab("transactions");
                }}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition
            ${
              selectedCategory === cat.name
                ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                : "hover:bg-gray-50"
            }`}
              >
                <span className="font-medium">{cat.name}</span>
                <span className="text-xs text-gray-500">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {activeTab === "rules" && <RulesTab />}

    </div>
  );
}

function TabButton({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition
          ${
            active
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:bg-white/70"
          }
        `}
    >
      {icon}
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border bg-gradient-to-b from-green-50 to-white p-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <Activity size={28} className="text-green-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        No Transactions Found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Start shopping to see transactions here.
      </p>
    </div>
  );
}
