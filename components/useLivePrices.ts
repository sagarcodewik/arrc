"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY!;

const SYMBOL_MAP: Record<string, string> = {
  "United Airlines": "UAL",
  Apple: "AAPL",
  Amazon: "AMZN",
  Microsoft: "MSFT",
};

export type MarketData = {
  price: number;
  change: number;
  changePercent: number;
  isDelayed: boolean;
};


export function useLivePrices(data: any[], refreshKey = 0) {
  const [prices, setPrices] = useState<Record<string, MarketData>>({});
  useEffect(() => {
    if (!data || data.length === 0) return;

    const fetchPrices = async () => {
      try {
        const result: Record<string, MarketData> = {};

        await Promise.all(
          data.map(async (item) => {
            const symbol =
              item.stockSymbol || SYMBOL_MAP[item.assetName];

            if (!symbol) return;

            const res = await axios.get(
              "https://finnhub.io/api/v1/quote",
              {
                params: {
                  symbol,
                  token: API_KEY,
                },
              }
            );

            const q = res.data;

            if (q?.c !== undefined) {
              result[item._id] = {
                price: q.c,
                change: q.d,
                changePercent: q.dp,
                isDelayed: true,
              };
            }
          })
        );

        setPrices(result);
      } catch (err) {
        console.error("Live price error:", err);
      }
    };

    fetchPrices();

    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);

  }, [data, refreshKey]);

  return data.map((item) => {
    const market = prices[item._id];

    if (!market) {
      return {
        ...item,
        market: null,
        // currentValue: item.investedAmount ?? 0,
        currentValue: item.rewardValue ?? 0,

        profitLoss: 0,
      };
    }

    const qty = item.quantity ?? 1;
    // const invested = item.investedAmount ?? 0;
    const invested = item.rewardValue ?? 0;

    const currentValue = market.price * qty;
  console.log("currentValue==============>",currentValue)
    return {
      ...item,
      market,
      currentValue,
      profitLoss: currentValue - invested,
    };
  });
}
