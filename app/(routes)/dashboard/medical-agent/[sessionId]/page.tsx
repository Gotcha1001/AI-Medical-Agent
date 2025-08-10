// "use client";
// import { doctorAgent } from "@/app/_components/DoctorAgentCard";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Circle, PhoneCall, PhoneOff } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Vapi from "@vapi-ai/web";

// type SessionDetail = {
//   id: number;
//   sessionId: string;
//   report: JSON;
//   notes: string;
//   selectedDoctor: doctorAgent;
//   createdOn: string;
// };

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<any>();

//   useEffect(() => {
//     sessionId && GetSessionDetails();
//   }, [sessionId]);

//   const GetSessionDetails = async () => {
//     const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//     console.log(result.data);
//     setSessionDetail(result.data);
//   };

//   const StartCall = () => {
//     //Initialize Vapi with your public API key and assistant ID
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//     setVapiInstance(vapi);
//     vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

//     vapi.on("call-start", () => {
//       console.log("Call started");
//       setCallStarted(true);
//     });
//     vapi.on("call-end", () => {
//       console.log("Call ended");
//       setCallStarted(false);
//     });
//     vapi.on("message", (message) => {
//       if (message.type === "transcript") {
//         console.log(`${message.role}: ${message.transcript}`);
//       }
//     });
//   };

//   const endCall = () => {
//     if (!vapiInstance) return;
//     console.log(vapiInstance);
//     vapiInstance.stop();
//     // Optionally remove listeners
//     vapiInstance.off("call-start");
//     vapiInstance.off("call-end");
//     vapiInstance.off("message");
//     //Reset call state
//     setCallStarted(false);
//     setVapiInstance(null);
//   };

//   return (
//     <div className="p-5 border rounded-3xl shadow-lg bg-secondary">
//       <div className="flex justify-between items-center p-2">
//         <div className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           <Circle
//             className={`h-4 w-4 text-white rounded-full ${
//               callStarted ? "bg-green-500" : "bg-red-500"
//             }`}
//           />
//           {!callStarted ? <span>Not Connected</span> : <span>Connected</span>}
//         </div>
//         <h2 className="font-bold text-xl text-gray-400">00:00</h2>
//       </div>

//       {sessionDetail && (
//         <div className="flex items-center flex-col p-2 mt-10">
//           <Image
//             src={sessionDetail?.selectedDoctor?.image}
//             alt="Doctor"
//             height={120}
//             width={120}
//             className="rounded-full h-[100px] w-[100px] object-cover object-[center_top]"
//           />
//           <h2 className="font-bold text-lg mt-1 gradient-title">
//             {sessionDetail?.selectedDoctor?.specialist}
//           </h2>
//           <p className="text-sm text-gray-500">AI Medical Voice Agent</p>
//           <div className="mt-32 text-center gradient-background2 p-2 rounded-md w-full">
//             <h2 className="text-gray-400">Assistant Message</h2>
//             <h2 className="text-lg text-white">User Message</h2>
//           </div>
//           {!callStarted ? (
//             <Button onClick={StartCall} variant={"work"} className="mt-20">
//               <PhoneCall /> Start Call
//             </Button>
//           ) : (
//             <Button onClick={endCall} variant={"destructive"}>
//               <PhoneOff /> Disconnect
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// export default MedicalVoiceAgent;

// "use client";
// import { doctorAgent } from "@/app/_components/DoctorAgentCard";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState, useRef } from "react";
// import Vapi from "@vapi-ai/web";

// type SessionDetail = {
//   id: number;
//   sessionId: string;
//   report: JSON;
//   notes: string;
//   selectedDoctor: doctorAgent;
//   createdOn: string;
// };

// type messages = {
//   role: string;
//   text: string;
// };

// function MedicalVoiceAgent() {
//   const { sessionId } = useParams();
//   const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
//   const [callStarted, setCallStarted] = useState(false);
//   const [vapiInstance, setVapiInstance] = useState<any>();
//   const [currentRoll, setCurrentRoll] = useState<string | null>();
//   const [liveTransript, setLiveTranscript] = useState<string>("");
//   const [messages, setMessages] = useState<messages[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Store listener function references
//   const listenersRef = useRef({
//     onCallStart: () => {
//       console.log("Call started");
//       setCallStarted(true);
//       setCurrentRoll("assistant");
//     },
//     onCallEnd: () => {
//       console.log("Call ended");
//       setCallStarted(false);
//       setCurrentRoll("user");
//     },
//     onMessage: (message: any) => {
//       console.log("Received message:", message);
//       if (message.type === "transcript") {
//         const { role, transcriptType, transcript } = message;
//         console.log(`${message.role}: ${message.transcript}`);
//         if (transcriptType === "partial") {
//           setLiveTranscript(transcript);
//           setCurrentRoll(role);
//         } else if (transcriptType === "final") {
//           //Final transcript received
//           setMessages((prev: any) => [
//             ...prev,
//             { role: role, text: transcript },
//           ]);
//           setLiveTranscript("");
//           setCurrentRoll(null);
//         }
//       }
//     },
//   });

//   useEffect(() => {
//     sessionId && GetSessionDetails();
//   }, [sessionId]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (vapiInstance) {
//         cleanupListeners();
//       }
//     };
//   }, [vapiInstance]);

//   const GetSessionDetails = async () => {
//     const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
//     console.log(result.data);
//     setSessionDetail(result.data);
//   };

//   const cleanupListeners = () => {
//     if (!vapiInstance) return;

//     try {
//       vapiInstance.off("call-start", listenersRef.current.onCallStart);
//       vapiInstance.off("call-end", listenersRef.current.onCallEnd);
//       vapiInstance.off("message", listenersRef.current.onMessage);
//     } catch (error) {
//       console.log("Error removing listeners:", error);
//     }
//   };

//   const StartCall = () => {
//     // Initialize Vapi with your public API key and assistant ID
//     const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
//     setVapiInstance(vapi);

//     const VapiAgentConfig = {
//       name: "AI Medical Doctor Voice Agent",
//       firstMessage:
//         "Thank you for calling AI Medical Assistants. How may I help you today? Can I have your full name and age please",
//       transcriber: {
//         provider: "assembly-ai",
//         language: "en",
//       },
//       voice: {
//         provider: "playht",
//         voiceId: sessionDetail?.selectedDoctor?.voiceId,
//       },
//       model: {
//         provider: "openai",
//         model: "gpt-4.0-mini",
//         messages: [
//           {
//             role: "system",
//             content:
//               sessionDetail?.selectedDoctor?.agentPrompt ||
//               "You are a helpful AI medical assistant.",
//           },
//         ],
//       },
//     };
//     //@ts-ignore
//     // vapi.start(VapiAgentConfig);
//     vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

//     // Add listeners using the stored references
//     vapi.on("call-start", listenersRef.current.onCallStart);
//     vapi.on("call-end", listenersRef.current.onCallEnd);
//     vapi.on("message", listenersRef.current.onMessage);
//   };

//   const endCall = async () => {
//     setLoading(true);
//     if (!vapiInstance) return;
//     console.log(vapiInstance);

//     // Stop the call
//     vapiInstance.stop();

//     // Clean up listeners
//     cleanupListeners();

//     // Reset call state
//     setCallStarted(false);
//     setVapiInstance(null);
//     const result = await GenerateReport();
//     setLoading(false);
//   };

//   const GenerateReport = async () => {
//     console.log("Messages to send:", messages);
//     const result = await axios.post("/api/medical-report", {
//       messages: messages,
//       sessionDetail: sessionDetail,
//       sessionId: sessionId,
//     });

//     console.log(result.data);
//     return result.data;
//   };

//   return (
//     <div className="p-5 border rounded-3xl shadow-lg bg-secondary">
//       <div className="flex justify-between items-center p-2">
//         <div className="p-1 px-2 border rounded-md flex gap-2 items-center">
//           <Circle
//             className={`h-4 w-4 text-white rounded-full ${
//               callStarted ? "bg-green-500" : "bg-red-500"
//             }`}
//           />
//           {!callStarted ? <span>Not Connected</span> : <span>Connected</span>}
//         </div>
//         <h2 className="font-bold text-xl text-gray-400">00:00</h2>
//       </div>

//       {sessionDetail && (
//         <div className="flex items-center flex-col p-2 mt-10">
//           <Image
//             src={sessionDetail?.selectedDoctor?.image}
//             alt="Doctor"
//             height={120}
//             width={120}
//             className="rounded-full h-[100px] w-[100px] object-cover object-[center_top]"
//           />
//           <h2 className="font-bold text-lg mt-1 gradient-title">
//             {sessionDetail?.selectedDoctor?.specialist}
//           </h2>
//           <p className="text-sm text-gray-500">AI Medical Voice Agent</p>
//           <div className="mt-12 text-center gradient-background2 p-2 rounded-md w-full overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-25 xl:px-72 mb-4">
//             {messages?.slice(-4).map((msg: messages, index) => (
//               <h2 key={index} className="text-gray-400 p-2">
//                 {msg.role} {msg.text}
//               </h2>
//             ))}
//             <h2 className="text-gray-400">Assistant Message</h2>
//             {liveTransript && liveTransript?.length > 0 && (
//               <h2 className="text-lg text-white">
//                 {currentRoll} {liveTransript}
//               </h2>
//             )}
//           </div>
//           {!callStarted ? (
//             <Button
//               disabled={loading}
//               onClick={StartCall}
//               variant={"work"}
//               className="mt-20"
//             >
//               <PhoneCall /> Start Call
//             </Button>
//           ) : (
//             <Button
//               onClick={endCall}
//               disabled={loading}
//               variant={"destructive"}
//             >
//               {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
//               Disconnect
//             </Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MedicalVoiceAgent;

"use client";
import { doctorAgent } from "@/app/_components/DoctorAgentCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  sessionId: string;
  report: JSON;
  notes: string;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Store listener function references
  const listenersRef = useRef({
    onCallStart: () => {
      console.log("Call started");
      setCallStarted(true);
      setCurrentRoll("assistant");
    },
    onCallEnd: () => {
      console.log("Call ended");
      setCallStarted(false);
      setCurrentRoll("user");
    },
    onMessage: (message: any) => {
      console.log("Received message:", message);
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === "final") {
          //Final transcript received
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    },
  });

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (vapiInstance) {
        cleanupListeners();
      }
    };
  }, [vapiInstance]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log(result.data);
    setSessionDetail(result.data);
  };

  const cleanupListeners = () => {
    if (!vapiInstance) return;

    try {
      vapiInstance.off("call-start", listenersRef.current.onCallStart);
      vapiInstance.off("call-end", listenersRef.current.onCallEnd);
      vapiInstance.off("message", listenersRef.current.onMessage);
    } catch (error) {
      console.log("Error removing listeners:", error);
    }
  };

  const StartCall = () => {
    // Initialize Vapi with your public API key and assistant ID
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Thank you for calling AI Medical Assistants. How may I help you today? Can I have your full name and age please",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessionDetail?.selectedDoctor?.voiceId,
      },
      model: {
        provider: "openai",
        model: "gpt-4.0-mini",
        messages: [
          {
            role: "system",
            content:
              sessionDetail?.selectedDoctor?.agentPrompt ||
              "You are a helpful AI medical assistant.",
          },
        ],
      },
    };
    //@ts-ignore
    // vapi.start(VapiAgentConfig);
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID!);

    // Add listeners using the stored references
    vapi.on("call-start", listenersRef.current.onCallStart);
    vapi.on("call-end", listenersRef.current.onCallEnd);
    vapi.on("message", listenersRef.current.onMessage);
  };

  // const endCall = async () => {
  //   setLoading(true);
  //   if (!vapiInstance) return;
  //   console.log(vapiInstance);

  //   // Stop the call
  //   vapiInstance.stop();

  //   // Clean up listeners
  //   cleanupListeners();

  //   // Reset call state
  //   setCallStarted(false);
  //   setVapiInstance(null);

  //   const reportData = await GenerateReport();

  //   // Update sessionDetail with the new report
  //   if (reportData && sessionDetail) {
  //     setSessionDetail({
  //       ...sessionDetail,
  //       report: reportData,
  //     });
  //   }

  //   setLoading(false);
  //   toast.success("Medical report generated successfully!");
  //   router.replace("/dashboard");
  // };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    console.log(vapiInstance);

    // Stop the call
    vapiInstance.stop();

    // Clean up listeners
    cleanupListeners();

    // Reset call state
    setCallStarted(false);
    setVapiInstance(null);

    const reportData = await GenerateReport();

    // Update sessionDetail with the new report
    if (reportData && sessionDetail) {
      setSessionDetail({
        ...sessionDetail,
        report: reportData,
      });

      // Show success toast
      toast.success("Medical report generated successfully!");

      // Delay navigation to ensure toast is visible
      setTimeout(() => {
        router.replace("/dashboard"); // Fixed typo
      }, 2000); // 2-second delay to allow the user to see the toast
    } else {
      // Handle failure case
      toast.error("Failed to generate medical report.");
    }

    setLoading(false);
  };

  const GenerateReport = async () => {
    console.log("Messages to send:", messages);
    try {
      const result = await axios.post("/api/medical-report", {
        messages: messages,
        sessionDetail: sessionDetail,
        sessionId: sessionId,
      });

      console.log("Generated report:", result.data);
      return result.data;
    } catch (error) {
      console.error("Error generating report:", error);
      return null;
    }
  };

  return (
    <div className="p-5 border rounded-3xl shadow-lg bg-secondary">
      <div className="flex justify-between items-center p-2">
        <div className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 text-white rounded-full ${
              callStarted ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {!callStarted ? <span>Not Connected</span> : <span>Connected</span>}
        </div>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col p-2 mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image}
            alt="Doctor"
            height={120}
            width={120}
            className="rounded-full h-[100px] w-[100px] object-cover object-[center_top]"
          />
          <h2 className="font-bold text-lg mt-1 gradient-title">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-500">AI Medical Voice Agent</p>
          <div className="mt-12 text-center gradient-background2 p-2 rounded-md w-full overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-25 xl:px-72 mb-4">
            {messages?.slice(-4).map((msg: messages, index) => (
              <h2 key={index} className="text-gray-400 p-2">
                {msg.role}: {msg.text}
              </h2>
            ))}
            {liveTranscript && liveTranscript?.length > 0 && (
              <h2 className="text-lg text-white">
                {currentRoll}: {liveTranscript}
              </h2>
            )}
          </div>

          {/* Display the generated report if it exists */}
          {sessionDetail.report && (
            <div className="mt-4 p-4 border rounded-lg bg-white/10 w-full max-w-lg">
              <h3 className="font-bold text-white mb-2">
                Medical Report Generated
              </h3>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(sessionDetail.report, null, 2)}
              </pre>
            </div>
          )}

          {!callStarted ? (
            <Button
              disabled={loading}
              onClick={StartCall}
              variant={"work"}
              className="mt-20"
            >
              <PhoneCall /> Start Call
            </Button>
          ) : (
            <Button
              onClick={endCall}
              disabled={loading}
              variant={"destructive"}
            >
              {loading ? <Loader className="animate-spin" /> : <PhoneOff />}
              {loading ? "Generating Report..." : "Disconnect"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MedicalVoiceAgent;
