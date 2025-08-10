import { PricingTable } from "@clerk/nextjs";
import React from "react";

function Pricing() {
  return (
    <div className="px-10 md:px-24 lg:px-48">
      <h2 className="text-3xl gradient-title font-bold text-center mb-10">
        Select Your Subscription
      </h2>
      <PricingTable />
    </div>
  );
}

export default Pricing;
