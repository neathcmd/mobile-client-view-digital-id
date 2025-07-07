"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Document", href: "/doc" },
  { label: "Feature", href: "/feature" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
            >
              Digital ID Card
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center space-x-6"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Placeholder (if needed) */}
          <div className="md:hidden">
            {/* Mobile menu button / hamburger */}
            {/* Replace with logic or drawer if needed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
