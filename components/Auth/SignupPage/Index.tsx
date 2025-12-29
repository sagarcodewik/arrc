"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { onLoginSuccess } from "@/redux/auth/authSlice";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ShowToast from "@/components/Common/ShowToast";

import { FiMail } from "react-icons/fi";
import {
  MdOutlineLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

import {
  API_REGISTER,
  API_OTP_RESEND,
  API_OTP_VERIFICATION,
} from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "One uppercase letter required")
    .matches(/[0-9]/, "One number required")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),
});


const getStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthText = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
const strengthColor = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-emerald-500",
];

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!otpModalOpen || timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpModalOpen, timer]);

  const handleOtpChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");

    if (clean.length === 6) {
        setOtp(clean.split("").slice(0, 6));
        inputRefs.current[5]?.focus();
        return;
      }

      if (clean.length > 1) return;

      const newOtp = [...otp];
      newOtp[index] = clean;
      setOtp(newOtp);

      if (clean && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (otpLoading) return;

    const finalOtp = Number(otp.join(""));

    if (!finalOtp || otp.join("").length !== 6) {
        ShowToast("Enter valid 6 digit OTP", "error");
        return;
      }

    try {
      setOtpLoading(true);

      const res = await apiPost({
        url: API_OTP_VERIFICATION,
        values: { email: registeredEmail, otp: finalOtp },
      });

      if (!res?.success) {
        ShowToast(res?.error || "Invalid OTP", "error");
        return;
      }

      dispatch(
        onLoginSuccess({
          data: { user: res.data.user, token: res.data.token },
        })
      );

      ShowToast("OTP verified successfully", "success");
      setOtpModalOpen(false);
      router.push("/Dashboard");
    } catch {
      ShowToast("Network error", "error");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);

      const res = await apiPost({
        url: API_OTP_RESEND,
        values: { email: registeredEmail },
      });

      if (!res?.success) {
        ShowToast(res?.error || "Failed to resend OTP", "error");
        return;
      }

      ShowToast("OTP resent successfully", "success");
      setTimer(60);
       setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      ShowToast("Network error", "error");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl">
          <button
            onClick={() => router.push("/")}
            className="mb-4 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <span className="text-lg">←</span> Back to sign in
          </button>

          <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
            Create your account
          </h1>

          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const res = await apiPost({
                  url: API_REGISTER,
                  values: {
                    email: values.email,
                    password: values.password,
                  },
                });

                if (!res?.success) {
                  ShowToast(res?.error || "Something went wrong", "error");
                  return;
                }

                setRegisteredEmail(values.email);
                setOtp(["", "", "", "", "", ""]);
                setTimer(60);
                setOtpModalOpen(true);

                await apiPost({
                  url: API_OTP_RESEND,
                  values: { email: values.email },
                });

                ShowToast("OTP sent to your email", "success");
              } catch {
                ShowToast("Network error", "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              handleChange,
              isSubmitting,
              errors,
              touched,
            }) => {
              const strength = getStrength(values.password);

              return (
                <Form className="space-y-4">
                  <Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    leftIcon={<FiMail size={18} />}
                  />

                  {/* PASSWORD */}
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      leftIcon={<MdOutlineLock size={18} />}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-[34px] text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <MdVisibilityOff size={20} />
                      ) : (
                        <MdVisibility size={20} />
                      )}
                    </button>
                  </div>

                  {values.password && (
                    <div>
                      <div className="h-2 w-full rounded bg-slate-200">
                        <div
                          className={`h-2 rounded ${strengthColor[strength]}`}
                          style={{ width: `${(strength / 4) * 100}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Strength: {strengthText[strength]}
                      </p>
                    </div>
                  )}
                <div className="relative">
                      <Input
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        leftIcon={<MdOutlineLock size={18} />}
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-[34px] text-slate-500 hover:text-slate-700"
                      >
                        {showConfirmPassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create account"}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      <Modal open={otpModalOpen} onClose={() => setOtpModalOpen(false)}>
        <div className="space-y-5">
          <h3 className="text-center text-xl font-bold">Verify OTP</h3>

          <p className="text-center text-sm text-slate-500">
            OTP sent to <strong>{registeredEmail}</strong>
          </p>

          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                value={digit}
                inputMode="numeric"
                maxLength={1}
                className="!size-14 text-center text-lg font-semibold"
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          <Button
            className="w-full"
            onClick={handleVerifyOtp}
            disabled={otpLoading}
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <div className="text-center text-sm text-slate-500">
            {timer > 0 ? (
              <>Resend OTP in {timer}s</>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="font-medium underline"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
