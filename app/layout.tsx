"use client";
import { Poppins } from "next/font/google";
import { useState } from "react";
import "../public/styles/font.css";
import "../public/styles/style.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-slate-100`}>
        <Providers>
          {children}
 
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}