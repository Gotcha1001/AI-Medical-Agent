"use client";
import { UserProfile } from "@clerk/clerk-react";
import { User } from "@clerk/nextjs/server";
import React from "react";

function Profile() {
  return (
    <div className="px-10 md:px-24 lg:px-48 ">
      <h2 className="text-3xl gradient-title font-bold text-center mb-10">
        Profile
      </h2>
      <div className="flex items-center justify-center">
        <UserProfile />
      </div>
    </div>
  );
}

export default Profile;
