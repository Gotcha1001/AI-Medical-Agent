import { AIDoctorAgents } from "@/app/shared/list";
import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI agent info and conversation between AI medical agent and user, generate structured report with the following fields :
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current data and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g rest, see a doctor)
Return the result in this JSON format:
{
"sessonId": "string",
"agent": "string",
"user": "string",
"timestamp": "ISO Date string,
"chiefComplaint": "string",
"summary": "string",
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string",
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
}
Only include valid fields. Respons with nothing else.

`;

// export async function POST(req: NextRequest) {
//   const { sessionId, sessionDetail, messages } = await req.json();

//   try {
//     const UserInput =
//       "AI Doctor Agent Info:" +
//       JSON.stringify(sessionDetail) +
//       ", Conversation:" +
//       JSON.stringify(messages);

//     const completion = await openai.chat.completions.create({
//       model: "openai/gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: REPORT_GEN_PROMPT },
//         { role: "user", content: UserInput },
//       ],
//     });

//     const rawResp = completion.choices[0].message;

//     //@ts-ignore
//     const Resp = rawResp.content
//       .trim()
//       .replace("```json", "")
//       .replace("```", "");
//     const JSONResp = JSON.parse(Resp);

//     // Save to the Database
//     const result = await db
//       .update(SessionChatTable)
//       .set({
//         report: JSONResp,
//       })
//       .where(eq(SessionChatTable.sessionId, sessionId));

//     return NextResponse.json(JSONResp);
//   } catch (e) {
//     return NextResponse.json(e);
//   }
// }

export async function POST(req: NextRequest) {
  console.log("Received request to /api/medical-report");
  const { sessionId, sessionDetail, messages } = await req.json();
  console.log("Request body:", { sessionId, sessionDetail, messages });

  try {
    if (!sessionId || !sessionDetail || !messages) {
      console.log("Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const UserInput =
      "AI Doctor Agent Info:" +
      JSON.stringify(sessionDetail) +
      ", Conversation:" +
      JSON.stringify(messages);
    console.log("UserInput for OpenAI:", UserInput);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Updated to simpler model name; ensure this is correct
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        { role: "user", content: UserInput },
      ],
    });
    console.log("OpenAI response:", completion.choices[0].message);

    const rawResp = completion.choices[0].message;
    if (!rawResp.content) {
      console.error("OpenAI response content is null or empty");
      return NextResponse.json(
        { error: "OpenAI response content is empty" },
        { status: 500 }
      );
    }

    let JSONResp;
    try {
      const Resp = rawResp.content
        .trim()
        .replace("```json", "")
        .replace("```", "");
      console.log("Processed response:", Resp);
      JSONResp = JSON.parse(Resp);
      console.log("Parsed JSON response:", JSONResp);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return NextResponse.json(
        { error: "Failed to parse OpenAI response", details: parseError },
        { status: 500 }
      );
    }

    const result = await db
      .update(SessionChatTable)
      .set({ report: JSONResp, conversation: messages })
      .where(eq(SessionChatTable.sessionId, sessionId));
    console.log("Database update result:", result);

    return NextResponse.json(JSONResp);
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json(
      { error: "Internal server error", details: e },
      { status: 500 }
    );
  }
}
