"use client";
import React from "react";

export default function TestLogin() {
  const handleLogin = async () => {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // 🔐 super important
      body: JSON.stringify({
        user_name: "seusa",
        password: "seusa091022",
      }),
    });

    const data = await res.json();
    console.log("Login result:", data);
  };

  return (
    <div className="p-10">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Dev Login
      </button>
    </div>
  );
}
