"use client";

import { useEffect, useRef } from "react";

export default function TradingViewTicker() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [
          // Mega Cap Tech
          { description: "Apple", proName: "NASDAQ:AAPL" },
          { description: "Microsoft", proName: "NASDAQ:MSFT" },
          { description: "Alphabet", proName: "NASDAQ:GOOGL" },
          { description: "Amazon", proName: "NASDAQ:AMZN" },
          { description: "NVIDIA", proName: "NASDAQ:NVDA" },
          { description: "Meta", proName: "NASDAQ:META" },
          { description: "Tesla", proName: "NASDAQ:TSLA" },
          { description: "Berkshire", proName: "NYSE:BRK.B" },
          
          // Top Financial
          { description: "JPMorgan", proName: "NYSE:JPM" },
          { description: "Visa", proName: "NYSE:V" },
          { description: "Mastercard", proName: "NYSE:MA" },
          { description: "Bank of America", proName: "NYSE:BAC" },
          { description: "Wells Fargo", proName: "NYSE:WFC" },
          
          // Healthcare Leaders
          { description: "UnitedHealth", proName: "NYSE:UNH" },
          { description: "Johnson & Johnson", proName: "NYSE:JNJ" },
          { description: "Eli Lilly", proName: "NYSE:LLY" },
          { description: "Pfizer", proName: "NYSE:PFE" },
          
          // Consumer & Retail
          { description: "Walmart", proName: "NYSE:WMT" },
          { description: "Home Depot", proName: "NYSE:HD" },
          { description: "Coca-Cola", proName: "NYSE:KO" },
          { description: "PepsiCo", proName: "NASDAQ:PEP" },
          { description: "Costco", proName: "NASDAQ:COST" },
          { description: "Nike", proName: "NYSE:NKE" },
          { description: "McDonald's", proName: "NYSE:MCD" },
          { description: "Starbucks", proName: "NASDAQ:SBUX" },
          
          // Tech & Semiconductors
          { description: "AMD", proName: "NASDAQ:AMD" },
          { description: "Intel", proName: "NASDAQ:INTC" },
          { description: "Qualcomm", proName: "NASDAQ:QCOM" },
          { description: "Broadcom", proName: "NASDAQ:AVGO" },
          { description: "Oracle", proName: "NYSE:ORCL" },
          { description: "Salesforce", proName: "NYSE:CRM" },
          { description: "Adobe", proName: "NASDAQ:ADBE" },
          { description: "Netflix", proName: "NASDAQ:NFLX" },
          
          // Energy
          { description: "Exxon Mobil", proName: "NYSE:XOM" },
          { description: "Chevron", proName: "NYSE:CVX" },
          { description: "ConocoPhillips", proName: "NYSE:COP" },
          
          // Industrial
          { description: "Boeing", proName: "NYSE:BA" },
          { description: "Caterpillar", proName: "NYSE:CAT" },
          { description: "3M", proName: "NYSE:MMM" },
          { description: "UPS", proName: "NYSE:UPS" },
          
          // More S&P 500 Companies
          { description: "Disney", proName: "NYSE:DIS" },
          { description: "Comcast", proName: "NASDAQ:CMCSA" },
          { description: "Verizon", proName: "NYSE:VZ" },
          { description: "AT&T", proName: "NYSE:T" },
          { description: "Cisco", proName: "NASDAQ:CSCO" },
          { description: "IBM", proName: "NYSE:IBM" },
          { description: "GE", proName: "NYSE:GE" },
          { description: "Goldman Sachs", proName: "NYSE:GS" },
          { description: "Morgan Stanley", proName: "NYSE:MS" },
          { description: "American Express", proName: "NYSE:AXP" }
        ],

      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "adaptive",
      colorTheme: "dark",
      locale: "en",
    });

    ref.current.appendChild(script);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0B1220]">
      <div ref={ref} />
    </div>
  );
}
