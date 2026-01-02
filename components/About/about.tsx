"use client";

import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/Button";

const About: React.FC = () => {
  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#071c2e] via-[#08243c] to-[#071c2e]">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/f073780db_Screenshot2025-08-18at21454AM.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071c2e]/90 via-[#071c2e]/70 to-[#071c2e]/95" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-0 text-center px-4 space-y-6"
        >
          <Logo size="sm" className="mx-auto" />

          <h1 className="text-4xl md:text-5xl font-semibold">About ARRC</h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-cyan-200/90">
            We&apos;re revolutionizing how Americans build wealth by turning
            everyday purchases into long-term investments.
          </p>
        </motion.div>
      </section>
      <section className="py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center space-y-10"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Our Mission</h2>
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md px-6 md:px-12 py-10">
            <p className="text-lg md:text-xl text-cyan-200 leading-relaxed">
              “To democratize wealth building by seamlessly connecting everyday
              spending with long-term investing, helping every American build
              financial security through the purchases they&apos;re already
              making.”
            </p>
          </div>
        </motion.div>
      </section>
      <section className="py-10 px-4 text-white">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Learn more at www.arrcinvest.com
          </h2>

          <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-10">
         
             <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
    
         <h3 className="text-lg mt-5 font-semibold text-white text-center">
              Visit Our Official Website
            </h3>

            <p className="text-cyan-300 text-sm leading-relaxed text-center max-w-md mx-auto mt-2">
              Discover the complete ARRC experience and learn how we&apos;re
              transforming the future of rewards and investing.
            </p>
          <Button
            onClick={() => window.open("https://www.arrcinvest.com", "_blank")}
            className="
              h-9
              px-4
              mt-5
              bg-gradient-to-r from-cyan-500 to-sky-500
              hover:from-cyan-600 hover:to-sky-600
              text-white
              text-sm
              font-medium
              rounded-md
              shadow-md shadow-cyan-500/20
              flex items-center justify-center gap-2
            "
          >
            <ExternalLink className="w-4 h-4" />
            <span>Visit www.arrcinvest.com</span>
          </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
