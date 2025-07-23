"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { cardRequest } from "@/lib/api/create-card-api";
import { CreateCardPayload } from "@/types/card-type";

export default function CreateCard() {
  const { CREATE_CARD } = cardRequest();

  const [formData, setFormData] = useState({
    cardType: "Minimal",
    fullName: "",
    email: "",
    phone: "",
    gender: "male",
    dob: "",
    nationality: "",
    address: "",
    socialPlatform: "",
    socialUrl: "",
  });

  const { mutate, status } = useMutation({
    mutationFn: (data: CreateCardPayload) => CREATE_CARD(data),
    onSuccess: () => {
      alert("Card created!");
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const payload: CreateCardPayload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      nationality: formData.nationality,
      address: formData.address,
      card_type: formData.cardType,
      social: [
        {
          platform: formData.socialPlatform,
          icon: "https://cdns-icons-png.flaticon.com/512/15047/15047435.png",
          url: formData.socialUrl,
        },
      ],
    };

    mutate(payload);
  };

  const Field = ({
    label,
    name,
    type = "text",
    placeholder = "",
  }: {
    label: string;
    name: keyof typeof formData;
    type?: string;
    placeholder?: string;
  }) => (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="border px-4 py-2 rounded w-full"
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Create Digital Card</h1>

      <div>
        <label className="block mb-1 font-medium">Choose Card Style</label>
        <select
          name="cardType"
          value={formData.cardType}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        >
          <option value="Minimal">Minimal</option>
          <option value="Corporate">Corporate</option>
          <option value="Modern">Modern</option>
        </select>
      </div>

      <Field label="Full Name" name="fullName" />
      <Field label="Email" name="email" type="email" />
      <Field label="Phone" name="phone" type="tel" />

      <div>
        <label className="block mb-1 font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border px-4 py-2 rounded w-full"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <Field label="Date of Birth" name="dob" type="date" />
      <Field label="Nationality" name="nationality" />
      <Field label="Address" name="address" />
      <Field
        label="Social Platform"
        name="socialPlatform"
        placeholder="facebook, twitter, etc."
      />
      <Field
        label="Social URL"
        name="socialUrl"
        type="url"
        placeholder="https://example.com/profile"
      />

      <Button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white"
        disabled={status === "pending"}
      >
        {status === "pending" ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
