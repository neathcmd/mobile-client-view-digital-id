import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { User, CardItem } from "@/types/card-type";

export default function CorporateCard({
  me,
  card,
  idx,
}: {
  me: any;
  card: CardItem;
  idx: number;
}) {
  // Use qr_url from API, fallback to a default if null
  const qrLink = card.qr_url || "https://yourwebsite.com";

  // Correct nationality and social link platform
  const correctedNationality =
    card.nationality === "japanense" ? "Japanese" : card.nationality;
  const socialLinks = card.socialLinks.map((link) => ({
    ...link,
    platform: link.platform === "facebooks" ? "facebook" : link.platform,
    url: link.url === "facebook.coms" ? "https://facebook.com" : link.url,
  }));

  return (
    <div
      key={idx}
      className="p-6 bg-gradient-to-br from-indigo-600 via-teal-500 to-blue-500 rounded-3xl text-white shadow-xl max-w-md mx-auto mt-5"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <Avatar className="w-24 h-24 border-4 border-white shadow-md rounded-full bg-gray-100">
          <AvatarImage
            src={
              me.avatar || "https://avatars.githubusercontent.com/u/6880091?v=4"
            }
            alt={me.full_name || "User Avatar"}
            className="rounded-full object-cover"
          />
          <AvatarFallback className="text-2xl font-semibold text-gray-700">
            {me.full_name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name and Email */}
      <h2 className="text-2xl font-bold text-center mb-1">
        {me.full_name || "Unknown User"}
      </h2>
      <p className="text-center opacity-80 mb-4">
        <Mail className="inline mr-1" />
        {me.email || "no-email@example.com"}
      </p>

      {/* Card Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6 space-y-4 text-gray-700">
        <div className="text-center">
          <h2 className="text-xl font-bold text-purple-700">
            {card.job || "Unknown Position"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {card.bio || "No bio available."}
          </p>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">📍 Address:</span>
            <span>{card.address || "Unknown Address"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">👤 Gender:</span>
            <span>{card.gender || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">🌍 Nationality:</span>
            <span>{correctedNationality || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">📞 Phone:</span>
            <span>{card.phone || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">🔗 Website:</span>
            <a
              href={qrLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {qrLink.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>

        {/* QR Code Section */}
        {qrLink && (
          <div className="mt-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-2">Scan to view profile</p>
            <a
              href={qrLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <QRCodeCanvas value={qrLink} size={100} />
            </a>
          </div>
        )}
      </div>

      {/* Social Links */}
      <div className="space-y-3 mt-5">
        {socialLinks
          .filter((link) => !link.is_deleted)
          .map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold flex items-center justify-center gap-3 transition"
            >
              <img
                src={link.icon}
                alt={`${link.platform} icon`}
                className="h-5 w-5"
              />
              {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
            </a>
          ))}

        {/* Keep original action buttons if needed */}
        <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold flex items-center justify-center gap-3 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h2l3.6 7.59a1 1 0 00.9.41h7.14a1 1 0 001-.92V5H3z"
            />
          </svg>
          Call me
        </button>

        <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold flex items-center justify-center gap-3 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12h.01M12 12h.01M8 12h.01M21 16.5v-9A2.5 2.5 0 0018.5 5h-13A2.5 2.5 0 003 7.5v9A2.5 2.5 0 005.5 19h13a2.5 2.5 0 002.5-2.5z"
            />
          </svg>
          Email
        </button>
      </div>
    </div>
  );
}
