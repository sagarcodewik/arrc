"use client";
import { useState, useEffect } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Clock, DollarSign, Sparkles, TrendingUp } from "lucide-react";
import Input from "../ui/Input";
import { Select } from "../ui/Select";

/* ================= HELPERS ================= */
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const money = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(v);

/* ================= COMPONENT ================= */
const LevelUpPage = () => {
  /* ---------- Quotes ---------- */
  const quotes = [
    "Every dollar invested is a seed for future harvest.",
    "The power of compound interest is the eighth wonder.",
    "Time is the most powerful multiplier of wealth.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((p) => (p + 1) % quotes.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  /* ---------- State ---------- */
  const [principal, setPrincipal] = useState("");
  const [contribution, setContribution] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");

  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [interestPV, setInterestPV] = useState(0);
  const [interestPMT, setInterestPMT] = useState(0);

  /* ---------- Calculation (WORKING LOGIC) ---------- */
  useEffect(() => {
    const P = clamp(Number(principal) || 0, 0, 1_000_000_000);
    const PMT = clamp(Number(contribution) || 0, 0, 1_000_000);
    const r = clamp(Number(rate) || 0, 0, 100) / 100;
    const t = clamp(Number(years) || 0, 0, 100);

    const freqMap: Record<string, number> = {
      daily: 365,
      weekly: 52,
      biweekly: 26,
      monthly: 12,
    };

    const m = freqMap[frequency];
    const r_pmt = r / m;
    const totalPeriods = m * t;

    const FV_PV = P * Math.pow(1 + r / 12, 12 * t);

    const FV_PMT =
      r > 0
        ? PMT * ((Math.pow(1 + r_pmt, totalPeriods) - 1) / r_pmt)
        : PMT * totalPeriods;

    const total = FV_PV + FV_PMT;
    const invested = P + PMT * totalPeriods;

    if (!Number.isFinite(total)) return;

    setFutureValue(total);
    setTotalInvested(invested);
    setInterestPV(FV_PV - P);
    setInterestPMT(FV_PMT - PMT * totalPeriods);
  }, [principal, contribution, frequency, rate, years]);

  /* ================= UI (UNCHANGED) ================= */
  return (
    <>
      {/* INPUT SECTION */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid sm:grid-cols-2 gap-6 p-6 bg-white/95 border border-slate-200 shadow-xl rounded-2xl">
            <div className="space-y-4">
              <Input
                label="Initial Investment (Lump Sum)"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                leftIcon={<DollarSign />}
              />

              <div className="bg-slate-50 p-4 rounded-xl border">
                <label className="flex items-center gap-2 text-sm mb-1">
                  <Sparkles className="w-4 h-4" />
                  Regular Contribution
                </label>
                <Input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  leftIcon={<DollarSign />}
                />

                <label className="flex items-center gap-2 text-sm mt-3">
                  <Clock className="w-4 h-4" />
                  Contribution Frequency
                </label>
                <Select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  options={[
                    { value: "daily", label: "Daily" },
                    { value: "weekly", label: "Weekly" },
                    { value: "biweekly", label: "Bi-Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                />
              </div>

              <Input
                label="Annual Interest Rate (%)"
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />

              <Input
                label="Investment Horizon (Years)"
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

            {/* RESULTS */}
            <div className="bg-slate-50 rounded-2xl border p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                  <h3>Total Future Value</h3>
                  <p>{money(futureValue)}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow">
                  <h3>Total Invested</h3>
                  <p>{money(totalInvested)}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow text-sm">
                <div className="flex justify-between">
                  <span>Interest from Lump Sum</span>
                  <span>{money(interestPV)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest from Contributions</span>
                  <span>{money(interestPMT)}</span>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default LevelUpPage;




// "use client";
// import { useState, useEffect } from "react";
// import AnimateSection from "../AnimateSection";
// import Section from "../Section";
// import { Button } from "../ui/Button";
// import { Clock, DollarSign, Sparkles, TrendingUp } from "lucide-react";
// import Input from "../ui/Input";
// import { Select } from "../ui/Select";


// const LevelUpPage = () => {
//   const quotes = ["Every dollar invested is a seed for future harvest.", "The power of compound interest is the eighth wonder.", "Time is the most powerful multiplier of wealth.",];
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % quotes.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//     <AnimateSection>
//       <Section customClass="relative mb-6">
//         <div className="flex flex-col items-center justify-center gap-10">
//           <div className="relative w-full max-w-[800px] px-4 flex flex-col items-center">
//             <div className="relative w-full flex flex-col gap-4 lg:gap-6">
//               <div className="absolute inset-0 rounded-full blur-[60px] bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_70%)]" />
//                <span className="absolute -left-48 -top-40 text-4xl text-cyan-400/30">●</span>
//                <span className="absolute left-48 -top-44 text-3xl text-cyan-400/30">■</span>
//                <span className="absolute -left-48 top-44 text-3xl text-cyan-400/30">◆</span>
//                <span className="absolute left-48 top-48 text-4xl text-cyan-400/30">▲</span>
//                <span className="absolute -top-52 text-2xl text-cyan-400/30">◉</span>
//                <span className="absolute top-52 text-3xl text-cyan-400/30">◊</span>
//               <div className="absolute top-0 -left-12 h-20 w-20">
//                 <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
//                 <div className="h-16 w-0.5 bg-gradient-to-b from-cyan-400 to-transparent" />
//               </div>
//               <div className="absolute top-0 -right-12 h-20 w-20">
//                 <div className="absolute right-0 h-0.5 w-16 bg-gradient-to-l from-sky-400 to-transparent" />
//                 <div className="absolute right-0 h-16 w-0.5 bg-gradient-to-b from-sky-400 to-transparent" />
//               </div>
//               <div className="absolute -bottom-24 -left-12 h-20 w-20">
//                 <div className="absolute bottom-0 h-0.5 w-16 bg-gradient-to-r from-cyan-400 to-transparent" />
//                 <div className="absolute bottom-0 h-16 w-0.5 bg-gradient-to-t from-cyan-400 to-transparent" />
//               </div>
//               <div className="absolute -bottom-24 -right-12 h-20 w-20">
//                 <div className="absolute bottom-0 right-0 h-0.5 w-16 bg-gradient-to-l from-sky-400 to-transparent" />
//                 <div className="absolute bottom-0 right-0 h-16 w-0.5 bg-gradient-to-t from-sky-400 to-transparent" />
//               </div>
//               <div className="relative top-12 flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 to-sky-100/95 p-8 shadow-2xl backdrop-blur-xl">
//                 <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/b38fb9264_Screenshot2025-11-05at122531AM.png" alt="Wealth illustration" className="absolute inset-0 h-full w-full rounded-3xl object-cover opacity-[0.08] grayscale blur-sm"/>
//                 <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.06)_0%,transparent_50%)]" />
//                 <div className="absolute inset-0 rounded-3xl bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(6,182,212,0.02)_2px,rgba(6,182,212,0.02)_4px)]" />
//                 <h2 key={index} className="relative z-10 text-center text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-sky-900 via-sky-500 to-sky-900 animate-fade-slide">{quotes[index]}</h2>
//                 <span className="absolute top-6 left-6 h-2 w-2 rounded-full bg-cyan-400/60" />
//                 <span className="absolute top-6 right-6 h-2 w-2 rounded-full bg-sky-400/60" />
//                 <span className="absolute bottom-6 left-6 h-2 w-2 rounded-full bg-cyan-400/60" />
//                 <span className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-sky-400/60" />
//               </div>
//               <div className="absolute left-0 top-1/2 h-px w-20 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
//               <div className="absolute right-0 top-1/2 h-px w-20 bg-gradient-to-l from-transparent via-sky-400/60 to-transparent" />
//             </div>
//             {/* ================= TEXT ================= */}
//             <div className="text-center space-y-2 px-4 mt-20">
//               <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800">Time Value of Money</h1>
//               <p className="text-lg font-medium text-slate-600">The Power of Time, Money, & Habits</p>
//               <p className="text-sm text-slate-500">Combined Investment & Savings Growth Calculator</p>
//             </div>
//           </div>
//           {/* ================= QUOTE ================= */}
//           <div className="max-w-2xl rounded-lg border border-slate-200 bg-white/90 p-4 shadow-md backdrop-blur-sm text-center z-40">
//             <p className="font-serif text-sm italic text-slate-700 sm:text-base">“An investment in knowledge pays the best interest.” <span className="not-italic font-semibold text-slate-900 block">— Benjamin Franklin</span>
//             </p>
//           </div>
//         </div>
//       </Section>
//     </AnimateSection>

//     <AnimateSection>
//       <Section customClass="relative mb-6">
//        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 p-4 lg:p-6 h-full rounded-2xl bg-white/95 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500">
//         <div className="rounded-2xl flex flex-col gap-3">
//           <div className="p-4 flex items-center gap-2 border-b border-slate-100">
//             <DollarSign className="w-5 h-5 text-cyan-600" />
//             <h3 className="text-lg font-semibold text-slate-900">Your Investment Strategy</h3>
//           </div>
//           <form className="space-y-4">
//             <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Initial Investment (Lump Sum)" type="number" placeholder="10000" required
//             leftIcon={<DollarSign size={20} className=""/>}/>
//             <div className="space-y-4 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
//              <label className="flex items-center gap-2 text-sm mb-1 text-black text-start"><Sparkles className="w-3 h-3 sm:w-4 sm:h-4"/> Regular Contribution (Savings Habit)</label>
//              <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" type="number" placeholder="10000" required
//              leftIcon={<DollarSign size={20} className=""/>}/>
//              <div className="w-full">
//              <label className="flex items-center gap-2 text-sm mb-1 text-black text-start"><Clock className="w-3 h-3 sm:w-4 sm:h-4"/> Regular Contribution (Savings Habit)</label>
//              <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" type="number" placeholder="10000" required/>
//              <label className="text-xs">⭐ This represents your smart financial habit!</label>
//              </div>
//             </div>
//             <div>
//               <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Annual Interest Rate (%)" type="number" placeholder="10000" required/>
//               <span className="text-xs">The expected yearly return (e.g., 7 for 7%).</span>
//             </div>
//             <div>
//               <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Investment Horizon (Years)" type="number" placeholder="10000" required/>
//               <span className="text-xs">The longer the time, the greater the impact of compounding.</span>
//             </div>
//             <div>
//             <Select label="Country" controlId="country" placeholder="Compounding Frequency (per year)"
//               options={[{ value: "in", label: "India" }, { value: "us", label: "United States" }, { value: "uk", label: "United Kingdom" },]}/>
//               <span className="text-xs">This affects how often interest is calculated on the initial lump sum.</span>
//             </div>
//           </form>
//         </div>
//         <div className="bg-slate-50 border border-slate-200 rounded-2xl">
//           <div className="p-4 flex items-center gap-2 border-b border-slate-100">
//             <TrendingUp className="w-5 h-5 text-cyan-600" />
//             <h3 className="text-lg font-semibold text-slate-900">Your Combined Growth</h3>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
//             <div className="rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
//              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1 mb-1">Total Future Value</h3>
//              <p className="text-lg font-medium text-black line-clamp-1">$37,405.09</p>
//             </div>
//             <div className="rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
//              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 line-clamp-1 mb-1">Total Future Value</h3>
//              <p className="text-lg font-medium text-black line-clamp-1">$37,405.09</p>
//             </div>
//           </div>
//           <div className="p-4 w-full flex flex-col gap-4">
//             <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
//               <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">💡 The Power of Habits</h4>
//               <p className="text-xs lg:text-sm text-sky-700">You're utilizing two powerful tools! Your lump sum gave you a head start, and your monthly contributions ensure consistent, long-term growth. Keep up the habit! 🎯</p>
//             </div>
//             <div className="bg-sky-50/70 border border-sky-200/50 rounded-xl p-3 lg:p-4">
//               <h4 className="font-semibold text-sky-800 mb-2 text-sm lg:text-base">📊 The Power of Habits</h4>
//               <div className="flex flex-row align-center justify-between gap-2 mb-0.5">
//                 <p>Invested Principal:</p> <p>$22,000.00</p>
//               </div>
//               <div className="flex flex-row align-center justify-between gap-2 mb-0.5">
//                 <p>Interest from Lump Sum:</p> <p>$10,096.61</p>
//               </div>
//               <div className="flex flex-row align-center justify-between gap-2 mb-0.5">
//                 <p>Interest from Contributions:</p> <p>$5,308.48</p>
//               </div>
//             </div>
//           </div>
//         </div>
//        </div>
//       </Section>
//     </AnimateSection>

//     <AnimateSection>
//       <Section customClass="relative mb-6">
//        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//         <div className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
//          <h3 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1 mb-1">💰 Two Streams Win</h3>
//          <p className="text-sm font-medium text-black line-clamp-1">Combine a lump sum investment with regular monthly contributions to create a powerful wealth-building engine!</p>
//         </div>
//         <div className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
//          <h3 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1 mb-1">🎯 Consistency is Key</h3>
//          <p className="text-sm font-medium text-black line-clamp-1">Even a $100/month habit can grow into substantial wealth over time. Small, consistent actions lead to extraordinary results!</p>
//         </div>
//         <div className="group rounded-xl text-card-foreground p-4 lg:p-6 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
//          <h3 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1 mb-1">⏰ Time Amplifies Everything</h3>
//          <p className="text-sm font-medium text-black line-clamp-1">The earlier you start, the more time your money has to compound. Your future self will thank you!</p>
//         </div>
//        </div>
//       </Section>
//     </AnimateSection>
//     </>
//   );
// };

// export default LevelUpPage;