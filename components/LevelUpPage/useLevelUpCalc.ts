"use client";
import { useEffect, useState } from "react";

export function useLevelUpCalc() {
  const [principal, setPrincipal] = useState("");
  const [contribution, setContribution] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [periods, setPeriods] = useState("12");

  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [interestPV, setInterestPV] = useState(0);
  const [interestPMT, setInterestPMT] = useState(0);

  const allowOnlyNumber = (v: string) => /^\d*$/.test(v);
  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

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

    setFutureValue(FV_PV + FV_PMT);
    setTotalInvested(P + PMT * totalPeriods);
    setInterestPV(FV_PV - P);
    setInterestPMT(FV_PMT - PMT * totalPeriods);
  }, [principal, contribution, frequency, rate, years, periods]);

  return {
    principal,
    setPrincipal,
    contribution,
    setContribution,
    frequency,
    setFrequency,
    rate,
    setRate,
    years,
    setYears,
    periods,
    setPeriods,
    futureValue,
    totalInvested,
    interestPV,
    interestPMT,
    allowOnlyNumber,
  };
}
