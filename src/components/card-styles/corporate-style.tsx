import { CardItem } from "@/types/card-type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function CorporateCard({
  me,
  card,
}: {
  me: any;
  card: CardItem;
  idx: number;
}) {
  // ✅ Define QR link safely
  const qrLink = card.qr_link || `https://yourdomain.com/cards/${card.id}`;

  return (
    <div
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
        {me.full_name || "Soryalyza"}
      </h2>
      <p className="text-center opacity-80 mb-4">
        <Mail className="inline mr-1" />
        {me.email || "lyza@example.com"}
      </p>

      {/* Card Info */}
      <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-6 space-y-4 text-gray-700">
        <div className="text-center">
          <h2 className="text-xl font-bold text-purple-700">
            {card.job || "Software Developer"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {card.bio || "I love building beautiful, functional UIs."}
          </p>
        </div>

        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">📍 Address:</span>
            <span>{card.address || "PSE School"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-purple-600">👤 Gender:</span>
            <span>{card.gender || "Female"}</span>
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

      {/* Action Buttons - DO NOT TOUCH */}
      <div className="space-y-3 mt-5">
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

        <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-3 font-semibold flex items-center justify-center gap-3 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm.2 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.3zm4.25 3a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm3.1-4.1a1.05 1.05 0 11-2.1 0 1.05 1.05 0 012.1 0z" />
          </svg>
          Instagram
        </button>
      </div>
    </div>
  );
}
