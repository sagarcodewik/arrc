import React from "react";

const LOGO_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/42be7cf15_IMG_5571.jpg";

type SizeKey = "2xs" | "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<SizeKey, string> = {
  "2xs": "h-[4.39rem] w-[4.39rem]",
  xs: "h-[6.21rem] w-[6.21rem]",
  sm: "h-[8.24rem] w-[8.24rem]",
  md: "h-[12.20rem] w-[12.20rem]",
  lg: "h-[16.37rem] w-[16.37rem]",
  xl: "h-[20.44rem] w-[20.44rem]",
};

export default function Logo({ size = "md", className = "" }: { size?: SizeKey; className?: string }) {

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`${sizes[size]} relative rounded-full p-2 border-2 border-cyan-400/80
        overflow-hidden shadow-inner bg-black`}
      >
        {/* glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 via-sky-200/40 to-cyan-200/30 rounded-full opacity-60" />

        <img
          src={LOGO_URL}
          alt="ARRC Logo"
          className="w-full h-full object-cover rounded-full relative z-10"
          style={{
            filter: "drop-shadow(0 0 18px rgba(34, 211, 238, 0.7))",
          }}
        />
      </div>
    </div>
  );
}
