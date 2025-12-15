"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FiMail } from "react-icons/fi";
import { MdOutlineLock } from "react-icons/md";

const SignupPage = () => {

  return (
    <>
    <div className="relative flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      <div className="w-full max-w-lg">
        <div className="text-card-foreground relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
          <div className="p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10">
            <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <span className="flex shrink-0 overflow-hidden rounded-full relative h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50 group-hover:shadow-xl transition-all duration-300">
                <img src="/images/logo.png" alt="Realyze AI Logo" className="aspect-square h-full w-full object-cover"/>
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Create your account ARRC</h1>
                <p className="text-slate-500 text-sm sm:text-base font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
              <div className="w-full">
                <form className="space-y-4">
                  <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Email Address" type="email" controlId="email" placeholder="you@example.com" required
                  leftIcon={<FiMail size={20} className=""/>}/>
                  <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Password" type="Password" controlId="Password" placeholder="Enter your password" required
                  leftIcon={<MdOutlineLock size={20} className=""/>}/>
                  <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Password" type="Password" controlId="Password" placeholder="Re-enter your password" required
                  leftIcon={<MdOutlineLock size={20} className=""/>}/>
                  <Button variant="black" size="lg" rounded="full" className="rounded-full w-full" type="submit">Create account</Button>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                   <p className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Back to {" "} <Link href="/" className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors !underline">Sign In</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SignupPage;