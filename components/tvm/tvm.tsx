"use client";
import React, { useEffect, useState } from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Input from "@/components/ui/Input";
import Select from "../ui/Select";
import AnimatedPhrase from "./AnimatedPhrase";
import motivationalPhrases from "./motivationalPharases";
export default function LetsLevelUp() {
  const [principal, setPrincipal] = useState<string>("");
  const [contribution, setContribution] = useState<string>("");
  const [frequency, setFrequency] = useState("monthly");
  const [rate, setRate] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [periods, setPeriods] = useState("12");
  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [interestPV, setInterestPV] = useState(0);
  const [interestPMT, setInterestPMT] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showPhrase, setShowPhrase] = useState(true);
  const allowOnlyNumber = (value: string) => /^\d*$/.test(value);
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPhrase(false);
      setTimeout(() => {
        setPhraseIndex((p) => (p + 1) % motivationalPhrases.length);
        setShowPhrase(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const P = clamp(Number(principal) || 0, 0, 1_000_000_000);
    const PMT = clamp(Number(contribution) || 0, 0, 1_000_000);
    const r = clamp(Number(rate) || 0, 0, 100) / 100;
    const t = clamp(Number(years) || 0, 0, 100);

    const n = Number(periods);
    const FV_PV = P * Math.pow(1 + r / n, n * t);
    const freqMap: Record<string, number> = {
      daily: 365,
      weekly: 52,
      biweekly: 26,
      monthly: 12,
    };

    const m = freqMap[frequency];
    const r_pmt = r / m;
    const totalPeriods = m * t;

    const FV_PMT =
      r > 0
        ? PMT * ((Math.pow(1 + r_pmt, totalPeriods) - 1) / r_pmt)
        : PMT * totalPeriods;

    const total = FV_PV + FV_PMT;
    const invested = P + PMT * totalPeriods;
    if (!Number.isFinite(total) || !Number.isFinite(invested)) {
      setFutureValue(0);
      setTotalInvested(0);
      setTotalInterest(0);
      setInterestPV(0);
      setInterestPMT(0);
      return;
    }
    setFutureValue(total);
    setTotalInvested(invested);
    setTotalInterest(total - invested);
    setInterestPV(FV_PV - P);
    setInterestPMT(FV_PMT - PMT * totalPeriods);
  }, [principal, contribution, frequency, rate, years, periods]);

  const money = (v: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  return (
    <div className="relative min-h-screen px-6 py-10 arr-bg overflow-hidden">
      <img
        src="/images/money-big.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-6 pointer-events-none"
      />
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-8">
          <div className="relative arr-hero-wrap rounded-2xl overflow-hidden h-48 sm:h-56 w-full max-w-[650px] mx-auto px-2 sm:px-0">
            <div className="arr-hero-glow" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <AnimatedPhrase text={motivationalPhrases[phraseIndex]} />
            </div>
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(224,242,254,0.35) 50%, rgba(186,230,253,0.45) 100%)",
                  "linear-gradient(135deg, rgba(240,249,255,0.25) 0%, rgba(224,242,254,0.35) 50%, rgba(255,255,255,0) 100%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-cyan-400/60" />
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-400/60" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-cyan-400/60" />
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-sky-400/60" />
            <motion.div
              className="absolute inset-y-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              style={{ width: "30%" }}
              animate={{ x: ["-30%", "130%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="mt-8 text-center space-y-4 px-4">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 sm:w-24 bg-sky-400" />

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center">
                Time Value of Money
              </h1>

              <div className="h-px w-16 sm:w-24 bg-sky-400" />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium">
              The Power of Time, Money, & Habits
            </p>

            <p className="text-sm sm:text-base text-slate-500">
              Combined Investment & Savings Growth Calculator
            </p>
            <div className="inline-block mt-4 bg-white px-6 py-3 rounded-lg shadow-md text-sm italic text-slate-700">
              “An investment in knowledge pays the best interest.”
              <br />
              <span className="text-slate-900 font-semibold not-italic">
                — Benjamin Franklin
              </span>
            </div>
          </div>
        </div>
        <Card className="arr-main-card ">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-6 p-8">
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-sky-600" />
                Your Investment Strategy
              </h2>

              <div className="border-t border-slate-300 mt-3"></div>
              <Input
                label="Initial Investment (Lump Sum)"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={principal}
                onChange={(e) => {
                  const v = e.target.value;
                  if (allowOnlyNumber(v)) setPrincipal(v);
                }}
              />
              <div className="bg-slate-50 p-4 rounded-lg border-slate-800 space-y-4">
                <Input
                  label="Regular Contribution"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter Contribution"
                  value={contribution}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (allowOnlyNumber(v)) setContribution(v);
                  }}
                />
                <Select
                  label="Contribution Frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "biweekly", label: "Bi-Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                />
                <p className="text-xs text-slate-500">
                  ⭐ This represents your wealth-building habit
                </p>
              </div>
              <Input
                label="Annual Interest Rate (%)"
                type="text"
                inputMode="numeric"
                placeholder="Enter rate"
                value={rate}
                onChange={(e) => {
                  const v = e.target.value;
                  if (allowOnlyNumber(v)) setRate(v);
                }}
              />

              <Input
                label="Investment Duration (Years)"
                type="text"
                inputMode="numeric"
                placeholder="Enter years"
                value={years}
                onChange={(e) => {
                  const v = e.target.value;
                  if (allowOnlyNumber(v)) setYears(v);
                }}
              />

              <Select
                label="Compounding Frequency"
                value={periods}
                onChange={(e) => setPeriods(e.target.value)}
                options={[
                  { value: "1", label: "Annually (1)" },
                  { value: "4", label: "Quarterly (4)" },
                  { value: "12", label: "Monthly (12)" },
                  { value: "365", label: "Daily (365)" },
                ]}
              />
              <span className="text-xs text-slate-500">
                This affects how often interest is calculated on the initial
                lump sum.
              </span>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border text-card-foreground bg-white/95 backdrop-blur-sm shadow-xl border-slate-400 w-full h-full p-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                  Your Combined Growth
                </h2>

                <div className="border-t border-slate-300 mt-3"></div>
                <div className="space-y-4 mt-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm font-medium text-slate-600">
                      Total Future Value
                    </p>
                    <p className="text-3xl font-serif font-bold text-slate-900 mt-1">
                      {money(futureValue)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="text-sm font-medium text-slate-600 flex items-center gap-1">
                      🏅 Total Interest Earned
                    </p>
                    <p className="text-3xl font-bold text-slate-900 mt-1">
                      {money(totalInterest)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-1 text-slate-700">
                      💡 The Power of Habits
                    </p>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      You're utilizing two powerful tools! Your lump sum gave
                      you a head start, and your monthly contributions ensure
                      consistent, long-term growth. Keep up the habit! 🎯
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-1 text-slate-700">
                      📊 Breakdown:
                    </p>

                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Invested Principal:</span>
                      <span className="font-medium text-slate-900">
                        {money(totalInvested)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Interest from Lump Sum:</span>
                      <span className="font-medium text-slate-900">
                        {money(interestPV)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Interest from Contributions:</span>
                      <span className="font-medium text-slate-900">
                        {money(interestPMT)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {[
            {
              title: "💰 Two Streams Win",
              text: "Combine a lump sum investment with regular monthly contributions to create a powerful wealth-building engine!",
            },
            {
              title: "🎯  Consistency is Key",
              text: "Even a $100/month habit can grow into substantial wealth over time. Small, consistent actions lead to extraordinary results!",
            },
            {
              title: "⏰ Time Amplifies Everything",
              text: "The earlier you start, the more time your money has to compound. Your future self will thank you!",
            },
          ].map((item, i) => (
            <Card key={i} className="arr-card arr-shadow">
              <CardContent className="p-5 space-y-">
                <h3 className="font-semibold pt-5">{item.title}</h3>
                <p className="text-sm arr-muted pt-3">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
