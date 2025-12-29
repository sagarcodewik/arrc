"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import Sidebar from "@/components/Layouts/Sidebar";
import Header from "@/components/Layouts/Header";
import type { RootState } from "@/redux/store";

const NO_LAYOUT_ROUTES = [
  "/about",
   "/About",
  "/BusinessAdvertising",
  "/business-advertising",
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth
  );

  // 🔐 Auth guard
  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.replace("/");
    }
  }, [isAuthenticated, token, router]);

  if (!isAuthenticated || !token) {
    return null;
  }

  // 🚫 Pages without Header & Sidebar
  if (NO_LAYOUT_ROUTES.includes(pathname)) {
    return (
      <main className="min-h-screen bg-white">
        {children}
      </main>
    );
  }

  // ✅ Default Dashboard Layout
  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 bg-slate-50">
          <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}




// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// import Sidebar from "@/components/Layouts/Sidebar";
// import Header from "@/components/Layouts/Header";
// import type { RootState } from "@/redux/store";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const router = useRouter();

//   const { isAuthenticated, token } = useSelector(
//     (state: RootState) => state.auth
//   );
//   useEffect(() => {
//     if (!isAuthenticated || !token) {
//       router.replace("/");
//     }
//   }, [isAuthenticated, token, router]);

//   if (!isAuthenticated || !token) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-white text-gray-900 flex">
//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <div className="flex flex-col flex-1 lg:ml-64">
//         <Header onMenuClick={() => setSidebarOpen(true)} />

//         <main className="flex-1 bg-slate-50">
//           <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
