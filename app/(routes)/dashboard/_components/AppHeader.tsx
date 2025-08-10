"use client";
import FeatureMotionWrapper from "@/app/components/FeatureMotionWrapper";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const menuOptions = [
  {
    id: 1,
    name: "Home",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "History",
    path: "/dashboard/history",
  },
  {
    id: 3,
    name: "Profile",
    path: "/dashboard/profile",
  },
  {
    id: 4,
    name: "Pricing",
    path: "/dashboard/pricing",
  },
];

function AppHeader() {
  const router = useRouter();
  return (
    <div className="relative flex items-center justify-between p-4 shadow-md px-10 md:px-20 lg:px-40 dynamic-bg-container">
      {/* Background pseudo-element */}
      <div className="dynamic-bg" />
      <Image
        src="/medical.jpg"
        alt="Logo"
        height={200}
        width={200}
        className="rounded-2xl z-10 cursor-pointer" /* Ensure logo is above background */
        onClick={() => router.push("/")}
      />
      <div className="hidden md:flex gap-12 items-center z-10">
        {menuOptions.map((option, index) => (
          <div key={index}>
            <Link href={option.path}>
              <h2 className="hover:font-bold cursor-pointer transition-all text-white">
                {option.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <UserButton />
    </div>
  );
}

export default AppHeader;
