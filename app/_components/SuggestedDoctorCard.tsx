import React from "react";
import { doctorAgent } from "./DoctorAgentCard";
import Image from "next/image";

type props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: any;
  selectedDoctor: doctorAgent;
};

function SuggestedDoctorCard({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: props) {
  return (
    <div
      className={`flex flex-col items-center justify-between border p-3 rounded-lg shadow-lg hover:border-green-500 cursor-pointer mt-3 ${
        selectedDoctor?.id === doctorAgent?.id
          ? "border-green-500"
          : "border-gray-300"
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      <Image
        src={doctorAgent.image}
        alt={doctorAgent.specialist}
        height={70}
        width={70}
        className="rounded-2xl w-[50px] h-[60px] object-cover"
      />
      <h2 className="font-bold">{doctorAgent.specialist}</h2>
      <p className="text-xs line-clamp-2">{doctorAgent.description}</p>
    </div>
  );
}

export default SuggestedDoctorCard;
