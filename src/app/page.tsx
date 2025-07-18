"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/get-me-api";
import { User, Mail, Pin } from "lucide-react";
import { CardItem } from "@/types/card-type";

// Import your card components
import CorporateCard from "@/components/profile/corporate-card";
import ModernCard from "@/components/profile/modern-card";
import MinimalCard from "@/components/profile/minimal-card";
import { Card } from "@/components/ui/card";
import { number } from "zod";
import Node from "lucide-react";

export default function ProfilePage() {
  const { PROFILE } = userRequest();

  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  if (isLoading) return "Loading...";

  if (!me?.data) return "No profile data found";
  console.log("Cards:", me.data.idCard);
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="overflow-hidden shadow-lg border-8 rounded-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl" />
          <div className="relative px-6 py-6">
            <div className="flex justify-center -mt-14 mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src="https://avatars.githubusercontent.com/u/6880091?v=4"
                  alt="User"
                />
                <AvatarFallback>{me.data.full_name}</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold">{me.data.full_name}</h1>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="h-4 w-4" />@{me.data.user_name}
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                {me.data.email}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition">
                  <User className="inline mr-1" />
                  Edit Profile
                </button>
                <button className="bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition">
                  <Mail className="inline mr-1" />
                  Create Card
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cards List */}
        <div>
          <div>
            <CorporateCard me={me} card={Card} idx={number} />
          </div>
          {/* <div>
            <ModernCard me={me} card={Card} idx={number} />
          </div>
          <div>
            <MinimalCard me={me} card={Card} idx={number} />
          </div> */}
        </div>
      </div>
}
