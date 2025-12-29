"use client";

import { useState } from "react";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import ShowToast from "@/components/Common/ShowToast";

import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";
import { MdOutlineLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { API_LOGIN } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import { useRouter } from "next/navigation";
import { onLoginSuccess } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch=useDispatch()
  const [openForgetModal, setOpenForgetModal] = useState(false);
  const [showFirst, setShowFirst] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="relative flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 py-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="w-full max-w-lg">
          <div className="text-card-foreground relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />

            <div className="p-8 sm:p-10 md:pt-12 md:pb-10 md:px-10">
              <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full blur-xl opacity-30" />
                  <span className="flex shrink-0 overflow-hidden rounded-full relative h-20 w-20 sm:h-24 sm:w-24 shadow-lg ring-4 ring-white/50">
                    <img
                      src="/images/logo.png"
                      alt="ARRC Logo"
                      className="aspect-square h-full w-full object-cover"
                    />
                  </span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Welcome to ARRC
                  </h1>
                  <p className="text-slate-500 text-sm sm:text-base font-medium">
                    Sign in to continue
                  </p>
                </div>

                <div className="w-full">
                  <div className="space-y-3">
                    <Button
                      variant="white"
                      rounded="xl"
                      className="w-full py-3 flex gap-3"
                    >
                      <FcGoogle className="h-6 w-6" /> Continue with Google
                    </Button>

                    <Button
                      variant="white"
                      rounded="xl"
                      className="w-full py-3 flex gap-3"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#F25022" d="M1 1h10v10H1z" />
                        <path fill="#00A4EF" d="M13 1h10v10H13z" />
                        <path fill="#7FBA00" d="M1 13h10v10H1z" />
                        <path fill="#FFB900" d="M13 13h10v10H13z" />
                      </svg>
                      Continue with Microsoft
                    </Button>

                    <Button
                      variant="white"
                      rounded="xl"
                      className="w-full py-3 flex gap-3"
                    >
                      <RiFacebookCircleFill
                        className="h-6 w-6"
                        color="#1877F2"
                      />
                      Continue with Facebook
                    </Button>
                  </div>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="h-[1px] w-full bg-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white/95 px-3 text-slate-400">
                        or
                      </span>
                    </div>
                  </div>
              <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await apiPost({
                        url: API_LOGIN,
                        values,
                      });
                      if (!response.success){
                       ShowToast("Invalid Credentilals", "error");
                      }else{
                        ShowToast("Login successful", "success");
                        dispatch(onLoginSuccess({ data: response.data }));
                      }


                      router.push("/dashboard");
                    } catch (error) {
                      ShowToast("Network error. Please try again.", "error");
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >

                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      isSubmitting,
                    }) => (
                      <Form className="space-y-4">
                        <Input
                          label="Email Address"
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          leftIcon={<FiMail size={20} />}
                        />
                        {errors.email && touched.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                    <div className="relative">
                          <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            leftIcon={<MdOutlineLock size={20} />}
                            
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


                        <Button
                          variant="black"
                          size="lg"
                          rounded="full"
                          className="w-full"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>

                        <div className="flex justify-between text-sm text-slate-500">
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenForgetModal(true);
                            }}
                          >
                            Forgot Password?
                          </Link>

                         <p className="text-sm text-slate-500 text-center">
                            Need an account?{" "}
                            <Link
                              href="/signup"
                              className="font-medium text-slate-900 hover:underline"
                            >
                              Sign up
                            </Link>
                          </p>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={openForgetModal} onClose={() => setOpenForgetModal(false)}>
        <div className="space-y-4">
          {showFirst ? (
            <>
              <h3 className="text-xl font-bold text-black text-slate-800">Reset Your Password</h3>
              <Input label="Email Address" type="email" leftIcon={<FiMail />} />
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-center">Enter Your OTP</h3>
              <div className="flex gap-3 justify-center">
                {[...Array(4)].map((_, i) => (
                  <Input
                    key={i}
                    maxLength={1}
                    className="!size-14 text-center"
                  />
                ))}
              </div>
            </>
          )}

          <Button className="w-full" onClick={() => setShowFirst(false)}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LoginPage;
