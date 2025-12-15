"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { MdOutlineLock } from "react-icons/md";

const LoginPage = () => {
  const [openForgetModal, setOpenForgetModal] = useState(false);
  const [showFirst, setShowFirst] = useState(true);

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
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Welcome to ARRC</h1>
                  <p className="text-slate-500 text-sm sm:text-base font-medium">Sign in to continue</p>
                </div>
                <div className="w-full">
                  <div className="space-y-3">
                    <Button variant="white" size="default" rounded="xl" className="w-full h-auto py-3 flex items-center justify-center gap-3 transition-all duration-200 font-medium group" type="submit"><FcGoogle className="h-6 w-6"/> Continue with Google</Button>
                    <Button variant="white" size="default" rounded="xl" className="w-full h-auto py-3 flex items-center justify-center gap-3 transition-all duration-200 font-medium group" type="submit">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill="#F25022" d="M1 1h10v10H1z" /> <path fill="#00A4EF" d="M13 1h10v10H13z" /> <path fill="#7FBA00" d="M1 13h10v10H1z" /> <path fill="#FFB900" d="M13 13h10v10H13z" /></svg> Continue with Microsoft
                    </Button>
                    <Button variant="white" size="default" rounded="xl" className="w-full h-auto py-3 flex items-center justify-center gap-3 transition-all duration-200 font-medium group" type="submit"><RiFacebookCircleFill className="h-6 w-6" color="#1877F2"/> Continue with Facebook</Button>
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div data-orientation="horizontal" role="none" className="shrink-0 h-[1px] w-full bg-slate-200"/></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/95 px-3 text-slate-400 font-medium tracking-wider">or</span></div>
                  </div>
                  <form className="space-y-4">
                    <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Email Address" type="email" controlId="email" placeholder="you@example.com" required
                    leftIcon={<FiMail size={20} className=""/>}/>
                    <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Password" type="Password" controlId="Password" placeholder="Enter your password" required
                    leftIcon={<MdOutlineLock size={20} className=""/>}/>
                    <Button variant="black" size="lg" rounded="full" className="rounded-full w-full" type="submit">Sign in</Button>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <Link href="#" className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors hover:!underline" onClick={(e) => {e.preventDefault(); setOpenForgetModal(true);}}>Forgot Password?</Link>
                    <p className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Need an account?{" "} <Link href="/signup" className="text-sm text-slate-500 hover:text-slate-700 font-medium transition-colors hover:!underline">Sign up</Link></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Start */}
      <Modal open={openForgetModal} onClose={() => setOpenForgetModal(false)} variant="light" maxWidth="lg">
        <div className="flex flex-col gap-6 w-full text-slate-700 lg:p-4">
          {showFirst ? (
            <div className="space-y-3">
              <h3 className="text-xl font-bold">Reset Your Password</h3>
              <Input variant="default" size="lg" className="rounded-xl bg-slate-50/50 border-slate-200 placeholder:text-slate-400" label="Email Address" type="email" controlId="email" placeholder="Enter your email" required
                leftIcon={<FiMail size={20} className=""/>}/>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-center">Enter Your OTP</h3>
              <div className="flex items-center justify-center gap-3">
                {[...Array(4)].map((_, idx) => (
                  <Input variant="default" type="text" inputMode="numeric" pattern="[0-9]*" maxLength={1} key={idx} className="rounded-lg text-center px-0 text-black !size-14 bg-slate-50/50 border-slate-200 placeholder:text-slate-400"/>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-3">
            <Button variant="black" size="lg" rounded="full" className="rounded-full w-full" onClick={() => setShowFirst(false)}>Sign in</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginPage;