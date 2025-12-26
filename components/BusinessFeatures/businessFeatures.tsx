"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Utensils,
  Fuel,
  HeartPulse,
  Film,
  Plane,
  Zap,
  Target,
  CreditCard,
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Heart,
} from "lucide-react";
import VisualCard from "./VisualCard";

export default function BusinessAdvertisingPage() {
    const router = useRouter();

  return (
    <div className="bg-white text-slate-900">
      <section className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,#0f172a,#020617)] text-white">
        <div className="absolute inset-0 bg-[url('/money-bg.png')] opacity-10" />
        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <span className="inline-block mb-4 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1 text-sm text-yellow-300">
            For Business Partners
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Reward Customers with{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Real Investments
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Turn every purchase into stock investments that build your
            customers’ wealth and your brand loyalty.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-10">
            <span className="flex items-center gap-2 text-emerald-400">
              ✓ Increase Customer Loyalty
            </span>
            <span className="flex items-center gap-2 text-cyan-400">
              ✓ Boost Sales & AOV
            </span>
            <span className="flex items-center gap-2 text-yellow-400">
              ✓ Differentiate Your Brand
            </span>
          </div>

          <button
           onClick={() => router.push("/BusinessSuite")} 
          className="px-8 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 font-semibold transition">
            Start Rewarding Customers →
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for Every Industry
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-14">
            From retail to restaurants, ARRC works across all business types to
            drive meaningful customer engagement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Industry icon={<ShoppingBag />} title="Retail & E-commerce" stat="2.3M+ customers served" />
            <Industry icon={<Utensils />} title="Restaurants & Food" stat="1.8M+ customers served" />
            <Industry icon={<Fuel />} title="Gas & Automotive" stat="1.2M+ customers served" />
            <Industry icon={<HeartPulse />} title="Healthcare & Wellness" stat="950K+ customers served" />
            <Industry icon={<Film />} title="Entertainment" stat="750K+ customers served" />
            <Industry icon={<Plane />} title="Travel & Hospitality" stat="650K+ customers served" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ARRC Works for Your Business
          </h2>
          <p className="text-slate-600 mb-16">
            Simple integration, powerful results. Get started in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <Step icon={<Zap />} title="Quick Setup" text="Integrate ARRC into POS or e-commerce in under an hour." />
            <Step icon={<Target />} title="Set Rewards" text="Choose reward percentage and investment options." />
            <Step icon={<CreditCard />} title="Customer Shops" text="Customers earn investments automatically." />
            <Step icon={<BarChart3 />} title="Watch Growth" text="Track loyalty, spending & performance." />
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm mb-4">
            ✓ Real Results, Real Impact
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See ARRC Transform Customer Experiences
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-16">
            Everyday purchases become powerful investment opportunities that
            keep customers coming back.
          </p>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisualCard title="Seamless Technology" text="Works with existing systems" />
            <VisualCard title="Delighted Customers" text="Customers build wealth effortlessly" />
            <VisualCard title="Everyday Growth" text="Groceries, gas, coffee → investments" />
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisualCard
              title="Seamless Technology"
              text="Works with existing systems"
              imageSrc="/images/seamless_technology.jpg"
            />
            <VisualCard
              title="Delighted Customers"
              text="Customers build wealth effortlessly"
              imageSrc="/images/delighted_customer.jpg"
            />
            <VisualCard
              title="Everyday Growth"
              text="Groceries, gas, coffee → investments"
              imageSrc="/images/every_day_growth.jpg"
            />
          </div>


          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-lg p-10">
            <Metric value="2-4x" label="Customer Retention Potential" />
            <Metric value="50-80%" label="Purchase Frequency Potential" />
            <Metric value="15-30%" label="AOV Increase Potential" />
          </div>
        </div>
      </section>


      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose ARRC for Your Business?
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-16">
            Transform transactional relationships into emotional connections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Benefit icon={<Users />} title="Increase Loyalty" text="Turn buyers into lifelong customers." />
            <Benefit icon={<TrendingUp />} title="Attract New Customers" text="Differentiate with real investment rewards." />
            <Benefit icon={<BarChart3 />} title="Boost Frequency" text="Customers return more often." />
            <Benefit icon={<CreditCard />} title="Higher Order Value" text="Spend more to earn more rewards." />
            <Benefit icon={<Shield />} title="Build Brand Trust" text="Show genuine care for financial wellbeing." />
            <Benefit icon={<Heart />} title="Emotional Connection" text="Help customers build their future." />
          </div>
        </div>
      </section>
    </div>
  );
}

const Industry = ({ icon, title, stat }: any) => (
  <div className="bg-white rounded-xl shadow p-8 text-center">
    <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full">
      {icon}
    </div>
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="text-sm text-cyan-600 mt-1">{stat}</p>
  </div>
);

const Step = ({ icon, title, text }: any) => (
  <div>
    <div className="mx-auto mb-4 w-14 h-14 flex items-center justify-center bg-cyan-500 text-white rounded-xl">
      {icon}
    </div>
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);



const Metric = ({ value, label }: any) => (
  <div>
    <div className="text-4xl font-bold text-cyan-600">{value}</div>
    <p className="text-sm text-slate-600">{label}</p>
  </div>
);

const Benefit = ({ icon, title, text }: any) => (
  <div className="bg-white rounded-xl shadow p-8 text-center">
    <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-cyan-100 text-cyan-600 rounded-full">
      {icon}
    </div>
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-sm text-slate-600">{text}</p>
  </div>
);
