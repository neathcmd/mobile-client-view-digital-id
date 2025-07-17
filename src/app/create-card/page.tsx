"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CardStyle1 from "@/components/card-style/cardStyle1";
import CardStyle2 from "@/components/card-style/cardStyle2";
import CardStyle3 from "@/components/card-style/cardStyle3";

export default function CreateCardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    avatar: "",
    cover: "",
    phone: "",
    email: "",
    position: "",
    company: "",
    address: "",
    socialLink: "",
    style: 1,
    gender: "",
    dob: "",
    nationality: "",
    card_type: "",
  });

  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Idkwhois_zeru");

    const res = await fetch("https://api.cloudinary.com/v1_1/dpm18kym2/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url || null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.username || !formData.phone || !formData.gender || !formData.card_type) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/card/create-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.status === 201) {
        setSuccessMessage(result.message);
        setErrorMessage("");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        setErrorMessage(result.message || "Something went wrong.");
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("Failed to create card.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreview = () => {
    switch (formData.card_type) {
      case "Minimal": return <CardStyle1 name={""} {...formData} />;
      case "Modern": return <CardStyle2 {...formData} />;
      case "Classic": return <CardStyle3 name={""} {...formData} />;
      default: return <p className="text-sm text-gray-500">Select a card style to preview</p>;
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return (
          <>
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="input animate-input" />
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input animate-input" />
            <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} className="input animate-input" />
            <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="input animate-input" />
            <input name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} className="input animate-input" />
          </>
        );
      case "contact":
        return (
          <>
            <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input animate-input" />
            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input animate-input" />
            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input animate-input" />
            <input name="socialLink" placeholder="Social Link" value={formData.socialLink} onChange={handleChange} className="input animate-input" />
          </>
        );
      case "appearance":
        return (
          <>
            <input name="position" placeholder="Position" value={formData.position} onChange={handleChange} className="input animate-input" />
            <input name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="input animate-input" />

            {/* Uploads */}
            <div className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <label className="block font-medium mb-2">Avatar Image</label>
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadToCloudinary(file);
                  if (url) setFormData((prev) => ({ ...prev, avatar: url }));
                }} className="block w-full animate-input" />
                {formData.avatar && <img src={formData.avatar} className="mt-3 w-24 h-24 object-cover rounded-full" />}
              </div>

              {/* Cover Upload */}
              <div>
                <label className="block font-medium mb-2">Cover Image</label>
                <input type="file" accept="image/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadToCloudinary(file);
                  if (url) setFormData((prev) => ({ ...prev, cover: url }));
                }} className="block w-full animate-input" />
                {formData.cover && <img src={formData.cover} className="mt-3 w-full h-32 object-cover rounded-lg" />}
              </div>

              {/* Card Style Picker */}
              <div>
                <p className="mb-2 font-medium">Select Card Style:</p>
                <div className="flex flex-wrap gap-4">
                  {['Minimal', 'Modern', 'Classic'].map((style) => (
                    <div
                      key={style}
                      className={`border rounded p-2 cursor-pointer transition-all duration-150 ${
                        formData.card_type === style ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, card_type: style })}
                    >
                      <p className="text-center text-sm mt-1">{style}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .animate-input:focus,
        .animate-input:not(:placeholder-shown) {
          border-color: #3b82f6;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
          transform: scale(1.02);
        }
      `}</style>
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Create Your Digital Card</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow min-h-[700px]">
          {/* Tabs */}
          <div className="flex justify-between mb-6">
            {['personal', 'contact', 'appearance'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg border-b-2 ${
                  activeTab === tab ? "border-blue-600 text-blue-600 font-medium" : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="space-y-6">{renderTab()}</div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {isSubmitting ? "Creating..." : "Create Card"}
          </button>

          {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 text-center mt-4">{errorMessage}</p>}
        </form>

        {/* Preview Section */}
        <div className="bg-white p-6 rounded-xl shadow max-h-[700px] overflow-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Live Preview</h3>
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}