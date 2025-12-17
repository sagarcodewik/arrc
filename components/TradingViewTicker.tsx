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
        // ===== BIG TECH =====
        { proName: "NASDAQ:AAPL", title: "Apple" },
        { proName: "NASDAQ:MSFT", title: "Microsoft" },
        { proName: "NASDAQ:GOOGL", title: "Alphabet" },
        { proName: "NASDAQ:AMZN", title: "Amazon" },
        { proName: "NASDAQ:NVDA", title: "NVIDIA" },
        { proName: "NASDAQ:META", title: "Meta" },
        { proName: "NASDAQ:TSLA", title: "Tesla" },
        { proName: "NASDAQ:INTC", title: "Intel" },
        { proName: "NASDAQ:AMD", title: "AMD" },

        // ===== FINANCE =====
        { proName: "NYSE:JPM", title: "JPMorgan" },
        { proName: "NYSE:GS", title: "Goldman Sachs" },
        { proName: "NYSE:BAC", title: "Bank of America" },
        { proName: "NYSE:V", title: "Visa" },
        { proName: "NYSE:MA", title: "Mastercard" },

        // ===== CONSUMER =====
        { proName: "NYSE:WMT", title: "Walmart" },
        { proName: "NYSE:COST", title: "Costco" },
        { proName: "NYSE:NKE", title: "Nike" },
        { proName: "NYSE:DIS", title: "Disney" },

        // ===== ENERGY =====
        { proName: "NYSE:XOM", title: "Exxon" },
        { proName: "NYSE:CVX", title: "Chevron" },

        // ===== HEALTHCARE =====
        { proName: "NYSE:JNJ", title: "Johnson & Johnson" },
        { proName: "NYSE:PFE", title: "Pfizer" },
        { proName: "NYSE:MRK", title: "Merck" },

        // ===== INDICES =====
        { proName: "SP:SPX", title: "S&P 500" },
        { proName: "DJ:DJI", title: "Dow Jones" },
        { proName: "NASDAQ:NDX", title: "Nasdaq 100" },

        // ===== ETFs =====
        { proName: "AMEX:SPY", title: "SPY ETF" },
        { proName: "AMEX:QQQ", title: "QQQ ETF" },
        { proName: "AMEX:DIA", title: "Dow ETF" },

        // ===== ADD 50–100 SAME WAY =====
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
