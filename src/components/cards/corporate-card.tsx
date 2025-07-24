import { CardItem, IUser } from "@/types/user-type";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Badge,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const CorporateCard = ({
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
    <div>
      <div className="max-w-sm mx-auto space-y-4">
        <div key={idx}>
          <Card className="bg-white border border-gray-200 shadow-lg">
            <CardContent className="p-0 relative">
              {/* Corporate Header with Navy Blue Accent */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full translate-y-12 -translate-x-12"></div>

                <Link href={`/update-card/${card.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absoluimprove te top-4 right-4 border-white  text-white"
                  >
                    Edit
                  </Button>
                </Link>
                <div className="relative z-10 text-center">
                  <div className="mb-4">
                    <Avatar className="w-20 h-20 mx-auto border-3 border-white shadow-md">
                      <AvatarImage
                        src={me?.data?.avatar}
                        alt={me?.data?.user_name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-lg font-semibold bg-blue-600 text-white">
                        {me?.data?.user_name}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h1 className="text-xl font-bold text-white mb-1 tracking-wide">
                    {me?.data.full_name}
                  </h1>
                  <div className="bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium inline-block">
                    {card.job}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Company Information */}
                <div className="text-center mb-6 pb-4 border-b border-gray-100">
                  <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-gray-700 font-semibold text-sm">
                      {card.company}
                    </span>
                  </div>
                </div>

                {/* Professional Bio */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                    <p className="text-gray-700 text-sm leading-relaxed text-center italic">
                      {card.bio}
                    </p>
                  </div>
                </div>

                {/* Contact Information - Professional Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Direct Line
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {card.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Email
                      </p>
                      <p className="text-sm text-gray-900 font-medium truncate">
                        {me?.data?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Website
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {card.web_site}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Office
                      </p>
                      <p className="text-sm text-gray-900 font-medium">
                        {card.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
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
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Add to Contacts
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 font-medium bg-white py-2"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 font-medium bg-white py-2"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CorporateCard;
