"use client";

import React, { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import TradingViewTicker from "@/components/TradingViewTicker";
import { useMarketStatus } from "./useMarketStatus";
import { useLivePrices } from "../useLivePrices";
import { API_PORTFOLIO_GET } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ClockIcon,
  ActivityIcon,
  Package,
  Landmark,
} from "lucide-react";

const MarketsPage = () => {
  const dispatch = useDispatch();
  const { time, isOpen } = useMarketStatus();
  const [data, setData] = useState<any[]>([]);

  /* ---------------- FETCH PORTFOLIO ---------------- */
  useEffect(() => {
    const fetchPortfolio = async () => {
      dispatch(showLoader());
      try {
        const res = await getApiWithOutQuery({ url: API_PORTFOLIO_GET });
        if (res?.success) setData(res.data || []);
      } catch (err) {
        console.error("Portfolio fetch failed", err);
      } finally {
        dispatch(hideLoader());
      }
    };
    fetchPortfolio();
  }, [dispatch]);

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
  console.log("profitLoss=============>",profitLoss)
  const profitLossPercent =
    totalInvested > 0 ? (profitLoss / totalInvested) * 100 : 0;

  /* ================================================= */
  return (
    <AnimateSection>
      <Section customClass="relative mb-6">
        <div className="flex flex-col gap-6 w-full">

          {/* -------- MARKET STATUS -------- */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-lg border border-slate-800 bg-black p-3">
            <div className="flex items-center gap-3">
              <span
                className={`h-2 w-2 rounded-full ${
                  isOpen ? "bg-green-500" : "bg-red-500"
                } animate-pulse`}
              />
              <span className="text-sm font-semibold text-white">
                {isOpen ? "Markets Open" : "Markets Closed"}
              </span>
              <div className="flex items-center gap-1 text-sm text-slate-400">
                <ClockIcon className="h-4 w-4" />
                <span>{time}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ActivityIcon className="h-4 w-4 text-amber-400" />
              <span>
                Data delayed{" "}
                <span className="font-semibold text-amber-400">
                  ~15 minutes
                </span>{" "}
                • Updated continuously
              </span>
            </div>
          </div>

          {/* -------- TRADING VIEW -------- */}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-black shadow-2xl">
            <div className="flex items-center justify-between p-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-blue-400">
                <TrendingUp className="h-5 w-5" />
                Top S&P 500 Stocks – Live Prices
              </h2>
              <span className="text-xs text-slate-400">50+ stocks rotating</span>
            </div>
            <TradingViewTicker />
          </div>

          {/* -------- TITLE -------- */}
          <div className="text-center">
            <h1 className="text-white text-2xl sm:text-3xl font-semibold">
              Your ARRC Portfolio
            </h1>
            <p className="text-slate-400">
              Track the stocks you've earned through your purchases
            </p>
          </div>

          {/* -------- STATS -------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
              icon={<Wallet size={18} />}
              label="Total Portfolio Value"
              value={`$${totalValue.toFixed(2)}`}
            />

          <StatCard
              icon={<Wallet size={18} />}
              label="Total Gain / Loss"
              value={
                <span className="flex items-center gap-2">
                  {profitLoss >= 0 ? (
                    <TrendingUp size={20} className="text-green-400" />
                  ) : (
                    <TrendingDown size={20} className="text-red-400" />
                  )}

                  <span
                    className={`text-2xl font-semibold ${
                      profitLoss >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {profitLoss >= 0 ? "+" : "-"}$
                    {Math.abs(profitLoss).toFixed(2)} (
                    {profitLossPercent.toFixed(2)}%)
                  </span>
                </span>
              }
            />

            <StatCard
              icon={<Package size={18} />}
              label="Holdings"
              value={assets.length}
              sub="Different stocks"
            />
          </div>

          {/* -------- HOLDINGS -------- */}
          <div className="rounded-2xl border border-slate-800 bg-black shadow-xl">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-500" />
                Your Stock Holdings
              </h3>
            </div>

            {assets.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="p-4 space-y-3">
                {assets.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between bg-[#0A1220] p-4 rounded-lg"
                  >
                    <div>
                      <div className="font-semibold text-white">
                        {item.assetName}
                      </div>
                      <div className="text-sm text-slate-400">
                        Invested: ${item.rewardValue.toFixed(2)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-white">
                        ${item.currentValue.toFixed(2)}
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
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ icon, label, value, sub, valueClass = "text-white" }: any) => (
  <div className="rounded-xl p-4 bg-black border border-slate-800 shadow-lg">
    <p className="text-sm text-white/80 flex items-center gap-2">
      {icon} {label}
    </p>
    <h3 className={`text-2xl font-semibold ${valueClass}`}>{value}</h3>
    {sub && <p className="text-sm text-white/60">{sub}</p>}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center text-center px-4 py-12">
    <Package size={56} className="text-emerald-500 mb-3" />
    <h3 className="text-2xl font-bold text-white mb-2">No Holdings Yet</h3>
    <p className="text-white/70">
      Start shopping with ARRC merchant partners to earn stock rewards.
    </p>
  </div>
);

export default MarketsPage;
