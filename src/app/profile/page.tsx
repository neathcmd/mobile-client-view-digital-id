"use client";

import { memo, useMemo } from "react";
import ProfileLayout from "@/layouts/ProfileLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const OWNER = {
  name: "Kamado Tanjiro",
  position: "Software Developer",
  username: "@kamado",
  email: "kamado@example.com",
};

const Profile = () => {
  const infoItems = useMemo(
    () => [
      { label: "Full Name", value: OWNER.name },
      { label: "Username", value: OWNER.username },
      { label: "Email", value: OWNER.email },
    ],
    []
  );

  const handleLogout = () => {
    console.log("do something");
  };

  return (
    <ProfileLayout>
      {/* Profile Header */}
      <header className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logout Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleLogout} variant="outline">
              {" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </Button>
          </div>

          <div className="flex justify-center py-12">
            <div className="text-center space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full rounded-full bg-white shadow-2xl flex items-center justify-center ring-4 ring-white/30">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    {/* <svg
                      className="w-10 h-10 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 
                      1.79-4 4 1.79 4 4 4zm0 2c-2.67 
                      0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg> */}
                     <div className="reletive px-6 pb-6">
                      <div className="flex justify-center mt-10 mb-4">
                        <div className="reletive">
                          <Avatar className="w-30 h-30">
                            <AvatarImage
                              src="https://github.com/evilrabbit.png"
                              alt="@evilrabbit"
                            />
                            <AvatarFallback>ER</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Photo */}
                <button
                  type="button"
                  className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-colors focus:outline-none"
                  aria-label="Upload profile photo"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 
                      001.664-.89l.812-1.22A2 2 0 
                      0110.07 4h3.86a2 2 0 
                      011.664.89l.812 1.22A2 2 0 
                      0018.07 7H19a2 2 0 012 2v9a2 2 
                      0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">
                {OWNER.name}
              </h1>
              <p className="text-blue-100 text-sm">{OWNER.position}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <main className="space-y-10">
            {/* Profile Info */}
            <section
              aria-labelledby="profile-info-heading"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  id="profile-info-heading"
                  className="text-xl font-semibold text-gray-900"
                >
                  Profile Information
                </h2>
                <Link href="/profile/edit-card">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>

              <ul className="space-y-4">
                {infoItems.map(({ label, value }) => (
                  <li
                    key={label}
                    className="flex justify-between border-b border-gray-100 pb-3 last:border-none"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      {label}
                    </span>
                    <span className="text-sm text-gray-900">{value}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Create Card Section */}
            <section
              aria-labelledby="create-card-heading"
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h2
                  id="create-card-heading"
                  className="text-xl font-semibold text-gray-900 mb-2"
                >
                  Create Your Digital ID Card
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Generate a secure digital ID card with your verified
                  information. Your card will be ready for download and sharing.
                </p>

                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-base font-medium transition-colors shadow-md hover:shadow-lg focus:outline-none"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 
                        0 002 2h14a2 2 0 002-2V8a2 2 
                        0 00-2-2h-5m-4 0V4a2 2 0 114 
                        0v2m-4 0a2 2 0 104 0m-4 0V4a2 
                        2 0 014 0v2"
                      />
                    </svg>
                    Create Card
                  </div>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default memo(Profile);
