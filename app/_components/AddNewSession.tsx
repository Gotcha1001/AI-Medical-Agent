// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { ArrowRight, Loader2 } from "lucide-react";
// import axios from "axios";
// import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";

// function AddNewSession() {
//   const [note, setNote] = useState<string>();

//   const [loading, setLoading] = useState<boolean>(false);
//   const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();

//   const onClickNext = async () => {
//     setLoading(true);
//     const result = await axios.post("/api/suggest-doctors", {
//       notes: note,
//     });
//     setSuggestedDoctors(result.data);
//     setLoading(false);

//     console.log(result.data);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button className="mt-4" variant={"work"}>
//           + Start a Consultation
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Basic Details</DialogTitle>
//           <DialogDescription asChild>
//             {!suggestedDoctors ? (
//               <div>
//                 <h2>Add Your Symptoms Or Any Other Details</h2>
//                 <Textarea
//                   onChange={(e) => setNote(e.target.value)}
//                   placeholder="Add Details here..."
//                   className="h-[200px] mt-2"
//                 />
//               </div>
//             ) : (
//               <div className="grid grid-cols-3 gap-5">
//                 {/* Suggested doctors */}
//                 {suggestedDoctors.map((doctor, index) => (
//                   <DoctorAgentCard doctorAgent={doctor} key={index} />
//                 ))}
//               </div>
//             )}
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <DialogClose>
//             <Button variant={"work1"}>Cancel</Button>
//           </DialogClose>

//           {!suggestedDoctors ? (
//             <Button
//               onClick={() => onClickNext()}
//               disabled={!note || loading}
//               variant={"work"}
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin mr-2" />
//               ) : (
//                 <>
//                   Next <ArrowRight />
//                 </>
//               )}
//             </Button>
//           ) : (
//             <Button>Start Consultation</Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default AddNewSession;

"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SessionDetail } from "../(routes)/dashboard/medical-agent/[sessionId]/page";

function AddNewSession() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

  const router = useRouter();

  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    console.log(result.data);
    setHistoryList(result.data);
  };

  const onClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });

      // Extract the doctors array from the response
      const doctorsData = result.data.doctors || result.data;
      setSuggestedDoctors(doctorsData);
      setLoading(false);

      console.log(result.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    setLoading(true);
    // Save All Info to the Data base
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
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
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button disabled={!paidUser} className="mt-4" variant={"work"}>
          + Start a Consultation
        </Button> */}
        <Button
          disabled={!paidUser && historyList?.length >= 1}
          className="mt-4"
          variant={"work"}
        >
          + Start a Consultation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {suggestedDoctors.length === 0 ? (
              <div>
                <h2>Add Your Symptoms Or Any Other Details</h2>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add Details here..."
                  className="h-[200px] mt-2"
                />
              </div>
            ) : (
              <div>
                <h2>Select The Doctor</h2>
                <div className="grid grid-cols-3 gap-5">
                  {/* Suggested doctors */}
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctorCard
                      doctorAgent={doctor}
                      key={index}
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      //@ts-ignore
                      selectedDoctor={selectedDoctor}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"work1"}>Cancel</Button>
          </DialogClose>

          {suggestedDoctors.length === 0 ? (
            <Button
              onClick={() => onClickNext()}
              disabled={!note.trim() || loading}
              variant={"work"}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>
                  Next <ArrowRight />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={() => onStartConsultation()}
              variant={"work3"}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <>
                  Start Consultation <ArrowRight />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSession;
