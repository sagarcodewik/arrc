"use client";
import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import {
  CreditCard,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LuLayers } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";
import { API_PORTFOLIO_GET, API_PLAID_ACCOUNTS } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { useLivePrices } from "../useLivePrices";
import { useMemo } from "react";
import { useRef } from "react";
import HoldingsPerformanceChart from "@/components/HoldingsPerformanceChart";
import AssetDistributionChart from "@/components/AssetDistributionChart";

type StatItem = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  delta?: string;
  subLabel?: string;
  isProfit?: boolean;
};

const PortfolioPage = () => {
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      fetchPortfolio(true);
      isFirstLoad.current = false;
    }
  }, []);
  const fetchPortfolio = async (showPageLoader = false) => {
    if (showPageLoader) {
      dispatch(showLoader());
    }

    setIsLoading(true);

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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (openAccountModal) {
      setShowFirst(true);
      setCompleted(false);
    }
  }, [openAccountModal]);

  useEffect(() => {
    if (!showFirst) {
      const timer = setTimeout(() => setCompleted(true), 4000);
      const closeTimer = setTimeout(() => setOpenAccountModal(false), 8000);
      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [showFirst]);

  const assets = useLivePrices(data).filter(
    (item) =>
      item.assetName && item.assetName !== "Unknown" && item.investedAmount > 0
  );

  // const totalInvested = assets.reduce((s, a) => s + (a.investedAmount || 0), 0);

  // const totalValue = assets.reduce(
  //   (s, a) => s + (a.currentValue || a.investedAmount || 0),
  //   0
  // );

  const totalInvested = assets.reduce((s, a) => s + (a.rewardValue || 0), 0);

  const totalValue = assets.reduce(
    (s, a) => s + (a.currentValue || a.rewardValue || 0),
    0
  );

  const profitLoss = totalValue - totalInvested;

  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  const stats: StatItem[] = [
    {
      title: "Total Value",
      value: `$${totalInvested.toFixed(2)}`,
      icon: <Wallet size={20} className="text-white" />,
      iconBg: "bg-cyan-500",
    },
    {
      title: "Total Gain/Loss",
      value: `$${Math.abs(profitLoss).toFixed(2)}`,
      subLabel: `${Math.abs(profitLossPercent).toFixed(2)}%`,
      isProfit: profitLoss >= 0,

      icon:
        profitLoss >= 0 ? (
          <TrendingUp size={20} className="text-white" />
        ) : (
          <TrendingDown size={20} className="text-white" />
        ),

      iconBg: profitLoss >= 0 ? "bg-green-500" : "bg-red-500",
    },
    {
      title: "Holdings",
      value: assets.length,
      icon: <CreditCard size={20} className="text-white" />,
      iconBg: "bg-purple-500",
    },
  ];

  return (
    <>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4 w-full">
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">
                  Your Portfolio
                </h1>
                <p className="text-slate-600 text-sm sm:text-base font-medium">
                  Track your investments and growth
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto">
              <Button
                variant="outline"
                size="default"
                rounded="lg"
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
                onClick={() => fetchPortfolio(false)}
                disabled={isLoading}
              >
                <RefreshCw className={isLoading ? "animate-spin" : ""} />
                {isLoading ? "Refreshing..." : "Refresh Portfolio"}
              </Button>
            </div>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {stats.map(
              ({ title, value, delta, icon, subLabel, isProfit, iconBg }) => (
                <div
                  key={title}
                  className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} shadow-md`}
                    >
                      {icon}
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-black line-clamp-1">
                        {title}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                        {value}
                      </h3>
                      {delta && (
                        <p className="text-xs lg:text-sm text-green-600 mb-0 flex items-center gap-1.5">
                          <HiArrowTrendingUp size={18} /> {delta}
                        </p>
                      )}
                      {subLabel && (
                        <div
                          className={`text-sm font-bold ${
                            isProfit === undefined
                              ? "text-gray-500"
                              : isProfit
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {isProfit !== undefined && (isProfit ? "+" : "-")}
                          {subLabel}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
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
                  <h3 className="text-lg font-semibold text-slate-900">
                    Holdings Performance
                  </h3>
                </div>
                <div className="flex-1 flex items-center justify-center px-4 min-h-48 lg:min-h-64">
                  <HoldingsPerformanceChart assets={assets} />
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4 lg:gap-6">
              <div className="rounded-2xl border bg-gradient-to-br from-white via-white to-cyan-50/30 backdrop-blur-sm border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="p-4 flex items-center gap-2 border-b border-slate-100">
                  <LuLayers className="w-5 h-5 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Asset Distribution
                  </h3>
                </div>
                <div className="flex-1 flex items-center justify-center px-4 min-h-48 lg:min-h-64">
                  <AssetDistributionChart assets={assets} />
                </div>
              </div>
            </div>
            <div className="col-span-1 sm:col-span-6 lg:col-span-6 flex flex-col gap-2">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900">
                Holdings
              </h3>
              <div className="h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">
                {assets.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 px-4 min-h-48 lg:min-h-64">
                    <div className="relative mb-4">
                      <div className="h-26 w-26 rounded-full overflow-hidden">
                        <TrendingUp className="h-full w-full rounded-full object-cover text-cyan-600" />
                      </div>
                    </div>
                    <p className="font-medium text-slate-700">
                      Your Portfolio is Empty
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Start shopping with our merchant partners to earn stock
                      rewards and build your portfolio.
                    </p>
                  </div>
                ) : (
                  <div className="p-4">
                    {assets.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between bg-[#0A1220] p-4 rounded-lg mb-3 text-white"
                      >
                        <div>
                          <div className="font-semibold">{item.assetName}</div>
                          <div className="text-sm text-gray-400">
                            {/* Invested: ${item.investedAmount.toFixed(2)} */}
                            Invested: ${item.rewardValue.toFixed(2)}

                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">
                            ${item.currentValue.toFixed(2)}
                            {/* ${item.rewardValue.toFixed(2)} */}

                          </div>
                          <div
                            className={`text-sm ${
                              item.profitLoss >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {item.profitLoss >= 0 ? "+" : "-"}$
                            {Math.abs(item.profitLoss).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default PortfolioPage;
