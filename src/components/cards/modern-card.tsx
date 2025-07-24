import { Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardItem, IUser } from "@/types/user-type";
import Link from "next/link";

const ModernCard = ({
  me,
  card,
  idx,
}: {
  // me: IUser;
  me: any;
  card: CardItem;
  idx: number;
}) => {
  return (
    <div className="mt-10 w-full max-w-md mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        <div key={idx}>
          {/* Outer glow container */}
          <div className="relative group">
            {/* Animated background gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/90 to-gray-900/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                {/* Floating geometric shapes */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-12 h-12 bg-gradient-to-br from-indigo-400/20 to-cyan-500/20 rounded-full blur-lg animate-bounce"></div>

                {/* Header Section with floating effect */}
                <div className="relative p-8 pb-6">
                  {/* Mesh gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-pink-500/20 to-indigo-600/30 opacity-80"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-400/20 via-transparent to-indigo-600/20"></div>

                  <div className="relative z-10">
                    <Link href={`/update-card/${card.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-4 right-4 border-white text-white hover:bg-white/10 bg-white/20"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={me?.data?.avatar}
                        alt={me?.data?.user_name}
                      />
                      <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {me?.data?.user_name}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold text-white mb-1">
                      {me?.data?.full_name}
                    </h1>
                    <p className="text-cyan-100 font-medium">{card.job}</p>
                  </div>
                </div>

                {/* Card Content with glassmorphism */}
                <div className="p-8 pt-4 space-y-6 bg-white/5 backdrop-blur-sm">
                  {/* Company badge */}
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-white/20 backdrop-blur-sm">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white/90 font-semibold">
                      {card.company || "N/A"}
                    </span>
                  </div>

                  {/* Bio with modern typography */}
                  <p className="text-gray-300 leading-relaxed font-light text-sm bg-white/5 p-4 rounded-2xl border border-white/10">
                    {card.bio || "No bio provided."}
                  </p>

                  {/* Contact Grid with hover effects */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-pink-400 group-hover:text-pink-300 transition-colors" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                          Phone
                        </span>
                      </div>
                      <p className="text-sm text-white font-mono tracking-wide">
                        {card.phone}
                      </p>
                    </div>

                    <div className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                          Email
                        </span>
                      </div>
                      <p className="text-sm text-white break-all">
                        {me?.data?.email}
                      </p>
                    </div>

                    <div className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                          Website
                        </span>
                      </div>
                      <p className="text-sm text-white">{card.web_site}</p>
                    </div>

                    <div className="group p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                        <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                          Location
                        </span>
                      </div>
                      <p className="text-sm text-white">{card.address}</p>
                    </div>
                  </div>

                  {/* Buttons with modern styling */}
                  <div className="space-y-4 pt-6">
                    <Button
                      onClick={async () => {
                        const toBase64 = async (url: string) => {
                          const response = await fetch(url);
                          const blob = await response.blob();
                          return new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              resolve(
                                reader.result?.toString().split(",")[1] || ""
                              );
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                          });
                        };

                        const avatarBase64 = me?.data.avatar
                          ? await toBase64(me?.data.avatar)
                          : "";

                        const vcard = [
                          "BEGIN:VCARD",
                          "VERSION:3.0",
                          `FN:${me?.data.full_name}`,
                          `N:${me?.data.full_name};;;;`,
                          `ORG:${card.company}`,
                          `TITLE:${card.job}`,
                          `TEL;TYPE=WORK,VOICE:${card.phone}`,
                          `EMAIL;TYPE=PREF,INTERNET:${me?.data.email}`,
                          avatarBase64
                            ? `PHOTO;ENCODING=b;TYPE=JPEG:${avatarBase64}`
                            : "",
                          `URL:${card.web_site}`,
                          `ADR;TYPE=WORK:;;${card.address};;;;`,
                          `NOTE:${card.bio}`,
                          "END:VCARD",
                        ]
                          .filter(Boolean)
                          .join("\r\n");

                        const blob = new Blob([vcard], {
                          type: "text/vcard;charset=utf-8",
                        });

                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `${(
                          me?.data.full_name ?? "Unnamed_User"
                        ).replace(" ", "_")}_${idx + 1}.vcf`;

                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      }}
                      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <Download className="w-5 h-5 mr-3" />
                      Save Contact
                    </Button>

                    {/* Social Links */}
                    {card.socialLinks.map((res, idx: number) => {
                      return (
                        <div key={idx}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white/90 hover:bg-white/20 bg-white/10 backdrop-blur-sm w-full rounded-2xl py-6 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <Avatar className="w-8 h-8 mr-3 relative z-10">
                                <AvatarImage
                                  src={res.icon}
                                  alt={res.platform}
                                />
                                <AvatarFallback className="text-sm font-bold bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                                  {res.platform}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            {res.platform}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCard;
