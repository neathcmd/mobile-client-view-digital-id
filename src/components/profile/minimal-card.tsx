import { CardItem, User } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Globe, Phone, Mail, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MinimalCardProps {
  card: CardItem;
  me: any;
  idx?: number;
  className?: string;
}

export default function MinimalCard({
  card,
  me,
  className = "",
}: MinimalCardProps) {
  const correctedNationality =
    card.nationality === "japanense" ? "Japanese" : card.nationality;

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatPhone = (phone: string): string => {
    // Basic phone formatting - can be enhanced based on requirements
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  const cardFields = [
    {
      icon: <Mail className="w-4 h-4" />,
      label: "Email",
      value: me?.data.email,
      fallback: "Not provided",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: "Address",
      value: card?.address,
      fallback: "Not provided",
    },
    {
      icon: <Globe className="w-4 h-4" />,
      label: "Nationality",
      value: correctedNationality,
      fallback: "Not specified",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: "Phone",
      value: card?.phone ? formatPhone(card.phone) : null,
      fallback: "Not provided",
    },
    {
      icon: <Cake className="w-4 h-4" />,
      label: "Date of Birth",
      value: card?.dob ? formatPhone(card.dob) : null,
      fallback: "Not provided",
    },
  ];

  // example handler
  const saveContactHandler = () => {
    console.log("===contact saved===");
  };

  return (
    <div
      className={`relative w-full p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl text-white shadow-2xl max-w-sm mx-auto transition-all duration-300  hover:shadow-3xl ${className}`}
      role="article"
      aria-label={`Contact card for ${me?.data.full_name || "Unknown User"}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 blur-xl" />

      {/* Avatar section */}
      <div className="relative flex justify-center mb-8 z-10">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Avatar className="relative w-32 h-32 border-4 border-white/30 shadow-2xl backdrop-blur-md bg-gradient-to-br from-white/20 to-white/5 transition-transform duration-300">
            <AvatarImage
              src={
                me?.data.avatar ||
                "https://avatars.githubusercontent.com/u/6880091?v=4"
              }
              alt={`${me?.data.full_name || "User"}'s avatar`}
              className="object-cover rounded-full"
            />
            <AvatarFallback className="text-3xl font-bold text-white bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-md">
              {me?.data.full_name ? getInitials(me?.data.full_name) : "U"}
            </AvatarFallback>
          </Avatar>

          {/* Enhanced online indicator */}
          <div className="absolute -bottom-2 -right-2">
            <div className="relative">
              <div className="w-8 h-8 bg-emerald-400 border-4 border-white rounded-full shadow-xl animate-pulse"></div>
              <div className="absolute inset-0 w-8 h-8 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Name and title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          {me?.data.full_name || "Unknown User"}
        </h2>
        {card?.job && (
          <p className="text-white/90 font-medium text-lg mb-2">{card.job}</p>
        )}
        {card?.bio && (
          <p className="text-white/70 text-sm leading-relaxed">{card.bio}</p>
        )}
      </div>

      {/* Contact information */}
      <div className="space-y-3">
        {cardFields.map((field, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-200 hover:bg-white/15"
          >
            <div className="flex-shrink-0 text-white/80">{field.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">
                {field.label}
              </p>
              <p className="text-white text-sm font-medium truncate">
                {field.value || field.fallback}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* QR code placeholder or additional actions */}
      <div className="relative mt-8 pt-6 border-t border-white/30 z-10">
        <div className="flex justify-center">
          <Button onClick={saveContactHandler} variant="outline">
            Share contact
          </Button>
        </div>
      </div>
    </div>
  );
}
