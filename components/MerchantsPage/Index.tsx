"use client";

import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import {
  Filter,
  RefreshCw,
} from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { LuBuilding } from "react-icons/lu";

import {
  API_GET_ALL_CATEGORY,
  API_GET_CATEGORY_BY_ID,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import { useLivePrices } from "../useLivePrices";

import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/redux/loaderSlice";

/* -------------------------------- TYPES -------------------------------- */

type Category = {
  _id: string;
  name: string;
  slug?: string;
};

type Merchant = any;

/* ------------------------------- COMPONENT ------------------------------ */

const MerchantsPage = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const merchantsWithPrices = useLivePrices(merchants);

/* ----------------------------- INITIAL LOAD ----------------------------- */

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      dispatch(showLoader());

      const [categoryRes, merchantRes] = await Promise.all([
        getApiWithOutQuery({ url: API_GET_ALL_CATEGORY }),
        apiPost({ url: API_GET_CATEGORY_BY_ID, values: {} }),
      ]);

      setCategories(Array.isArray(categoryRes) ? categoryRes : []);
      setMerchants(merchantRes?.data || []);
    } catch (error) {
      setCategories([]);
      setMerchants([]);
    } finally {
      dispatch(hideLoader());
    }
  };

/* --------------------------- FETCH MERCHANTS ----------------------------- */

  const fetchMerchants = async (categoryId?: string) => {
    try {
      setRefreshing(true);
      // dispatch(showLoader());

      const res = await apiPost({
        url: API_GET_CATEGORY_BY_ID,
        values: categoryId ? { categoryId } : {},
      });

      setMerchants(res?.data || []);
    } catch (error) {
      setMerchants([]);
    } finally {
      setRefreshing(false);
      // dispatch(hideLoader());
    }
  };

/* ------------------------------ FILTERING ------------------------------- */

  const filteredMerchants = merchantsWithPrices.filter((item: any) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();

    return (
      item?.name?.toLowerCase().includes(q) ||
      item?.description?.toLowerCase().includes(q) ||
      item?.stockSymbol?.toLowerCase().includes(q) ||
      item?.categoryId?.slug?.toLowerCase().includes(q)
    );
  });

/* --------------------------------- UI ---------------------------------- */

  return (
    <>
      {/* HEADER */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-4 w-full">
            <div className="flex-1">
              <div className="text-center md:text-left">
                <h1 className="text-slate-900 text-2xl sm:text-3xl lg:text-3xl font-semibold">
                  Merchant Partners
                </h1>
                <p className="text-slate-600 text-sm sm:text-base font-medium">
                  Shop with our partners and earn stock rewards
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-center md:justify-end mt-4 md:mt-0 w-full md:w-auto">
              <Button
                variant="outline"
                size="default"
                rounded="lg"
                type="button"
                onClick={() => fetchMerchants(selectedCategory ?? undefined)}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <RefreshCw
                  size={18}
                  className={refreshing ? "animate-spin" : ""}
                />
                <span>Refresh Data</span>
              </Button>
            </div>
          </div>
        </Section>
      </AnimateSection>

      {/* CONTENT */}
      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">

            {/* SEARCH */}
            <div className="sm:col-span-2 lg:col-span-3">
              <Input
                placeholder="Search merchants..."
                leftIcon={<IoSearchOutline className="h-4 w-4 lg:h-5 lg:w-5" />}
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="!bg-white shadow-sm"
              />
            </div>

            {/* CATEGORY FILTER */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2 lg:gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-slate-500" />
                <span className="text-xs lg:text-sm font-medium text-slate-600">
                  Filter by category:
                </span>
              </div>

              <Button
                size="sm"
                rounded="full"
                variant={!selectedCategory ? "cyan" : "outline"}
                className="!rounded-full h-auto py-2"
                onClick={() => {
                  setSelectedCategory(null);
                  fetchMerchants();
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
                  className="!rounded-full h-auto py-2"
                  onClick={() => {
                    setSelectedCategory(cat._id);
                    fetchMerchants(cat._id);
                  }}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* MERCHANT CARDS */}
            {filteredMerchants.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
              >
                <div className="p-6 space-y-1.5">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200 overflow-hidden shrink-0">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <LuBuilding />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 capitalize">
                          {item.categoryId?.slug || "other"}
                        </p>
                      </div>
                    </div>

                    {item.isFeatured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-200 bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 whitespace-nowrap">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex-grow space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                      <div className="text-xs font-medium text-slate-500">
                        % Reward Rate
                      </div>
                      <div className="text-xl font-bold text-cyan-700">
                        {item.rewardRate?.toFixed(2) || "0.00"}%
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                      <div className="text-xs font-medium text-slate-500">
                        🏢 Stock
                      </div>
                      <div className="text-xl font-bold text-slate-800">
                        {item.stockSymbol || "N/A"}
                      </div>
                    </div>
                  </div>

                  {item.market && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <span className="text-slate-500 font-medium">
                        Price:
                      </span>
                      <span className="font-bold text-slate-800">
                        ${item.market.price.toFixed(2)}
                      </span>

                      <span
                        className={`flex items-center gap-1 font-bold ${
                          item.market.changePercent >= 0
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.market.changePercent >= 0 ? (
                          <HiArrowTrendingUp />
                        ) : (
                          <HiArrowTrendingDown />
                        )}
                        {Math.abs(item.market.changePercent).toFixed(2)}%
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        (Delayed)
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 pt-0">
                  <Button
                    variant="outline"
                    size="default"
                    rounded="lg"
                    type="button"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full"
                  >
                    👑 Reward Tiers
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </AnimateSection>
    </>
  );
};

export default MerchantsPage;
