"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/Button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
const Logo = ({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };
  
  return (
    <div className={`${sizes[size]} relative rounded-full overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] ${className}`}>
      <img
        src="/images/logo.png"
        alt="ARRC Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const About: React.FC = () => {
  // Safe screen size for animations (SSR safe)
  const screenWidth =
    typeof window !== "undefined" ? window.innerWidth : 1200;
  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
      {/* ================= HERO SECTION ================= */}
      <div className="relative overflow-hidden text-white">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/f073780db_Screenshot2025-08-18at21454AM.png"
          alt="Prosperity and wealth background"
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay scale-110"
        />

        {/* Animated money icons */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl opacity-10"
              initial={{
                x: Math.random() * screenWidth,
                y: Math.random() * screenHeight,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [-50, 50, -50],
                rotate: [0, 360],
                opacity: [0.1, 0.05, 0.1],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 2,
              }}
            >
              💰
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-sky-900/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <Logo size="sm" className="mx-auto" />

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold">
                About ARRC
              </h1>

              <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-cyan-200">
                We're revolutionizing how Americans build wealth by turning
                everyday purchases into long-term investments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= MISSION SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">
            Our Mission
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-cyan-800/50 shadow-2xl shadow-cyan-900/20">
              <CardContent className="p-8 lg:p-12">
                <p className="text-xl lg:text-2xl text-cyan-200 leading-relaxed">
                  “To democratize wealth building by seamlessly connecting
                  everyday spending with long-term investing, helping every
                  American build financial security through the purchases
                  they’re already making.”
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* ================= LEARN MORE ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Learn more at www.arrcinvest.com
          </h2>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-slate-800/50 border-cyan-800/50 shadow-xl hover:shadow-2xl hover:shadow-cyan-800/20 transition-all">
              <CardContent className="p-8 space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">
                    Visit Our Official Website
                  </h3>
                  <p className="text-cyan-300">
                    Discover the complete ARRC experience and learn how we're
                    transforming rewards into investments.
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={() =>
                    window.open("https://www.arrcinvest.com", "_blank")
                  }
                  className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white shadow-lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Visit www.arrcinvest.com
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
