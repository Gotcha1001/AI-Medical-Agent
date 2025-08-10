// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { SessionDetail } from "../(routes)/dashboard/medical-agent/[sessionId]/page";
// import moment from "moment";
// import { currentUser } from "@clerk/nextjs/server";
// import { useUser } from "@clerk/nextjs";

// type props = {
//   record: SessionDetail;
// };

// function ViewReportDialog({ record }: props) {
//   const user = useUser();

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button size={"sm"} variant={"work"}>
//           View Report
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle asChild>
//             <h2 className="text-center text-4xl gradient-title">
//               Medical AI Voice Agent Report
//             </h2>
//           </DialogTitle>
//           <DialogDescription asChild>
//             <div className="mt-10">
//               <h2 className="font-bold text-teal-500 text-lg">Session Info:</h2>
//               <div className="grid grid-cols-2">
//                 <h2>
//                   <span className="font-bold"> Doctor:</span>{" "}
//                   {record.selectedDoctor?.specialist}
//                 </h2>
//                 <h2>
//                   Consultation Date:{" "}
//                   {moment(new Date(record?.createdOn)).fromNow()}
//                 </h2>
//                 <h2>User: Anonymous</h2>
//                 <h2>Agent: {record.selectedDoctor.specialist}</h2>
//               </div>
//               <div>
//                 <h2 className="font-bold text-teal-500 text-lg mt-5">
//                   Chief Complaint
//                 </h2>
//                 <p>{record.notes}</p>
//               </div>
//               <div>
//                 <h2>Summary:</h2>
//                 <p></p>
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ViewReportDialog;
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SessionDetail } from "../(routes)/dashboard/medical-agent/[sessionId]/page";
import moment from "moment";

// Define the report structure interface
interface MedicalReport {
  agent?: string;
  chiefComplaint?: string;
  recommendations?: string[];
  sessionId?: string;
  severity?: string;
  summary?: string;
  symptoms?: string[];
  timestamp?: string;
  user?: string;
  duration?: string;
  medications?: string[];
}

type props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: props) {
  // Parse the JSON report and provide type safety
  const parseReport = (reportData: any): MedicalReport => {
    try {
      if (typeof reportData === "string") {
        return JSON.parse(reportData) as MedicalReport;
      }
      return reportData as MedicalReport;
    } catch (error) {
      console.error("Error parsing report:", error);
      return {};
    }
  };

  const report = parseReport(record.report);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"work"}>
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-4xl gradient-title">
              Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10 space-y-6">
              <div>
                <h2 className="font-bold text-teal-500 text-lg">
                  Session Info:
                </h2>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <h2>
                    <span className="font-bold"> Doctor:</span>{" "}
                    {record.selectedDoctor?.specialist}
                  </h2>
                  <h2>
                    <span className="font-bold">Consultation Date:</span>{" "}
                    {moment(new Date(record?.createdOn)).fromNow()}
                  </h2>
                  <h2>
                    <span className="font-bold">User:</span> Anonymous
                  </h2>
                  <h2>
                    <span className="font-bold">Agent:</span>{" "}
                    {report?.agent || record.selectedDoctor?.specialist}
                  </h2>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-teal-500 text-lg">
                  Chief Complaint
                </h2>
                <p className="mt-1 text-gray-700">
                  {report?.chiefComplaint || record.notes}
                </p>
              </div>

              <div>
                <h2 className="font-bold text-teal-500 text-lg">Summary</h2>
                <p className="mt-1 text-gray-700">
                  {report?.summary || "No summary available"}
                </p>
              </div>

              <div>
                <h2 className="font-bold text-teal-500 text-lg">Symptoms</h2>
                <div className="mt-1">
                  {report?.symptoms && report.symptoms.length > 0 ? (
                    <ul className="list-disc list-inside text-gray-700">
                      {report.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">No symptoms recorded</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-bold text-teal-500 text-lg">Severity</h2>
                <p className="mt-1">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report?.severity === "severe"
                        ? "bg-red-100 text-red-800"
                        : report?.severity === "moderate"
                        ? "bg-yellow-100 text-yellow-800"
                        : report?.severity === "mild"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {report?.severity
                      ? report.severity.charAt(0).toUpperCase() +
                        report.severity.slice(1)
                      : "Not specified"}
                  </span>
                </p>
              </div>

              {/* Duration - if available in your data structure */}
              {report?.duration && (
                <div>
                  <h2 className="font-bold text-teal-500 text-lg">Duration</h2>
                  <p className="mt-1 text-gray-700">{report.duration}</p>
                </div>
              )}

              {/* Medications - if available in your data structure */}
              {report?.medications && report.medications.length > 0 && (
                <div>
                  <h2 className="font-bold text-teal-500 text-lg">
                    Medications Mentioned
                  </h2>
                  <div className="mt-1">
                    <ul className="list-disc list-inside text-gray-700">
                      {report.medications.map((medication, index) => (
                        <li key={index}>{medication}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {report?.recommendations && report.recommendations.length > 0 && (
                <div>
                  <h2 className="font-bold text-teal-500 text-lg">
                    Recommendations
                  </h2>
                  <div className="mt-1">
                    <ul className="list-disc list-inside text-gray-700">
                      {report.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Session ID for reference */}
              <div className="pt-4 border-t">
                <h2 className="font-bold text-teal-500 text-sm">Session ID</h2>
                <p className="text-xs text-gray-500 font-mono">
                  {record.sessionId}
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
