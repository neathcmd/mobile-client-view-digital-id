"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Saved!");
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="p-6 rounded-xl w-full max-w-md shadow-md bg-white">
        <h2 className="text-center text-xl font-semibold mb-6 text-gray-950">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="border hover:border-3 border-gray-600 h-10 w-full px-2"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border hover:border-3 border-gray-600 h-10 w-full px-2"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border hover:border-3 border-gray-600 h-10 w-full px-2"
              type="email"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link href="/profile" passHref>
            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-gray-700">
              Back
            </button>
          </Link>
          <Button type="button" onClick={handleSave}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
