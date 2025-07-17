"use client";
import React, { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  fullName: string;
  username: string;
  company: string;
  avatar?: string;
  cover?: string;
  phone?: string;
  email?: string;
  address?: string;
  position?: string;
  socialLink?: string;
};

const themeColors = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-emerald-400 via-cyan-400 to-blue-500",
  "from-yellow-400 via-pink-500 to-red-500",
  "from-fuchsia-600 via-violet-500 to-indigo-500",
];

function getColorTheme(username: string) {
  const hash = username
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return themeColors[hash % themeColors.length];
}

export default function CardStyle2({
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
}: Props) {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [qrColor, setQrColor] = useState("#000000");
  const themeClass = getColorTheme(username);

  useEffect(() => {
    const matchDark = window.matchMedia("(prefers-color-scheme: dark)");
    const updateQRColor = (e: MediaQueryList | MediaQueryListEvent) => {
      setQrColor(e.matches ? "#ffffff" : "#000000");
    };
    updateQRColor(matchDark);
    matchDark.addEventListener("change", updateQRColor);
    return () => matchDark.removeEventListener("change", updateQRColor);
  }, []);

  const downloadQR = () => {
    const canvas = qrRef.current;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `${username}-qr-code.png`;
      link.click();
    }
  };

  const shareQR = async () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], `${username}-qr-code.png`, {
        type: "image/png",
      });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${fullName}'s QR Code`,
            text: "Check out my QR code!",
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
      } else {
        alert("Your browser does not support sharing files.");
      }
    }, "image/png");
  };

  return (
    <div className="relative z-10 w-full max-w-sm mx-auto">
      {/* Card */}
      <div
        className="relative z-10 w-full p-4 border border-white/20 dark:border-gray-700 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md
        text-gray-800 dark:text-gray-100 rounded-2xl shadow-[0_0_40px_rgba(128,90,213,0.4)] dark:shadow-[0_0_40px_rgba(139,92,246,0.6)]"
      >
        {/* 🌁 Cover */}
        <div className="relative overflow-hidden h-28 rounded-t-2xl">
          {cover ? (
            <>
              <img src={cover} alt="Cover" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
            </>
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${themeClass} animate-gradient-x`} />
          )}

          {/* Avatar with radial glow */}
          <div className="absolute transform -translate-x-1/2 -bottom-10 left-1/2">
            <div className="relative">
              <div className="absolute inset-0 z-0 w-20 h-20 rounded-full bg-gradient-radial from-white/30 to-transparent blur-2xl" />
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="relative z-10 object-cover w-20 h-20 border-4 border-white rounded-full shadow-md dark:border-gray-900"
                />
              ) : (
                <div className="relative z-10 w-20 h-20 bg-gray-300 border-4 border-white rounded-full shadow-md dark:border-gray-900" />
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-4 text-center pt-14">
          <h2 className="text-xl font-semibold">{fullName}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{username}</p>
          {position && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{position}</p>}
          {company && <p className="text-sm text-gray-500 dark:text-gray-400">{company}</p>}
        </div>

        {/* Contact */}
        <div className="px-6 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {phone && <p>📞 {phone}</p>}
          {email && <p>📧 {email}</p>}
          {address && <p>📍 {address}</p>}
          {socialLink && (
            <p>
              🌐{" "}
              <a
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline dark:text-blue-400"
              >
                Visit Profile
              </a>
            </p>
          )}
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center px-6 mt-4">
          <p className="mb-1 text-sm text-gray-500\ dark:text-gray-300">📱 Scan my QR</p>
          <QRCodeCanvas
            value={socialLink}
            size={100}
            bgColor="transparent"
            fgColor={qrColor}
            level="H"
            includeMargin
            ref={qrRef}
          />
          <div className="flex gap-3 mt-3">
            <button
              onClick={shareQR}
              className="px-3 py-1 text-sm text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
            >
              🔗 Share
            </button>
            <button
              onClick={downloadQR}
              className="px-3 py-1 text-sm transition bg-gray-100 rounded-md dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              ⬇️ Download
            </button>
          </div>
        </div>

        {/* Edit */}
        <div className="px-6 pt-4 pb-2">
          <button
            onClick={() => alert("Edit feature coming soon!")}
            className="w-full py-2 text-sm font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            ✏️ Edit Card
          </button>
        </div>
      </div>
    </div>
  );
}
