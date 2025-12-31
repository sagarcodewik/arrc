"use client";

import { Briefcase, LogIn, Loader2, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from "react";
import MerchantSignupFlow from "./MerchantSignupFlow"

const BUSINESS_LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/1f33dd4bc_Screenshot2025-10-29at104836PM.png";

export default function BusinessDashboardPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMerchantSignup, setShowMerchantSignup] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const handleMerchantLogin = async () => {
    setIsLoggingIn(true);
    setIsLoggingIn(false);


  };


  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
  //       <div className="text-center space-y-4">
  //           <img 
  //             src={BUSINESS_LOGO_URL} 
  //             alt="ARRC Business Suite" 
  //             className="w-80 h-auto mx-auto rounded-lg shadow-lg"
  //           />
  //           <Loader2 className="w-12 h-12 text-cyan-600 animate-spin mx-auto" />
  //           <p className="text-slate-600">Loading Business Suite...</p>
  //       </div>
  //     </div>
  //   );
  // }


  // if (showMerchantSignup && currentUser) {
  //   return <MerchantSignupFlow onComplete={handleSignupComplete} onCancel={handleSignupCancel} />;
  // }
    if (showMerchantSignup) {
    return <MerchantSignupFlow onBack={() => setShowMerchantSignup(false)} />;

  }

  return (
     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white border border-slate-200 p-8 rounded-2xl shadow-xl max-w-md"
        >
            <img 
              src={BUSINESS_LOGO_URL} 
              alt="ARRC Business Suite" 
              className="w-80 h-auto mx-auto mb-6 rounded-lg shadow-lg"
            />
            <div className="space-y-3">
              <button
                onClick={() => setShowMerchantSignup(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg transition-all"
              >
                <Building className="w-5 h-5 mr-2 inline" />
                Complete Merchant Registration
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">or</span>
                </div>
              </div>
              
              <button
                onClick={handleMerchantLogin}
                disabled={isLoggingIn}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2 inline" />
                    Login as Existing Merchant
                  </>
                )}
              </button>
            </div>
        </motion.div>
    </div>
  );
}
