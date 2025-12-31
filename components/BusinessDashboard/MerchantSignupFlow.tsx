"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import DateInput from "../ui/DateInput";
import { forwardRef } from "react";

import {
  Building,
  ExternalLink,
  Check,
  Gift,
  Zap,
  Luggage,
  Briefcase,
  Shield,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import ShowToast from "../Common/ShowToast";

/* ------------------ STEP ENUM ------------------ */
const STEPS = {
  INFO: 1,
  BUSINESS: 2,
  VERIFY: 3,
  STOCK: 4,
  FUNDING: 5,
} as const;

type MerchantSignupProps = {
  onBack?: () => void;
};

export default function MerchantSignupFlow({ onBack }: MerchantSignupProps) {
  const router = useRouter();

  const [step, setStep] = useState<number>(STEPS.INFO);
  const [rewardVisibility, setRewardVisibility] = useState<
    "public" | "private"
  >("public");
  const [form, setForm] = useState({
    businessName: "",
    first: "",
    middle: "",
    last: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [businessForm, setBusinessForm] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [businessErrors, setBusinessErrors] = useState<Record<string, string>>(
    {}
  );
  const [dob, setDob] = useState<Date | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* ------------------ HELPERS ------------------ */
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessForm({
      ...businessForm,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.businessName) e.businessName = "Required";
    if (!form.first) e.first = "Required";
    if (!form.last) e.last = "Required";
    if (!dob) e.dob = "Date of birth is required";
    if (!form.email) e.email = "Required";
    if (!form.phone) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e: Record<string, string> = {};

    if (!businessForm.address) e.address = "Required";
    if (!businessForm.city) e.city = "Required";
    if (!businessForm.state) e.state = "Required";
    if (!businessForm.zip) e.zip = "Required";

    setBusinessErrors(e);
    return Object.keys(e).length === 0;
  };
  const goToStepWithToast = (
    message: string,
    nextStep: number,
    type: "success" | "warning" = "success",
    delay = 600
  ) => {
    ShowToast(message, type);
    setTimeout(() => setStep(nextStep), delay);
  };

  const title =
    step === STEPS.INFO
      ? "Your Information"
      : step === STEPS.BUSINESS
      ? "Business Details"
      : step === STEPS.VERIFY
      ? "Verification"
      : step === STEPS.STOCK
      ? "Stock Rewards"
      : "Funding Setup";

  return (
    <div className="min-h-screen flex items-center justify-center arr-dark-bg">
      <div className="arr-dark-card w-[600px] p-8">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-lg bg-orange-500 flex items-center justify-center text-white">
            <Building />
          </div>
        </div>
        <h2 className="text-center text-white text-xl font-semibold">
          {title}
        </h2>
        <div className="flex justify-center gap-2 mt-4 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={
                step >= i ? "arr-progress-active" : "arr-progress-inactive"
              }
            />
          ))}
        </div>
        {step === STEPS.INFO && (
          <div className="space-y-4">
            <div>
              <input
                name="businessName"
                className="arr-dark-input"
                placeholder="Business Name *"
                onChange={handleChange}
              />
              <p className="min-h-[14px] text-xs text-red-400 mt-1">
                {errors.businessName || ""}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  name="first"
                  className="arr-dark-input"
                  placeholder="First *"
                  onChange={handleChange}
                />
                <p className="min-h-[14px] text-xs text-red-400 mt-1">
                  {errors.first || ""}
                </p>
              </div>

              <div>
                <input
                  name="middle"
                  className="arr-dark-input"
                  placeholder="Middle"
                  onChange={handleChange}
                />
                <p className="min-h-[14px] mt-1"></p>
              </div>

              <div>
                <input
                  name="last"
                  className="arr-dark-input"
                  placeholder="Last *"
                  onChange={handleChange}
                />
                <p className="min-h-[14px] text-xs text-red-400 mt-1">
                  {errors.last || ""}
                </p>
              </div>
            </div>

            <div>
              <DatePicker
                selected={dob}
                onChange={(date: Date | null) => {
                  setDob(date);
                  setErrors((prev) => ({ ...prev, dob: "" }));
                }}
                placeholderText="mm/dd/yyyy"
                dateFormat="MM/dd/yyyy"
                maxDate={new Date()}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<DateInput />}
              />

              <p className="min-h-[14px] text-xs text-red-400 mt-1">
                {errors.dob || ""}
              </p>
            </div>
            <div>
              <input
                name="email"
                className="arr-dark-input"
                placeholder="Business Email *"
                onChange={handleChange}
              />
              <p className="min-h-[14px] text-xs text-red-400 mt-1">
                {errors.email || ""}
              </p>
            </div>

            <div>
              <input
                name="phone"
                className="arr-dark-input"
                placeholder="Business Phone *"
                onChange={handleChange}
              />
              <p className="min-h-[14px] text-xs text-red-400 mt-1">
                {errors.phone || ""}
              </p>
            </div>

            <button
              //   onClick={() => validateStep1() && setStep(STEPS.BUSINESS)}
              onClick={() => {
                if (!validateStep1()) return;
                goToStepWithToast(
                  "Personal details saved successfully!",
                  STEPS.BUSINESS
                );
              }}
              className="arr-cta mt-6"
            >
              Continue →
            </button>
          </div>
        )}

        {step === STEPS.BUSINESS && (
          <div className="space-y-4">
            {/* Business Type */}
            <div className="grid grid-cols-2 gap-3">
              <select className="arr-dark-input">
                <option>Retail</option>
                <option>Restaurant</option>
                <option>Service</option>
                <option>E-commerce</option>
                <option>Other</option>
              </select>

              <select className="arr-dark-input">
                <option>Grocery</option>
                <option>Gas</option>
                <option>Dining</option>
                <option>Retail</option>
                <option>Entertainment</option>
                <option>Healthcare</option>
                <option>Other</option>
              </select>
            </div>
            {/* <input
              className="arr-dark-input"
              placeholder="Business Address *"
            />

            <div className="grid grid-cols-3 gap-3">
              <input className="arr-dark-input" placeholder="City *" />
              <input className="arr-dark-input" placeholder="State *" />
              <input className="arr-dark-input" placeholder="ZIP *" />
            </div> */}

            {/* Business Address */}
            <div>
              <input
                name="address"
                value={businessForm.address}
                onChange={handleBusinessChange}
                className="arr-dark-input"
                placeholder="Business Address *"
              />
              <p className="min-h-[14px] text-xs text-red-400 mt-1">
                {businessErrors.address || ""}
              </p>
            </div>

            {/* City / State / ZIP */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <input
                  name="city"
                  value={businessForm.city}
                  onChange={handleBusinessChange}
                  className="arr-dark-input"
                  placeholder="City *"
                />
                <p className="min-h-[14px] text-xs text-red-400 mt-1">
                  {businessErrors.city || ""}
                </p>
              </div>

              <div>
                <input
                  name="state"
                  value={businessForm.state}
                  onChange={handleBusinessChange}
                  className="arr-dark-input"
                  placeholder="State *"
                />
                <p className="min-h-[14px] text-xs text-red-400 mt-1">
                  {businessErrors.state || ""}
                </p>
              </div>

              <div>
                <input
                  name="zip"
                  value={businessForm.zip}
                  onChange={handleBusinessChange}
                  className="arr-dark-input"
                  placeholder="ZIP *"
                />
                <p className="min-h-[14px] text-xs text-red-400 mt-1">
                  {businessErrors.zip || ""}
                </p>
              </div>
            </div>

            <div className="border border-[#2a3550] rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-white">
                <Luggage className="w-4 h-4 text-orange-400" />
                <span>Stock Rewards</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRewardVisibility("public")}
                  className={`arr-dark-input flex justify-center
                        ${
                          rewardVisibility === "public"
                            ? "border-orange-500 text-orange-400"
                            : "text-gray-400"
                        }`}
                >
                  Public
                </button>

                <button
                  type="button"
                  onClick={() => setRewardVisibility("private")}
                  className={`arr-dark-input flex justify-center
                        ${
                          rewardVisibility === "private"
                            ? "border-orange-500 text-orange-400"
                            : "text-gray-400"
                        }`}
                >
                  Private
                </button>
              </div>
              {rewardVisibility === "private" && (
                <input className="arr-dark-input" placeholder="TICKER (SPY)" />
              )}
              <div className="grid grid-cols-2 gap-3">
                <select className="arr-dark-input">
                  <option>Fixed</option>
                  <option>%</option>
                </select>
                <input className="arr-dark-input" placeholder="0.01" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="arr-dark-input border-orange-500 text-orange-600 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Email
              </button>

              <button className="arr-dark-input text-gray-400 flex items-center justify-center gap-2">
                <DollarSign className="w-4 h-4" />
                Bank
              </button>
            </div>
            <button
              //   onClick={() => setStep(STEPS.VERIFY)}
              onClick={() => {
                if (!validateStep2()) return;

                goToStepWithToast(
                  "Business details saved successfully!",
                  STEPS.VERIFY
                );
              }}
              className="arr-cta mt-4"
            >
              Verify →
            </button>
          </div>
        )}
        {step === STEPS.VERIFY && (
          <div className="space-y-5">
            <div className="border border-[#2a3550] rounded-lg p-4 text-sm text-gray-300">
              <p className="mb-1">🔑 Code sent to:</p>
              <p className="font-medium text-white">demo@email.com</p>
              <div className="mt-3 bg-[#1b2232] border border-orange-500/40 rounded-lg p-3 text-center">
                <p className="text-xs text-orange-400 mb-1">Demo Code:</p>
                <p className="tracking-widest text-lg font-semibold text-orange-400">
                  Z C J G J S
                </p>
              </div>
            </div>

            <button
              //   onClick={() => setStep(STEPS.STOCK)}
              onClick={() =>
                goToStepWithToast("Verification successful!", STEPS.STOCK)
              }
              className="w-full rounded-lg py-3 font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-500"
            >
              Verify →
            </button>
          </div>
        )}
        {step === STEPS.STOCK && (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Check className="text-emerald-500" />
              </div>
              <p className="text-sm text-gray-300">Verified!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 border border-[#2a3550] rounded-lg p-4">
              <Info label="Ticker" value="SPY" highlight />
              <Info label="Amount" value="0.01" />
              <Info label="Type" value="Fixed" />
              <Info label="Lock-up" value="90d" />
            </div>

            <button
              // onClick={() => setStep(STEPS.FUNDING)}
              onClick={() => {
                ShowToast(
                  "Rewards configuration saved successfully!",
                  "success"
                );
                setTimeout(() => {
                  setStep(STEPS.FUNDING);
                }, 600);
              }}
              className="arr-cta"
            >
              Continue →
            </button>

            <button
              onClick={() => setStep(STEPS.FUNDING)}
              className="w-full text-sm text-gray-400 hover:text-gray-300"
            >
              Skip
            </button>
          </div>
        )}
        {step === STEPS.FUNDING && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Briefcase className="text-orange-400" />
              </div>
            </div>

            <div className="border border-[#2a3550] rounded-lg p-4 text-sm text-gray-300">
              <p className="text-emerald-400 font-medium mb-2">✓ Complete</p>
              <ul className="space-y-1">
                <li>• Organization Created</li>
                <li>• Merchant Active</li>
                <li>• Rewards Configured</li>
              </ul>
            </div>

            <button
              //   onClick={() => router.push("/dashboard")}
              onClick={() => {
                ShowToast("Welcome to Dashboard 🎉", "success");
                setTimeout(() => router.push("/dashboard"), 700);
              }}
              className="arr-cta flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Dashboard
            </button>

            <button className="w-full text-sm text-gray-400 hover:text-gray-300">
              Funding later
            </button>
          </div>
        )}
        <div className="my-4 h-px w-full bg-white/10" />
        <a
          href="https://arrcinvest.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-300"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Learn More</span>
        </a>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-[#182033] border border-[#2a3550] rounded-md p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p
        className={`font-semibold ${
          highlight ? "text-orange-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
