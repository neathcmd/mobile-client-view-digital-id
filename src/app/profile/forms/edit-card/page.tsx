"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";

export default function EditProfileCard() {
  const [profileImage, setProfileImage] = useState("/default-avatar.png"); // Place default image in /public
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    description: "",
    email: "",
    phone: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    // TODO: Upload profileImage to server, along with formData
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-950">Edit Your Profile</h2>
        <hr className="font-bold text-amber-500" />

        {/* Profile Image with Upload */}
        <div className="relative w-24 h-24 mx-auto mt-4 mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border border-gray-300 shadow-sm"
          />
          <label htmlFor="profileImageInput">
            <div className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer">
              <FaCamera className="text-white text-xs" />
            </div>
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4 mt-5">
          <div>
            <label className="block text-sm font-bold text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-gray-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Description (Optional)
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-gray-500"
              placeholder="Tell about yourself, your skills, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-gray-500"
              placeholder="email@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-gray-500"
              placeholder="+855 123 456 789"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">
              Address
            </label>
            <textarea
              typeof="text"
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md text-gray-500"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => alert("Canceled")}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
