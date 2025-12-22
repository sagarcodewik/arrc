"use client";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";
import { useEffect } from "react";
export default function PortfolioPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(showLoader());
    const timer = setTimeout(() => {
      dispatch(hideLoader());
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold">This is my Portfolio page</h1>
    </div>
  );
}
