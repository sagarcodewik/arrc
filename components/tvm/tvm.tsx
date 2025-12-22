"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { API_TVM_CALCULATE } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import { showLoader, hideLoader } from "@/redux/loaderSlice";

export default function TVMCalculatorPage() {
  const dispatch = useDispatch();
  const firstLoad = useRef(true); 

  const [form, setForm] = useState({
    initialInvestment: 10000,
    contributionAmount: 100,
    contributionFrequency: "MONTHLY",
    annualInterestRate: 7,
    investmentYears: 10,
    compoundingFrequency: "MONTHLY",
  });

  const [result, setResult] = useState<any>(null);

  const calculateTVM = async (withLoader = false) => {
    if (withLoader) dispatch(showLoader());

    try {
      const res = await apiPost({
        url: API_TVM_CALCULATE,
        values: form,
      });

      setResult(res.data);
    } catch (error) {
      console.error("TVM calculation failed", error);
    } finally {
      if (withLoader) dispatch(hideLoader());
    }
  };

  useEffect(() => {
    calculateTVM(true);
    firstLoad.current = false;
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      calculateTVM(false);
    }
  }, [form]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-5">
          <h2 className="text-xl font-bold">💰 Your Investment Strategy</h2>

          <Input label="Initial Investment ($)">
            <input
              type="number"
              name="initialInvestment"
              value={form.initialInvestment}
              onChange={onChange}
              className="input"
            />
          </Input>

          <Input label="Regular Contribution ($)">
            <input
              type="number"
              name="contributionAmount"
              value={form.contributionAmount}
              onChange={onChange}
              className="input"
            />
          </Input>

          <Select
            label="Contribution Frequency"
            name="contributionFrequency"
            value={form.contributionFrequency}
            onChange={onChange}
            options={["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"]}
          />

          <Input label="Annual Interest Rate (%)">
            <input
              type="number"
              name="annualInterestRate"
              value={form.annualInterestRate}
              onChange={onChange}
              className="input"
            />
          </Input>

          <Input label="Investment Horizon (Years)">
            <input
              type="number"
              name="investmentYears"
              value={form.investmentYears}
              onChange={onChange}
              className="input"
            />
          </Input>

          <Select
            label="Compounding Frequency"
            name="compoundingFrequency"
            value={form.compoundingFrequency}
            onChange={onChange}
            options={["ANNUAL", "QUARTERLY", "MONTHLY", "DAILY"]}
          />
        </div>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">📈 Your Combined Growth</h2>

          {!result ? (
            <p className="text-gray-500">Calculating...</p>
          ) : (
            <>
              <Stat title="Total Future Value" value={result.totalFutureValue} />
              <Stat title="Total Interest Earned" value={result.totalInterest} />

              <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
                <p>Invested Principal: ${result.investedPrincipal}</p>
                <p>Interest from Lump Sum: ${result.interestFromLump}</p>
                <p>
                  Interest from Contributions: $
                  {result.interestFromContrib}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}


function Input({ label, children }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}

function Select({ label, options, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select {...props} className="input">
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Stat({ title, value }: any) {
  return (
    <div className="bg-slate-50 rounded-lg p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">
        ${Number(value).toLocaleString()}
      </p>
    </div>
  );
}
