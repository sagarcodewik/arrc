"use client";

import { useEffect, useState, useRef } from "react";
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
import { API_PORTFOLIO_GET } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { useLivePrices } from "../useLivePrices";
import HoldingsPerformanceChart from "@/components/HoldingsPerformanceChart";
import AssetDistributionChart from "@/components/AssetDistributionChart";

type StatItem = {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  delta?: string;
  subLabel?: string;
  isProfit?: boolean;
};

const PortfolioPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstLoad = useRef(true);

  /* ---------------- FETCH PORTFOLIO ---------------- */
  useEffect(() => {
    if (isFirstLoad.current) {
      fetchPortfolio(true);
      isFirstLoad.current = false;
    }
  }, []);

  const fetchPortfolio = async (showPageLoader = false) => {
    if (showPageLoader) dispatch(showLoader());
    setIsLoading(true);

    try {
      const res = await getApiWithOutQuery({ url: API_PORTFOLIO_GET });
      setData(res?.success ? res.data || [] : []);
    } catch {
      setData([]);
    } finally {
      if (showPageLoader) dispatch(hideLoader());
      setIsLoading(false);
    }
  };

  /* ---------------- LIVE ASSETS ---------------- */
  const assets = useLivePrices(data).filter(
    (item) =>
      item.assetName &&
      item.assetName !== "Unknown" &&
      item.rewardValue > 0
  );

  const totalInvested = assets.reduce(
    (sum, a) => sum + (a.rewardValue || 0),
    0
  );

  const totalValue = assets.reduce(
    (sum, a) => sum + (a.currentValue || a.rewardValue || 0),
    0
  );

  const profitLoss = totalValue - totalInvested;
  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  /* ---------------- STATS ---------------- */
  const stats: StatItem[] = [
    {
      title: "Total Value",
      value: `$${totalValue.toFixed(2)}`,
      icon: <Wallet size={20} className="text-white" />,
      iconBg: "bg-cyan-500",
    },
    {
      title: "Total Gain/Loss",
      value: (
        <div className="flex items-center gap-2">
          {profitLoss >= 0 ? (
            <TrendingUp size={18} className="text-green-500" />
          ) : (
            <TrendingDown size={18} className="text-red-500" />
          )}
          <span
            className={`font-semibold ${
              profitLoss >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitLoss >= 0 ? "+" : "-"}$
            {Math.abs(profitLoss).toFixed(2)}
          </span>
        </div>
      ),
      subLabel: `${Math.abs(profitLossPercent).toFixed(2)}%`,
      isProfit: profitLoss >= 0,
      icon: (
        <Wallet size={20} className="text-white" />
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
      {/* HEADER */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-slate-900 text-2xl font-semibold">
                Your Portfolio
              </h1>
              <p className="text-slate-600">
                Track your investments and growth
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => fetchPortfolio(false)}
              disabled={isLoading}
              className="flex gap-2"
            >
              <RefreshCw className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Refreshing..." : "Refresh Portfolio"}
            </Button>
          </div>
        </Section>
      </AnimateSection>

      {/* STATS */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map(({ title, value, icon, iconBg, subLabel, isProfit }) => (
              <div
                key={title}
                className="group rounded-xl p-4 bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-xl ${iconBg}`}
                  >
                    {icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{title}</p>

                    {/* 🔥 FIXED VALUE RENDER */}
                    <h3 className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
                      {value}
                    </h3>

                    {subLabel && (
                      <p
                        className={`text-sm font-bold ${
                          isProfit ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {isProfit ? "+" : "-"}
                        {subLabel}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </AnimateSection>

      {/* CHARTS */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4">
              <h3 className="flex items-center gap-2 font-semibold mb-4">
                <TrendingUp className="text-cyan-600" />
                Holdings Performance
              </h3>
              <HoldingsPerformanceChart assets={assets} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="flex items-center gap-2 font-semibold mb-4">
                <LuLayers className="text-cyan-600" />
                Asset Distribution
              </h3>
              <AssetDistributionChart assets={assets} />
            </div>
          </div>
           <div className="col-span-1 sm:col-span-6 lg:col-span-6 flex flex-col gap-2 mt-6">
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
                        className="flex justify-between p-4 rounded-lg"
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
        </Section>
      </AnimateSection>
    </>
  );
};

export default PortfolioPage;
