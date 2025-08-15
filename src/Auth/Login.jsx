import React from 'react';
import img from "../assets/manager.png";
import { useFormik } from "formik";
import axoissecure from '../Hooks/Axoisscure';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTokenFromLocalStorage, setTokenToLocalStorage } from './token';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const token = getTokenFromLocalStorage();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const response = await axoissecure.post("/auth/login", {
          username: values.username,
          password: values.password,
        });

        console.log(response)

        if (response.status === 201) {
          const { access_token, role } = response.data;

          // Set the token in localStorage
          setTokenToLocalStorage(access_token);
          console.log("Login successful:", values);
          toast.success("Login successfully!");
          {
            ["Super Admin", "Manager"].some(roles => role?.includes(roles)) ?
              navigate(location?.state ? location.state : "/") :
              navigate(location?.state ? location.state : "/public")
          }

          resetForm();
        }
      } catch (error) {
        toast.error("Incorrect Password or Email");
        console.error("Error logging in:", error);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="relative hidden lg:block bg-gradient-primary p-8 text-white">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">M</span>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">
                    Welcome to <span className="text-accent-300">MANAGER</span>
                  </h1>
                  <p className="text-lg text-white text-opacity-90 mb-8">
                    Your comprehensive hostel management solution
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span>Manage meals and reports</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span>Track finances and expenses</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-sm">✓</span>
                      </div>
                      <span>Monitor room allocations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-8 lg:p-12">
              <div className="max-w-md mx-auto">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">M</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gradient">
                    MANAGER
                  </h1>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-secondary-900 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-secondary-600">
                    Sign in to your account to continue
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      Email Address
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        id="username"
                        name="username"
                        type="email"
                        className="input pl-12"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                    </div>
                    {formik.touched.username && formik.errors.username && (
                      <p className="form-error">{formik.errors.username}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input pl-12 pr-12"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="form-error">{formik.errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-secondary-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3 text-lg"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="loading-spinner w-5 h-5"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-secondary-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-secondary-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="btn btn-secondary">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button className="btn btn-secondary">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    Twitter
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="mt-8 text-center text-secondary-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;