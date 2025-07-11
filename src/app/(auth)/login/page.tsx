// pages/login.

"use client";
import { useState } from "react";
import Image from "next/image";
import Google from "../../../../public/google.png";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-2">
          Log in
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Fresh Food Delivered.
        </p>

        <form className="space-y-4">
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-green-600" />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="text-gray-600 w-full pl-10 pr-4 py-2 border rounded-full bg-green-50 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-green-600" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="text-gray-600 w-full pl-10 pr-10 py-2 border rounded-full bg-green-50 border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-green-600 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">Remember me</span>
            <div className="ml-auto text-xs text-green-700 cursor-pointer">
              Forgot your password?
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-full hover:bg-green-800 transition"
          >
            Log in
          </button>
        </form>

        <div className="text-center my-4 text-gray-500">OR</div>
        <button className="w-full border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2 hover:bg-green-50 transition">
          <Image src={Google} alt="Google" width={20} height={20} />
          <span className="text-sm text-gray-600">Log in with Google</span>
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/auth/register"
            className="text-green-700 font-medium hover:underline"
          >
            Register here!
          </a>
        </div>
      </div>
    </div>
  );
}
