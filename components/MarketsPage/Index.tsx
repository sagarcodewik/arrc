"use client";
import React, { useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { TrendingUp, Wallet, ClockIcon, ActivityIcon, Package, Landmark,} from "lucide-react";


const TransactionsPage = () => {

  return (
    <>
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col gap-6 w-full">
           <div className="flex flex-col sm:flex-row items-center justify-between gap-2 rounded-lg border border-slate-800 bg-black/100 p-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-white">Markets Open</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-400">
                <ClockIcon className="h-4 w-4" /> <span>10:31:42 AM</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ActivityIcon className="h-4 w-4 text-amber-400" />
              <span>Data delayed{" "}<span className="font-semibold text-amber-400">~15 minutes</span>{" "}• Updated continuously</span>
            </div>
           </div>
           <div className="overflow-hidden rounded-xl border border-slate-800 bg-black/100 shadow-2xl">      
            <div className="flex items-center justify-between p-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-blue-400"><TrendingUp className="h-5 w-5 text-blue-400" /> Top S&P 500 Stocks – Live Prices</h2>
              <span className="text-xs text-slate-400">50+ stocks rotating</span>
            </div>
            <div className="tradingview-widget-container h-[44px] w-full">
              <iframe title="TradingView Ticker Tape" src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22description%22%3A%22Apple%22%2C%22proName%22%3A%22NASDAQ%3AAAPL%22%7D%2C%7B%22description%22%3A%22Microsoft%22%2C%22proName%22%3A%22NASDAQ%3AMSFT%22%7D%2C%7B%22description%22%3A%22Alphabet%22%2C%22proName%22%3A%22NASDAQ%3AGOOGL%22%7D%2C%7B%22description%22%3A%22Amazon%22%2C%22proName%22%3A%22NASDAQ%3AAMZN%22%7D%2C%7B%22description%22%3A%22NVIDIA%22%2C%22proName%22%3A%22NASDAQ%3ANVDA%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A44%7D" frameBorder="0" scrolling="no" className="h-[44px] w-full"/>
            </div>
           </div>
           <div className="text-center w-full">
            <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">Your ARRC Portfolio</h1>
            <p className="text-slate-600 text-sm sm:text-base font-medium">Track the stocks you've earned through your purchases</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="group rounded-xl text-card-foreground p-4 lg:p-6 backdrop-blur-sm border border-slate-800 bg-black/100 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
             <p className="text-[15px] font-medium text-white/80 line-clamp-1 flex items-center gap-2"><Wallet size={18} className="text-white/80" /> Total Portfolio Value </p>
             <h3 className="text-2xl font-semibold tracking-tight text-white line-clamp-1">$0.00</h3>
            </div>
            <div className="group rounded-xl text-card-foreground p-4 lg:p-6 backdrop-blur-sm border border-slate-800 bg-black/100 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
             <p className="text-[15px] font-medium text-white/80 line-clamp-1 flex items-center gap-2"><Wallet size={18} className="text-white/80" /> Total Gain/Loss </p>
             <h3 className="text-2xl font-semibold tracking-tight text-green-400 line-clamp-1">+$0.00(+0.00%)</h3>
            </div>
            <div className="group rounded-xl text-card-foreground p-4 lg:p-6 backdrop-blur-sm border border-slate-800 bg-black/100 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300">
             <p className="text-[15px] font-medium text-white/80 line-clamp-1 flex items-center gap-2"><Package size={18} className="text-white/80" /> Holdings </p>
             <h3 className="text-2xl font-semibold tracking-tight text-white line-clamp-1">0</h3>
             <p className="text-[15px] font-medium text-white/80 line-clamp-1">Different stocks</p>
            </div>
           </div>
           <div className="h-full rounded-2xl border border-slate-800 bg-black/100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">  
               <div className="grid grid-cols-1 gap-3 p-4 border-b border-slate-800 sm:grid-cols-[1fr_auto] sm:items-center">
                 <h3 className="text-2xl font-semibold sm:text-lg text-white leading-none tracking-tight flex items-center gap-2"><Landmark className="w-5 h-5 text-emerald-600" /> Your Stock Holdings</h3>
               </div>
               {/* Empty State */}
               <div className="flex flex-col items-center justify-center text-center px-4 min-h-[12rem] lg:min-h-[16rem] flex-auto">
                <Package size={56} className="text-6xl text-emerald-500 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">No Holdings Yet</h3>
                <p className="text-white">Start shopping with ARRC merchant partners to earn stock rewards and build your portfolio!</p>
              </div>
           </div>
           <div className="h-full rounded-2xl border border-slate-800 bg-black/100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col">  
             <div className="flex flex-col items-center justify-center text-center px-4 min-h-[12rem] lg:min-h-[16rem] flex-auto">
              <h3 className="text-2xl font-bold text-white mb-2">Your Personalized Portfolio</h3>
              <p className="text-white mb-2">These are the stocks you've earned through ARRC rewards. Keep shopping to grow your investments!</p>
              <p className="text-white text-xs">Disclaimer: Markets are volatile. This data is for informational purposes only. Always consult professional financial advisors for investment decisions.</p>
             </div>
           </div>
          </div>
        </Section>
      </AnimateSection>

    </>
  );
};

export default TransactionsPage;
