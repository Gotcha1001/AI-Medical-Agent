"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });

  const onStartConsultation = async () => {
    setLoading(true);
    // Save All Info to the Data base
    const result = await axios.post("/api/session-chat", {
      notes: "New Query",
      selectedDoctor: doctorAgent,
    });
    console.log(result.data);

    if (result.data?.sessionId) {
      console.log("Session created with ID:", result.data.sessionId);

      //Route new conversation screen
      router.push("/dashboard/medical-agent/" + result.data.sessionId);
    }
    setLoading(false);
  };

  return (
    <div className="relative">
      {doctorAgent?.subscriptionRequired && (
        <Badge className="absolute m-2 right-0">Premium</Badge>
      )}

      <Image
        src={doctorAgent.image}
        alt="doctor"
        height={300}
        width={200}
        className="rounded-2xl h-[250px] w-full object-cover object-[center_top]"
      />
      <h2 className="font-bold text-lg mt-1">{doctorAgent.specialist}</h2>
      <p className="line-clamp-2 mt-1 text-sm text-gray-500">
        {doctorAgent.description}
      </p>
      <Button
        onClick={onStartConsultation}
        disabled={!paidUser && doctorAgent.subscriptionRequired}
        className="mt-3 w-full"
        variant={"work"}
      >
        Start Consultation
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <IconArrowRight />
        )}
      </Button>
    </div>
  );
}

export default DoctorAgentCard;
