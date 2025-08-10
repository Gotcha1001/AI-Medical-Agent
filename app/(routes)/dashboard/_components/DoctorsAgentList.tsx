import DoctorAgentCard from "@/app/_components/DoctorAgentCard";
import FeatureMotionWrapper from "@/app/components/FeatureMotionWrapper";
import { AIDoctorAgents } from "@/app/shared/list";
import React from "react";

function DoctorsAgentList() {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-3xl gradient-title">
        AI Specialist Doctors
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-8 shadow-md mt-5 ">
        {AIDoctorAgents.map((doctor, index) => (
          <div key={index}>
            <FeatureMotionWrapper index={index}>
              <DoctorAgentCard doctorAgent={doctor} />
            </FeatureMotionWrapper>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsAgentList;
