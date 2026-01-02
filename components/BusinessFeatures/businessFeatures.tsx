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
  Building,
  TrendingUp,
  Users,
  CheckCircle,
  Shield,
  Badge,
  Heart,
  Gift,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import VisualCard from "./VisualCard";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Logo from "../Logo";

const industries = [
  { name: "Retail & E-commerce", icon: "🛍️", customers: "2.3M+" },
  { name: "Restaurants & Food", icon: "🍽️", customers: "1.8M+" },
  { name: "Gas & Automotive", icon: "⛽", customers: "1.2M+" },
  { name: "Healthcare & Wellness", icon: "🏥", customers: "950K+" },
  { name: "Entertainment", icon: "🎭", customers: "750K+" },
  { name: "Travel & Hospitality", icon: "✈️", customers: "650K+" },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Customer Loyalty",
    description:
      "Transform one-time buyers into lifelong customers with meaningful investment rewards that grow over time.",
  },
  {
    icon: Users,
    title: "Attract New Customers",
    description:
      "Stand out from competitors by offering the only rewards program that builds real wealth for your customers.",
  },
  {
    icon: BarChart3,
    title: "Boost Purchase Frequency",
    description:
      "Customers return more often when they know each purchase contributes to their financial future.",
  },
  {
    icon: Target,
    title: "Higher Average Order Value",
    description:
      "Customers spend more per transaction to maximize their investment rewards.",
  },
  {
    icon: Shield,
    title: "Build Brand Trust",
    description:
      "Position your brand as one that genuinely cares about customer financial wellbeing.",
  },
  {
    icon: Heart,
    title: "Create Emotional Connection",
    description:
      "Go beyond transactional relationships - help customers build their dreams and future.",
  },
];

export default function BusinessAdvertisingPage() {
  const router = useRouter();

  return (
    <div className="bg-white text-slate-900">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a2b6e7e9a803fb92318e56/f073780db_Screenshot2025-08-18at21454AM.png"
            alt="One hundred dollar bill background representing prosperity and wealth building"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay scale-110"
          />

          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-6xl opacity-10"
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerWidth : 1200),
                  y:
                    Math.random() *
                    (typeof window !== "undefined" ? window.innerHeight : 800),
                  rotate: Math.random() * 360,
                }}
                animate={{
                  y: [null, -100, null],
                  rotate: [null, 360],
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

          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-sky-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
            <div className="text-center space-y-8">
              <Logo
                size="sm"
                className="transition-transform duration-700 group-hover:scale-110"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div
                    className="
                        inline-flex items-center gap-2
                        rounded-full
                        px-6 py-2
                        text-sm font-medium
                        text-amber-200
                        border border-amber-400/40
                        bg-amber-400/10
                        backdrop-blur-sm
                        shadow-[0_0_0_1px_rgba(251,191,36,0.25)]
                      "
                  >
                    <Building className="w-5 h-8 text-amber-300" />
                    For Business Partners
                  </div>
                </div>

                <h1 className="text-4xl lg:text-7xl font-bold text-white leading-tight">
                  Reward Customers with
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                    Real Investments
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-cyan-300 max-w-4xl mx-auto leading-relaxed">
                  Join the revolution in customer loyalty. ARRC enables your
                  business to offer rewards that actually matter - turning every
                  purchase into stock investments that build your customers'
                  wealth.
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-lg">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-6 h-6" />
                    <span>Increase Customer Loyalty</span>
                  </div>
                  <div className="flex items-center gap-2 text-sky-400">
                    <CheckCircle className="w-6 h-6" />
                    <span>Boost Sales & AOV</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <CheckCircle className="w-6 h-6" />
                    <span>Differentiate Your Brand</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Link href="/business-suite">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white px-8 py-4 text-lg shadow-xl shadow-cyan-500/20"
                    >
                      <Gift className="w-5 h-5 mr-2" />
                      Start Rewarding Customers
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-sky-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose ARRC for Your Business?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Transform your customer relationships from transactional to
                transformational. Give your customers rewards that actually
                change their lives.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 leading-relaxed text-center">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How ARRC Works for Your Business
          </h2>
          <p className="text-slate-600 mb-16">
            Simple integration, powerful results. Get started in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <Step
              icon={<Zap />}
              title="Quick Setup"
              text="Integrate ARRC into POS or e-commerce in under an hour."
            />
            <Step
              icon={<Target />}
              title="Set Rewards"
              text="Choose reward percentage and investment options."
            />
            <Step
              icon={<CreditCard />}
              title="Customer Shops"
              text="Customers earn investments automatically."
            />
            <Step
              icon={<BarChart3 />}
              title="Watch Growth"
              text="Track loyalty, spending & performance."
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-gradient-to-b from-cyan-50 via-sky-50/70 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-100 px-6 py-3 text-sm font-semibold text-emerald-800 shadow-sm mb-6">
            ✓ Real Results, Real Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            See ARRC Transform Customer Experiences
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Everyday purchases become powerful investment opportunities that
            keep customers coming back.
          </p>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
            <VisualCard
              title="Seamless Technology"
              text="Cutting-edge payment integration that works with your existing systems"
              imageSrc="/images/seamless_technology.jpg"
            />
            <VisualCard
              title="Delighted Customers"
              text="See the joy when customers realize they're building wealth with every purchase"
              imageSrc="/images/delighted_customer.jpg"
            />
            <VisualCard
              title="Everyday Growth"
              text="Groceries, gas, coffee — every purchase becomes an investment in their future"
              imageSrc="/images/every_day_growth.jpg"
            />
          </div>

          <div
            className="
            relative
            mt-24
            bg-white/90
            backdrop-blur-xl
            rounded-3xl
            p-10 md:p-14
            shadow-[0_30px_80px_-20px_rgba(2,132,199,0.35)]
          "
          >
            <p className="text-sm text-slate-500 italic text-center mb-10">
              * Projected benefits based on loyalty program industry research
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                  2–4x
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  Customer Retention Potential
                </div>
                <p className="text-slate-600">
                  Investment-based rewards show stronger retention than
                  traditional programs
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  50–80%
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  Purchase Frequency Potential
                </div>
                <p className="text-slate-600">
                  Customers engage more with rewards that build long-term value
                </p>
              </div>
              <div className="space-y-3">
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  15–30%
                </div>
                <div className="text-lg font-semibold text-slate-900">
                  AOV Increase Potential
                </div>
                <p className="text-slate-600">
                  Higher order values when customers maximize investment rewards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              How ARRC Works for Your Business
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple integration, powerful results. Get started in minutes, not
              months.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Quick Setup",
                description:
                  "Integrate ARRC into your POS system or e-commerce platform in under an hour.",
                icon: Zap,
              },
              {
                step: "2",
                title: "Set Rewards",
                description:
                  "Choose your reward percentage and which stocks your customers can invest in.",
                icon: Target,
              },
              {
                step: "3",
                title: "Customer Shops",
                description:
                  "Customers make purchases and automatically earn investment rewards with each transaction.",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Watch Growth",
                description:
                  "Track customer loyalty, spending increases, and overall business growth through our dashboard.",
                icon: BarChart3,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Perfect for Every Industry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From retail to restaurants, ARRC works across all business types
              to drive meaningful customer engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
              >
                <Industry
                  icon={industry.icon}
                  title={industry.name}
                  stat={`${industry.customers} customers served`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Industry = ({ icon, title, stat }: any) => (
  <div
    className="
      bg-white
      rounded-xl
      border border-slate-200/60
      shadow-sm
      hover:shadow-md
      transition-all duration-300
      px-8 py-10
      text-center
      flex flex-col items-center
    "
  >
    <div className="text-4xl mb-4">{icon}</div>

    <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
    <p className="text-sm font-medium text-sky-600">{stat}</p>
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
