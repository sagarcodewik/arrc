"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const SYMBOL_MAP: Record<string, string> = {
  "United Airlines": "UAL",
  // "INTRST PYMNT": "INTU",
};

const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_KEY!;

export function useLivePrices(data: any[]) {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!data.length) return;

    const fetchPrices = async () => {
      try {
        const result: Record<string, number> = {};
        await Promise.all(
          data.map(async (item) => {
            const symbol = SYMBOL_MAP[item.assetName];
            if (!symbol) return;

            const res = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );

            const json = res.data;
            if (json?.c) {
              result[item._id] = json.c;
            }
          })
        );

        setPrices(result);
      } catch (e) {
        console.error("Live price error", e);
      }
    };

    fetchPrices();
    const i = setInterval(fetchPrices, 30000);
    return () => clearInterval(i);
  }, [data]);

  return data.map((item) => {
    const livePrice = prices[item._id];

    if (!livePrice) {
      return {
        ...item,
        currentValue: item.investedAmount,
        profitLoss: 0,
      };
    }

    const qty = 1;
    const currentValue = livePrice * qty;
    const profitLoss = currentValue - item.investedAmount;

    return {
      ...item,
      livePrice,
      currentValue,
      profitLoss,
    };
  });
}
