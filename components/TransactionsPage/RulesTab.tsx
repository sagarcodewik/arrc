"use client";
import { useEffect, useState } from "react";
import { Zap, TrendingUp } from "lucide-react";
import { API_GET_ALL_CATEGORY } from "@/utils/api/APIConstant";
import { getApiWithOutQuery } from "@/utils/endpoints/common";

type Categories = {
  _id: string;
  name: string;
};

const ICON_MAP: Record<string, string> = {
  Grocery: "🛒",
  Gas: "⛽",
  Dining: "🍽️",
  Retail: "🛍️",
  Entertainment: "🎬",
  Travel: "✈️",
  Healthcare: "🏥",
  Other: "📦",
};

export default function RulesTab() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getApiWithOutQuery({
          url: API_GET_ALL_CATEGORY,
        });
        if (Array.isArray(res)) {
          setCategories(res);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="text-cyan-600" size={18} />
          <h3 className="text-lg font-semibold text-cyan-900">
            Smart Auto-Detection
          </h3>
        </div>

        <p className="text-sm text-cyan-800 mb-4">
          Transactions are automatically categorized based on merchant name
          patterns using AI-powered detection.
        </p>
        {loading ? (
          <div className="text-sm text-cyan-700">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm border border-cyan-100 shadow-sm"
              >
                <span className="text-lg">
                  {ICON_MAP[cat.name] || "📁"}
                </span>
                <span className="text-gray-800 font-medium">
                  {cat.name}
                </span>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="col-span-full text-sm text-gray-500">
                No categories found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-white p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-600" size={18} />
          <h3 className="text-lg font-semibold text-gray-900">
            Top Merchants
          </h3>
        </div>

        <div className="text-center text-sm text-gray-500 py-12">
          No transaction data yet
        </div>
      </div>
    </div>
  );
}
