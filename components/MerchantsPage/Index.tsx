"use client";

import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import { ChevronDown, ChevronUp, Filter, LucideBuilding, RefreshCw } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { Store } from "lucide-react";

import {
  API_GET_ALL_CATEGORY,
  API_GET_CATEGORY_BY_ID,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { useLivePrices } from "../useLivePrices";

import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";


export type Categories = {
  _id: string;
  name: string;
  icon?: string;
  isActive: boolean;
};


const TIER_CONFIG: Record<
  string,
  {
    label: string;
    icon: string;
    border: string;
    bg: string;
    text: string;
  }
> = {
  bronze: {
    label: "Bronze",
    icon: "🥉",
    border: "border-orange-400",
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
  silver: {
    label: "Silver",
    icon: "🥈",
    border: "border-gray-300",
    bg: "bg-gray-50",
    text: "text-gray-500",
  },
  gold: {
    label: "Gold",
    icon: "🥇",
    border: "border-yellow-400",
    bg: "bg-yellow-50",
    text: "text-yellow-600",
  },
  platinum: {
    label: "Platinum",
    icon: "💎",
    border: "border-slate-300",
    bg: "bg-slate-50",
    text: "text-slate-400",
  },
};


const MerchantsPage = () => {
  const dispatch = useDispatch();

  const [merchants, setMerchants] = useState<any[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [openTierId, setOpenTierId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const merchantsWithPrices = useLivePrices(merchants, refreshKey);


  useEffect(() => {
    initPage();
  }, []);

  const initPage = async () => {
    try {
      dispatch(showLoader());

      const [categoryRes, merchantRes] = await Promise.all([
        getApiWithOutQuery({ url: API_GET_ALL_CATEGORY }),
        apiPost({ url: API_GET_CATEGORY_BY_ID, values: {} }),
      ]);

      setCategories(Array.isArray(categoryRes) ? categoryRes : []);
      setMerchants(merchantRes?.data || []);
      setRefreshKey((p) => p + 1);
    } catch {
      setCategories([]);
      setMerchants([]);
    } finally {
      dispatch(hideLoader());
    }
  };


  const handleCategoryClick = async (categoryId?: string) => {
    try {
      const res = await apiPost({
        url: API_GET_CATEGORY_BY_ID,
        values: categoryId ? { categoryId } : {},
      });

      setMerchants(res?.data || []);
      setRefreshKey((p) => p + 1);
    } catch {
      setMerchants([]);
    } finally {

    }
  };


  const fetchMerchants = async (categoryId?: string) => {
    try {
      setRefreshing(true);
      dispatch(showLoader());

      const res = await apiPost({
        url: API_GET_CATEGORY_BY_ID,
        values: categoryId ? { categoryId } : {},
      });

      setMerchants(res?.data || []);
      setRefreshKey((p) => p + 1);
    } catch {
      setMerchants([]);
    } finally {
      setRefreshing(false);
      dispatch(hideLoader());
    }
  };


  const filteredMerchants = merchantsWithPrices.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.stockSymbol?.toLowerCase().includes(q) ||
      item.categoryId?.slug?.toLowerCase().includes(q)
    );
  });


  const hasActiveRewardTier = (tiers?: Record<string, number>) => {
    if (!tiers) return false;
    return Object.values(tiers).some(
      (rate) => typeof rate === "number" && rate > 0
    );
  };

  const getAvgRewardRate = (rewardRate?: number) => {
    if (typeof rewardRate !== "number") return "0.00";
    return rewardRate.toFixed(2);
  };

  const NoMerchants = () => (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
      <Store className="mx-auto mb-6 h-20 w-20 text-cyan-500" />
      <h3 className="text-lg font-semibold text-slate-900">
        No Merchants Found
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Try adjusting your search or filter criteria.
      </p>
    </div>
  );


  return (
    <>
      <AnimateSection>
        <Section customClass="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">
                Merchant Partners
              </h1>
              <p className="text-slate-600">
                Shop with our partners and earn stock rewards
              </p>
            </div>

            <Button
              variant="outline"
              disabled={refreshing}
              onClick={() => fetchMerchants(selectedCategory ?? undefined)}
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              <span className="ml-2">
                {refreshing ? "Refreshing..." : "Refresh Data"}
              </span>
            </Button>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full">
              <Input
                placeholder="Search merchants..."
                leftIcon={<IoSearchOutline />}
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-span-full flex flex-wrap gap-2 items-center">
              <Filter size={14} className="text-slate-500" />
              <p> Filter by category: </p>

              <Button
                size="sm"
                rounded="full"
                variant={selectedCategory === null ? "cyan" : "outline"}
                onClick={() => {
                  setSelectedCategory(null);
                  handleCategoryClick();
                }}
              >
                All Categories
              </Button>

              {categories.map((cat) => (
                <Button
                  key={cat._id}
                  size="sm"
                  rounded="full"
                  variant={selectedCategory === cat._id ? "cyan" : "outline"}
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    handleCategoryClick(cat._id);
                  }}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {filteredMerchants.length === 0 ? (
              <NoMerchants />
            ) : (
              filteredMerchants.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg border bg-white overflow-hidden">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <LucideBuilding className="text-slate-500" />
                          )}
                        </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {item.categoryId?.slug ?? "Other"}
                        </p>
                      </div>
                    </div>

                    {item.isFeatured && (
                      <span className="flex items-center gap-1 rounded-full bg-yellow-50 border border-yellow-300 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    {item.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="rounded-lg border bg-slate-100/70 p-3">
                      <div className="text-xs text-slate-500">
                        % Reward Rate
                      </div>
                      <div className="text-xl font-bold text-cyan-700">
                        {getAvgRewardRate(item.rewardRate)}%
                      </div>
                    </div>

                    <div className="rounded-lg border bg-slate-100/70 p-3">
                      <div className="text-xs text-slate-500">Stock</div>
                      <div className="text-xl font-bold text-slate-800">
                        {item.stockSymbol ?? "N/A"}
                      </div>
                    </div>
                  </div>
                  {item.market && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />

                      <span>
                        <span className="font-medium">Price:</span>{" "}
                        <span className="font-semibold">
                          ${item.market.price.toFixed(2)}
                        </span>
                      </span>

                      <span
                        className={`flex items-center gap-1 font-medium ${
                          item.market.changePercent >= 0
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.market.changePercent >= 0 ? (
                          <HiArrowTrendingUp className="h-4 w-4" />
                        ) : (
                          <HiArrowTrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(item.market.changePercent).toFixed(2)}%
                      </span>

                      <span className="text-xs text-slate-400">(Delayed)</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="mt-auto flex items-center justify-center gap-2"
                    onClick={() =>
                      setOpenTierId(openTierId === item._id ? null : item._id)
                    }
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-yellow-500">👑</span>
                      Reward Tiers
                    </span>

                    {openTierId === item._id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>

                  {openTierId === item._id && (
                    <div className="mt-4 space-y-3">
                      {hasActiveRewardTier(item.rewardTier) ? (
                        Object.entries(item.rewardTier as Record<string, number>).map(([key, rate]) => {
                          const tier = TIER_CONFIG[key];
                          if (!tier) return null;

                          return (
                            <div
                              key={key}
                              className={`flex justify-between rounded-xl border px-4 py-3 ${tier.border} ${tier.bg}`}
                            >
                              <div className="flex items-center gap-3">
                                <span>{tier.icon}</span>
                                <span className={tier.text}>
                                  {tier.label}
                                </span>
                              </div>
                              <span className={`${tier.text} font-bold`}>
                                {rate}%
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-center text-sm text-slate-500">
                          No reward tiers configured
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default MerchantsPage;
