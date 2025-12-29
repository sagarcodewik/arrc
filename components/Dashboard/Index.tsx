"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";
import React, { useEffect, useMemo, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { FiActivity, FiBarChart2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getPaginationNumbers } from "@/libs/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Wallet,
  DollarSign,
  TrendingUp,
  CreditCard,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Send,
  QrCode,
  Copy,
  Download,
  Trophy,
  Star,
  Gift,
  Rocket,
  Target,
  Zap,
  Store,
  RefreshCw,
  Loader2,
} from "lucide-react";
import MemberCardWidget from "@/components/MemberCardWidget";
import { apiPost, getApi, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_PLAID_ACCOUNTS,
  API_GET_FINANCIAL_ADVISOR,
  API_PORTFOLIO_SUMMARY,
  API_SPENDING_INSIGHTS,
  API_REWARD_RECENT,
  API_PORTFOLIO_GET,
} from "@/utils/api/APIConstant";
import FinancialAdvisorAnswer from "@/components/FinancialAdvisor/FinancialAdvisorAnswer";
import { authenticateWithBiometric } from "@/libs/biometricAuth";
import { useLivePrices } from "../useLivePrices";

type StatItem = {
  title: string;
  value: string | number;
  subLabel: string;
  icon: React.ReactNode;
  delta?: string;
  showDelta?: boolean;
};

const quickQuestions = [
  "How can I reach my investment goal faster?",
  "Which merchants offer the best rewards?",
  "How should I diversify my portfolio?",
  "Tips for maximizing my rewards?",
];

const BADGES = [
  {
    icon: Star,
    title: "First Win 🎉",
    description: "Made your first purchase with rewards",
  },
  { icon: Gift, title: "Coffee Fund ☕", description: "$50 portfolio value" },
  {
    icon: Rocket,
    title: "Weekend Trip ✈️",
    description: "$250 portfolio value",
  },
  {
    icon: Target,
    title: "Smart Spender 🛍️",
    description: "25 rewarded purchases",
  },
];

const Dashboard = () => {
  const email = useSelector((state: any) => state.auth?.user?.email);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [recentRewards, setRecentRewards] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [pagination, setPagination] = useState<any>(null);
  const [loadingRewards, setLoadingRewards] = useState(false);
  console.log("recentRewards=================>", recentRewards);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [spending, setSpending] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  console.log("spending====================>", spending);
  const [portfolioSummary, setPortfolioSummary] = useState<{
    totalInvested: number;
    totalValue: number;
    totalRewards: number;
    totalPendingRewards: number;
    pendingDelta: number;
    totalProfitLoss: number;
  } | null>(null);

  const fetchPortfolio = async (showPageLoader = false) => {
    try {
      const res = await getApiWithOutQuery({
        url: API_PORTFOLIO_GET,
      });

      if (res?.success) {
        setData(res.data || []);
      } else {
        setData([]);
      }
    } catch (error) {
      setData([]);
    } finally {
      if (showPageLoader) {
        dispatch(hideLoader());
      }
    }
  };
  const assets = useLivePrices(data).filter(
    (item) =>
      item.assetName && item.assetName !== "Unknown" && item.investedAmount > 0
  );

  console.log("assets=============>", assets);
  const totalInvested = assets.reduce((s, a) => s + (a.investedAmount || 0), 0);

  const totalValue = assets.reduce(
    (s, a) => s + (a.currentValue || a.investedAmount || 0),
    0
  );

  const profitLoss = totalValue - totalInvested;

  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  console.log("portfolioSummary========>", portfolioSummary);

  const loadPortfolioSummary = async () => {
    try {
      const res = await getApiWithOutQuery({
        url: API_PORTFOLIO_SUMMARY,
      });

      if (res?.success) {
        setPortfolioSummary(res.data);
      }
    } catch (err) {
      console.error("Failed to load portfolio summary", err);
    }
  };
  const handleQuickClick = (q: string) => {
    setQuestion(q);
    setIsOpen(true);
  };
  const handleAskAnotherQuestion = () => {
    setAnswer("");
    setAiError(null);
    setQuestion("");
    setIsOpen(true);
  };
  useEffect(() => {
    const loadSpending = async () => {
      const res = await getApiWithOutQuery({
        url: API_SPENDING_INSIGHTS,
      });

      if (res?.success) {
        setSpending(res.data);
      }
    };

    loadSpending();
  }, []);

  const handleLinkAccount = async () => {
    dispatch(showLoader());

    try {
      await authenticateWithBiometric();
      dispatch(hideLoader());
      router.push("/accounts");
    } catch (error: any) {
      dispatch(hideLoader());
      alert(error.message || "Authentication failed");
    }
  };

  useEffect(() => {
    loadAccounts();
    loadPortfolioSummary();
    loadRecentRewards();
    fetchPortfolio();
  }, []);
  const loadAccounts = async () => {
    try {
      const res = await getApiWithOutQuery({
        url: API_PLAID_ACCOUNTS,
      });

      setAccounts(res?.data || []);
    } catch (error) {
      console.error("Failed to load accounts", error);
      setAccounts([]);
    } finally {
    }
  };
  const accountCount = useMemo(
    () => accounts.filter((a) => a.account_id).length,
    [accounts]
  );
  const loadRecentRewards = async (pageNo = page) => {
    setLoadingRewards(true);

    const res = await getApi({
      url: API_REWARD_RECENT,
      page: pageNo,
      rowsPerPage: limit,
    });

    if (res?.success) {
      setRecentRewards(res.data.data);
      setPagination(res.data.pagination);
      setPage(pageNo);
    }

    setLoadingRewards(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      setAiLoading(true);
      setAiError(null);
      setAnswer("");

      const res = await apiPost({
        url: API_GET_FINANCIAL_ADVISOR,
        values: { question },
      });

      console.log("AI RESPONSE ===>", res);

      if (!res || !res.reply) {
        throw new Error("No AI reply received");
      }

      setAnswer(res.reply);
    } catch (err: any) {
      console.error("AI ERROR ===>", err);
      setAiError(err?.message || "Unable to get AI insights right now.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    dispatch(showLoader());
    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);
const actions = [
  {
    icon: QrCode,
    label: "My QR Code",
    bg: "from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500",
    onClick: () => router.push("/member-card"),
  },
  {
    icon: CreditCard,
    label: "Link Account",
    bg: "from-blue-400 to-indigo-400 hover:from-blue-500 hover:to-indigo-500",
    onClick: () => router.push("/accounts"),
  },
  {
    icon: Store,
    label: "Find Merchants",
    bg: "from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500",
    onClick: () => router.push("/merchants"),
  },
  {
    icon: TrendingUp,
    label: "View Portfolio",
    bg: "from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500",
    onClick: () => router.push("/portfolio"),
  },
];

  const stats: StatItem[] = [
    {
      title: "Portfolio Value",
      value: `$${portfolioSummary?.totalValue?.toFixed(2) ?? "0.00"}`,
      subLabel: "Total invested",
      delta:
        portfolioSummary && portfolioSummary.totalInvested > 0
          ? `${(
              ((portfolioSummary.totalValue - portfolioSummary.totalInvested) /
                portfolioSummary.totalInvested) *
              100
            ).toFixed(2)}%`
          : undefined,
      showDelta: !!portfolioSummary,
      icon: <Wallet size={18} className="text-white" />,
    },
    {
      title: "Total Rewards",
      value: `$${portfolioSummary?.totalRewards?.toFixed(2) ?? "0.00"}`,
      subLabel: "Lifetime earned",
      delta: portfolioSummary
        ? `+$${portfolioSummary.totalRewards.toFixed(2)}`
        : undefined,
      showDelta: !!portfolioSummary,
      icon: <DollarSign size={18} className="text-white" />,
    },
    {
      title: "Pending Rewards",
      value: `$${portfolioSummary?.totalPendingRewards?.toFixed(2) ?? "0.00"}`,
      subLabel: "Next investment",
      delta:
        portfolioSummary && (portfolioSummary.pendingDelta ?? 0) > 0
          ? `+$${portfolioSummary.pendingDelta.toFixed(2)}`
          : undefined,
      showDelta: (portfolioSummary?.pendingDelta ?? 0) > 0,
      icon: <TrendingUp size={18} className="text-white" />,
    },
    {
      title: "Linked Accounts",
      value: accountCount,
      subLabel: "Connected",
      showDelta: false,
      icon: <CreditCard size={18} className="text-white" />,
    },
  ];
  useEffect(() => {
    loadRecentRewards(1);
  }, []);

  const refreshDashboard = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await Promise.all([
        loadAccounts(),
        loadPortfolioSummary(),
        loadRecentRewards(),
        fetchPortfolio(),
      ]);
    } catch (err) {
      console.error("Refresh failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimateSection>
        <Section customClass="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-1xl font-bold text-slate-900">
                Welcome, {email ? email.split("@")[0] : "User"}!
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Here's your ARRC summary ✨
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshDashboard}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </Button>
          </div>
        </Section>
      </AnimateSection>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map(({ title, value, delta, icon, subLabel, showDelta }) => (
              <div
                key={title}
                className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="shrink-0 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-md shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {icon}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-black line-clamp-1">
                      {" "}
                      {title}{" "}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                      {value}
                    </h3>
                  </div>
                </div>
                <p className="text-xs lg:text-sm text-slate-500 mb-1">
                  {subLabel}
                </p>
                {showDelta && delta && (
                  <div className="text-xs lg:text-sm text-green-600">
                    <span className="font-medium">{delta}</span>
                    <span className="text-neutral-darkGray">
                      {" "}
                      from last month
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="w-full rounded-2xl border bg-card text-card-foreground bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-200/50 shadow-xl">
            <div
              className="flex flex-col space-y-1.5 p-6 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2 text-slate-900">
                  {" "}
                  <Sparkles className="w-5 h-5 text-purple-600" /> AI
                  FinancialAdvisor
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                  }}
                  className="!p-0 !h-auto"
                >
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Ask personalized questions about your finances, investments, and
                rewards.
              </p>
            </div>
            {isOpen && (
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-700">
                    Quick Questions:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map((q) => (
                      <Button
                        variant="outlineGradient"
                        key={q}
                        type="button"
                        onClick={() => handleQuickClick(q)}
                        className="justify-start !text-black !font-normal"
                      >
                        💡 {q}
                      </Button>
                    ))}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <textarea
                    className="flex w-full rounded-md border px-3 py-2 text-sm ..."
                    placeholder="Ask about investment strategies..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />

                  {/* <Button
                    variant="gradientPurpleBlue"
                    type="submit"
                    disabled={!question.trim() || aiLoading}
                    className="w-full gap-2 shadow-lg"
                  >
                    {aiLoading ? (
                      "Analyzing..."
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Get AI Insights
                      </>
                    )}
                  </Button> */}
                  <Button
                    variant="gradientPurpleBlue"
                    type="submit"
                    disabled={!question.trim() || aiLoading}
                    className="w-full gap-2 shadow-lg flex items-center justify-center"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Get AI Insights</span>
                      </>
                    )}
                  </Button>
                </form>
                {answer && (
                  <FinancialAdvisorAnswer answer={answer} question={question} />
                )}
                {aiError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {aiError}
                  </div>
                )}
                {answer && (
                  <div className="flex justify-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAskAnotherQuestion}
                      className="
                            w-full 
                            border border-purple-300 
                            text-purple-700 
                            bg-white 
                            hover:bg-purple-50 
                            font-medium
                          "
                    >
                      Ask Another Question
                    </Button>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    {" "}
                    <Sparkles className="w-3 h-3 inline mr-1" />{" "}
                    <strong>AI-Powered:</strong> Responses are generated using
                    real-time data and internet grounding. Always consult with
                    financial professionals for major decisions.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-6">
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 h-full flex flex-col gap-4 lg:gap-6">
              <div className="rounded-2xl bg-white/95 border border-slate-200 shadow-xl flex flex-col">
                <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <FiActivity className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Recent Rewards
                  </h3>
                </div>
                <div className="flex-1 p-4">
                  {loadingRewards ? (
                    <p className="text-sm text-slate-500 text-center">
                      Loading rewards...
                    </p>
                  ) : recentRewards.length === 0 ? (
                    <div className="text-center text-slate-500">
                      No rewards yet
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentRewards.map((reward) => (
                        <div
                          key={reward._id}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:shadow-md transition"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              {reward.merchantName || "Unknown Merchant"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {new Date(reward.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>

                          <p className="text-sm font-semibold text-emerald-600">
                            +${Number(reward.rewardValue).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {pagination && pagination.totalPages > 1 && (
                  <div className="p-3 flex items-center justify-center gap-2 border-t border-slate-100">
                    <button
                      disabled={page === 1}
                      onClick={() => loadRecentRewards(page - 1)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition
                      ${
                        page === 1
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }
                    `}
                    >
                      Prev
                    </button>
                    {getPaginationNumbers(page, pagination.totalPages, 4).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => loadRecentRewards(p)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition
                        ${
                          p === page
                            ? "bg-slate-900 text-white"
                            : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                        }
                      `}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      disabled={page === pagination.totalPages}
                      onClick={() => loadRecentRewards(page + 1)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition
                      ${
                        page === pagination.totalPages
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                      }
                    `}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="rounded-2xl border bg-card text-card-foreground bg-gradient-to-br from-white via-white to-amber-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  {/* <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                    <FiBarChart2 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Spending Insights
                    </h3>
                  </div> */}
                  {/* <div className="rounded-2xl border bg-card text-card-foreground bg-gradient-to-br from-white via-white to-amber-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500"> */}

                  {/* HEADER (your code) */}
                  <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                    <FiBarChart2 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-slate-900">
                      Spending Insights
                    </h3>
                  </div>

                  {/* BODY */}
                  <div className="p-4 space-y-3">
                    {/* This Month */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            This Month
                          </p>
                          <p className="text-xs text-slate-500">
                            Total Spending
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ${spending?.totalSpending.toFixed(2) ?? "0.00"}
                      </p>
                    </div>

                    {/* Rewards Earned */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Rewards Earned
                          </p>
                          <p className="text-xs text-slate-500">
                            {spending
                              ? `${spending.avgRewardRate.toFixed(1)}% avg rate`
                              : "0.0% avg rate"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        ${spending?.totalRewards.toFixed(2) ?? "0.00"}
                      </p>
                    </div>

                    {/* Top Category */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Top Category
                          </p>
                          <p className="text-xs text-slate-500">
                            {spending
                              ? `$${spending.topCategoryAmount.toFixed(
                                  2
                                )} spent`
                              : "$0.00 spent"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        {spending?.topCategory ?? "No data"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50 hover:border-purple-200/60 hover:shadow-lg transition-all duration-300 hover:translate-x-[3px] hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            This Month
                          </p>
                          <p className="text-xs text-slate-500">
                            Total Spending
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        $0.00
                      </p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50 hover:border-purple-200/60 hover:shadow-lg transition-all duration-300 hover:translate-x-[3px] hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Rewards Earned
                          </p>
                          <p className="text-xs text-slate-500">
                            0.0% avg rate
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        $0.00
                      </p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-50/50 to-white/80 border border-slate-200/50 hover:border-purple-200/60 hover:shadow-lg transition-all duration-300 hover:translate-x-[3px] hover:scale-[1.01]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-2xl bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg">
                          <DollarSign size={18} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            Top Category
                          </p>
                          <p className="text-xs text-slate-500">$0.00 spent</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        No data
                      </p>
                    </div>
                  </div> */}
                {/* </div> */}
                <div className="rounded-2xl border bg-card text-card-foreground bg-gradient-to-br from-white via-white to-amber-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="p-4 flex items-center justify-between gap-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-600 animate-rotateOnce" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        Your Achievements
                      </h3>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-0.5 text-xs font-medium text-white">
                      0/6
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {BADGES.map(({ icon: Icon, title, description }) => (
                        <div
                          key={title}
                          className="p-3 rounded-lg text-center bg-slate-50 text-slate-400 border border-slate-200 grayscale hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                        >
                          <Icon className="w-6 h-6 mx-auto mb-2 text-slate-500" />
                          <p className="text-xs font-semibold text-slate-800 mb-1">
                            {title}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-snug">
                            {description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-xs text-slate-500">
                        {" "}
                        🎯 Keep going!{" "}
                        <span className="font-semibold text-cyan-600">
                          {" "}
                          6 more{" "}
                        </span>{" "}
                        to unlock
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4 lg:gap-6">
              <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <QrCode className="w-4 h-4 lg:w-5 lg:h-5 text-cyan-600" />
                  <h3 className="text-slate-900 text-base lg:text-lg font-semibold tracking-tight">
                    Your ARRC Member Card
                  </h3>
                </div> */}
                <MemberCardWidget />
                {/* <div className="p-6 space-y-4 lg:space-y-6">
                  <div className="text-center space-y-3 lg:space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs lg:text-sm font-medium text-slate-600">
                        ARRC Member ID
                      </p>
                      <div className="flex items-center justify-center gap-2 lg:gap-3 flex-wrap">
                        <div className="inline-flex items-center rounded-full font-semibold text-base font-mono bg-cyan-100/50 text-cyan-800 px-3 lg:px-4 py-1 lg:py-2 border border-cyan-200/60">
                          2542041
                        </div>
                        <Button
                          size="icon"
                          variant="slateSoft"
                          rounded="lg"
                          className=""
                        >
                          <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3 lg:space-y-4">
                      <div className="bg-white p-3 lg:p-4 rounded-xl border border-slate-200 inline-block shadow-inner">
                        <img
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/40b836f82_generated_image.png"
                          alt="ARRC QR Code"
                          className="w-36 h-36 lg:w-48 lg:h-48 object-contain mx-auto"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs lg:text-sm text-slate-600 px-2">
                          {" "}
                          Show this QR code at participating merchants to earn
                          rewards
                        </p>
                        <Button
                          variant="outline"
                          size="default"
                          type="button"
                          className="inline-flex items-center justify-center gap-2"
                        >
                          {" "}
                          <Download className="w-3 h-3 lg:w-4 lg:h-4" />{" "}
                          Download QR Code
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
                    <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">
                      How to use:
                    </h4>
                    <ul className="text-xs lg:text-sm text-sky-700 space-y-1 ps-5 list-disc list-outside">
                      <li>Show QR code at checkout for instant rewards</li>
                      <li>
                        Use your 7-digit ARRC ID if QR code can’t be scanned
                      </li>
                      <li>Both methods automatically track your purchases</li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Quick Actions
                  </h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className={`flex items-center gap-3 p-4 rounded-xl text-white bg-gradient-to-r ${action.bg}`}
                      >
                        <action.icon className="w-5 h-5" />
                        <span>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <div className="rounded-2xl border border-sky-200/50 bg-card text-card-foreground bg-gradient-to-r from-sky-100/50 to-blue-100/50 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="p-5 lg:p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-sky-200/50 flex items-center justify-center">
                    {" "}
                    <CreditCard className="w-7 h-7 lg:w-8 lg:h-8 text-slate-700" />{" "}
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-1">
                      Ready for the next step?
                    </h3>
                    <p className="text-sm lg:text-base text-slate-600">
                      {" "}
                      Connect your investment accounts to start earning rewards
                      with every purchase.
                    </p>
                  </div>
                  <Button
                    variant="sky"
                    size="default"
                    rounded="lg"
                    type="button"
                    onClick={() => router.push("/accounts")}
                    className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors w-full sm:w-auto"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Link your accounts</span>
                    <TrendingUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="h-full flex flex-col rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                <TrendingUp className="w-5 h-5 text-sky-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Portfolio Overview
                </h3>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-1">
                  <div className="flex-1 p-4 flex flex-col justify-center space-y-4 text-center">
                    <div className="space-y-1">
                      <p className="text-3xl font-bold text-slate-900">
                        ${totalValue.toFixed(2)}
                      </p>
                      <div
                        className={`flex items-center justify-center gap-1 text-sm font-medium ${
                          profitLoss >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>
                          ${profitLoss.toFixed(2)} (
                          {profitLossPercent.toFixed(1)}%)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Based on live market prices
                      </p>
                    </div>{" "}
                    {totalValue === 0 && (
                      <div className="text-xs text-slate-500">
                        <p>No portfolio data yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default Dashboard;
