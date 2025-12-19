"use client";
import { useEffect, useState } from "react";
import AnimateSection from "../AnimateSection";
import Section from "../Section";
import { Button } from "../ui/Button";
import Modal from "../ui/Modal";
import {
  CircleCheckBig,
  Filter,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { FaCircleNotch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { HiArrowTrendingDown, HiArrowTrendingUp } from "react-icons/hi2";
import { LuBuilding } from "react-icons/lu";
import {
  API_GET_ALL_CATEGORY,
  API_GET_CATEGORY_BY_ID,
} from "@/utils/api/APIConstant";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

export type Categories = {
  _id: string;
  name: string;
  icon?: string;
  isActive: boolean;
  createdAt?: string;
};
const MerchantsPage = () => {
  const [active, setActive] = useState(false);
  const [merchants, setMerchants] = useState<any[]>([]);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (openAccountModal) {
      setShowFirst(true);
      setCompleted(false);
    }
  }, [openAccountModal]);

  useEffect(() => {
    if (!showFirst) {
      const timer = setTimeout(() => setCompleted(true), 4000);
      const closeTimer = setTimeout(() => setOpenAccountModal(false), 8000);
      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [showFirst]);

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    try {
      setLoading(true);

      const res = await getApiWithOutQuery({
        url: API_GET_ALL_CATEGORY,
      });
      const list = Array.isArray(res) ? res : [];
      setCategories(list);
    } catch (error) {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCategoryClick = async (categoryId?: string) => {
    try {
      const res = await apiPost({
        url: API_GET_CATEGORY_BY_ID,
        values: categoryId ? { categoryId } : {},
      });

      setMerchants(res?.data || []);
    } catch (error) {
      setMerchants([]);
    }
  };
  const NoMerchants = () => {
    return (
      <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-cyan-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7l9-4 9 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          No Merchants Found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  };
  return (
    <>
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
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <RefreshCw size={18} className="flex-shrink-0" />{" "}
                <span>Refresh Data</span>
              </Button>
            </div>
          </div>
        </Section>
      </AnimateSection>

      <AnimateSection>
        <Section customClass="relative mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="sm:col-span-2 lg:col-span-3">
              <Input
                controlId="search"
                placeholder="Search merchants..."
                leftIcon={<IoSearchOutline className="h-4 w-4 lg:h-5 lg:w-5" />}
                variant="default"
                size="lg"
                className="!bg-white shadow-sm"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex flex-wrap gap-2 lg:gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3 h-3 lg:w-4 lg:h-4 text-slate-500" />
                <span className="text-xs lg:text-sm font-medium text-slate-600">
                  Filter by category:
                </span>
              </div>
              <Button
                variant={selectedCategory === null ? "cyan" : "outline"}
                size="sm"
                rounded="full"
                className="!rounded-full h-auto py-2"
                onClick={() => {
                  setSelectedCategory(null);
                  handleCategoryClick();
                }}
              >
                All Categories
              </Button>

              {categories.length === 0 ? (
                <span className="text-sm text-slate-400">
                  Loading categories...
                </span>
              ) : (
                categories.map((cat) => (
                  <Button
                    key={cat._id}
                    variant={selectedCategory === cat._id ? "cyan" : "outline"}
                    size="sm"
                    rounded="full"
                    className="!rounded-full h-auto py-2"
                    onClick={() => {
                      setSelectedCategory(cat._id);
                      handleCategoryClick(cat._id);
                    }}
                  >
                    {cat.name}
                  </Button>
                ))
              )}
            </div>
            {merchants.length === 0 ? (
              <NoMerchants />
            ) : (
              merchants.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col h-full rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                >
                  <div className="p-6 space-y-1.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-slate-200">
                          <LuBuilding />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-slate-500 capitalize">
                            {item.categoryId?.slug}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex-grow space-y-4">
                    <p className="text-sm text-slate-600">{item.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                        <div className="text-xs text-slate-500">
                          % Reward Rate
                        </div>
                        <div className="text-xl font-bold text-cyan-700">
                          {item.rewardRate}%
                        </div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-slate-100/70 p-3">
                        <div className="text-xs text-slate-500">🏢 Stock</div>
                        <div className="text-xl font-bold text-slate-800">
                          {item.stockSymbol}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Button variant="outline" rounded="lg" className="w-full">
                      👑 Reward Tiers
                    </Button>
                  </div>
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
