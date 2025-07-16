"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/user-api";
import { User, Mail, Divide } from "lucide-react";
import { CardItem } from "@/types/card-type";
import Corporatecard from "@/components/profile/corporate-card";
export default function Home() {
  const { PROFILE } = userRequest();

  const { data: me, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => PROFILE(),
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div className="min-h-screen">
      <div className="p-4 items-center justify-center">
        {/* Header */}
        <div className="w-full max-w-md mx-auto overflow-hidden shadow-lg border-8 rounded-2xl">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-pink-500 relative rounded-t-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          <div className="relative px-6 py-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-14 mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>{me?.data?.full_name}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <div>
                <h1 className="text-2xl font-semibold">
                  {me?.data?.full_name}
                </h1>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <User className="h-4 w-4" />@{me?.data?.user_name}
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />@{me?.data?.email}
              </div>
            </div>
          </div>
        </div>
        {/* ID Card */}
        <div className="w-full max-w-md mx-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            {me?.data?.idCard.map((Card: CardItem, idx: number) => (
              <div key={idx}>
                {Card.card_type === "Corporate" && <div></div>}
                {Card.card_type === "Modern" && <div>kjhksfa</div>}
                {Card.card_type === "Minimal" && (
                  <div>
                    <Corporatecard me={me} card={Card} idx={idx} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
