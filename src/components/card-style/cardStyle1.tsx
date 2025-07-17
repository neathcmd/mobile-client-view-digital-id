"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import { Share2 } from "lucide-react";


type Props = {
  name: string;
  fullName?: string;
  username: string;
  company: string;
  avatar?: string;
  cover?: string;
  phone?: string;
  email?: string;
  address?: string;
  position?: string;
  socialLink?: string;
  userId?: string;
};

export default function CardStyle1({
  name,
  fullName,
  username,
  company,
  avatar,
  cover,
  phone,
  email,
  address,
  position,
  socialLink = "https://www.facebook.com/share/1FtrRaher9/",
  userId,
}: Props) {
  const router = useRouter();
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [shareStatus] = useState<"shared" | "link-copied" | "idle">("idle");

  // Removed duplicate handleShare function

  const handleEdit = () => {
    router.push(`/edit/${userId || username}`);
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}-qr.png`;
    a.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${fullName || name}'s Digital Card`,
          text: `Check out ${fullName || name}'s card!`,
          url: socialLink,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm w-72 border border-gray-200 transition hover:shadow-md relative">
      {/* Cover */}
      <div className="w-full h-24 bg-gray-100">
        {cover ? (
          <img src={cover} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <div className="-mt-10">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full border-4 border-white object-cover shadow"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 border-4 border-white shadow" />
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-4 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {fullName || name}
        </h2>
        <p className="text-sm text-gray-500">@{username}</p>

        {/* Edit Button */}
        <div className="px-5 pb-4">
          <button
            onClick={handleEdit}
            className="w-full mt-2 bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium py-2 px-4 rounded-lg transition"
          >
            Edit Card
          </button>
        </div>

        <div className="mt-3 space-y-1 text-sm text-gray-700 text-left">
          {position && <p><span className="font-medium">Position:</span> {position}</p>}
          {company && <p><span className="font-medium">Company:</span> {company}</p>}
          {phone && <p><span className="font-medium">Phone:</span> {phone}</p>}
          {email && <p><span className="font-medium">Email:</span> {email}</p>}
          {address && <p><span className="font-medium">Address:</span> {address}</p>}
          
        </div>
      </div>

      {/* QR Code + Actions */}
      <div className="pb-5 px-5 text-center flex flex-col items-center space-y-2">
        <p className="text-sm text-black/80">📱 Scan my QR</p>
        <QRCodeCanvas
          value={socialLink}
          size={130}
          bgColor="transparent"
          fgColor="black"
          level="H"
          includeMargin
          ref={qrRef}
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleDownloadQR}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs px-3 py-1 rounded"
          >
            ⬇️ Download QR
          </button>
        </div>
        <div className="mt-2">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4" />
            {shareStatus === "shared" ? "Shared!" : shareStatus === "link-copied" ? "Link Copied!" : "Share Card"}
          </button>
        </div>
      </div>
    </div>
  );
}
