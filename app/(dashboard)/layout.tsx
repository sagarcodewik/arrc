"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Layouts/Sidebar";
import Header from "@/components/Layouts/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 bg-slate-50">
          <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}