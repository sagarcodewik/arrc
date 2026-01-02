"use client";

import { useEffect, useState } from "react";

export function useMarketStatus() {
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const ist = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );

      const hours = ist.getHours();
      const minutes = ist.getMinutes();
      const seconds = ist.getSeconds();


      setTime(
        ist.toLocaleTimeString("en-IN", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      const isMarketOpen =
        (hours === 19 && minutes >= 0) ||
        (hours > 19 && hours < 24) ||
        (hours === 0) ||
        (hours === 1 && minutes <= 30);

      setIsOpen(!isMarketOpen);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  return { time, isOpen };
}
