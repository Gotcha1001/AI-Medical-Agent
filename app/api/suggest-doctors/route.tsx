// import { AIDoctorAgents } from "@/app/shared/list";
// import { openai } from "@/config/OpenAiModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   // get the notes from the request body
//   const { notes } = await req.json();

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "google/gemini-2.0-flash-exp:free",
//       messages: [
//         { role: "system", content: JSON.stringify(AIDoctorAgents) },
//         {
//           role: "user",
//           content:
//             "User Notes/Symptoms:" +
//             notes +
//             ",Depends on the users notes and symptoms, Please suggest the list of doctors, return the object in JSON only ",
//         },
//       ],
//     });

//     const rawResp = completion.choices[0].message;
//     return NextResponse.json(rawResp);
//   } catch (e) {
//     return NextResponse.json(e);
//   }
// }

import { AIDoctorAgents } from "@/app/shared/list";
import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const body = await req.json();
    const { notes } = body;

    if (!notes || typeof notes !== "string" || notes.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide valid symptoms or notes" },
        { status: 400 }
      );
    }

    // Make OpenAI API call
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      response_format: { type: "json_object" }, // Ensures valid JSON response
      messages: [
        {
          role: "system",
          content: `You are a medical assistant that responds only in JSON format. Based on user symptoms, suggest 2-4 relevant doctors from this available list: ${JSON.stringify(
            AIDoctorAgents
          )}. 

IMPORTANT: Always suggest MULTIPLE doctors (2-4), never just one unless the list has only one relevant option.

Matching Guidelines:
- Chest pain/heart issues → Cardiologist + General Physician
- Skin problems → Dermatologist + General Physician  
- Bone/joint/muscle pain → Orthopedic + General Physician
- Mental health/anxiety → Psychologist + General Physician
- Children's issues → Pediatrician + General Physician + relevant specialist
- Ear/nose/throat → ENT Specialist + General Physician
- Women's health → Gynecologist + General Physician
- Diet/weight issues → Nutritionist + General Physician
- Dental problems → Dentist + General Physician
- General symptoms → General Physician + most relevant specialist

Rules:
- MUST suggest multiple doctors from the provided list
- Always include General Physician unless highly specialized (like dental)
- Prioritize most relevant specialist first, then General Physician
- Include secondary relevant specialists when applicable
- Always return valid JSON with "doctors" array`,
        },
        {
          role: "user",
          content: `User Notes/Symptoms: ${notes.trim()}

Analyze these symptoms and suggest 2-4 most appropriate doctors from the available list. 

Examples based on available specialists:
- "Chest pain" → Cardiologist, General Physician
- "Skin rash itching" → Dermatologist, General Physician
- "Joint pain knee" → Orthopedic, General Physician  
- "Anxiety depression" → Psychologist, General Physician
- "Child fever cough" → Pediatrician, General Physician, ENT Specialist
- "Ear infection" → ENT Specialist, General Physician
- "Toothache" → Dentist, General Physician
- "Weight loss diet" → Nutritionist, General Physician
- "Period problems" → Gynecologist, General Physician

IMPORTANT: Always suggest multiple doctors, not just one. Return JSON with this structure:
{
  "doctors": [
    {
      "id": number,
      "specialist": "string",
      "description": "string", 
      "image": "string"
    },
    {
      "id": number,
      "specialist": "string",
      "description": "string", 
      "image": "string"
    }
  ]
}`,
        },
      ],
      temperature: 0.3, // Slightly higher for more variety
      max_tokens: 1000,
    });

    const rawResponse = completion.choices[0].message;

    if (!rawResponse?.content) {
      throw new Error("No response content from OpenAI");
    }

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse.content);
      console.log("AI Response:", parsedResponse); // Debug log
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw Content:", rawResponse.content);

      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          details: "The AI returned invalid JSON format",
        },
        { status: 500 }
      );
    }

    // Validate the response structure
    if (!parsedResponse.doctors || !Array.isArray(parsedResponse.doctors)) {
      return NextResponse.json(
        {
          error: "Invalid response format",
          details: "Expected 'doctors' array in response",
        },
        { status: 500 }
      );
    }

    // Validate each doctor object
    const validatedDoctors = parsedResponse.doctors.filter((doctor: any) => {
      return (
        doctor.id &&
        doctor.specialist &&
        doctor.description &&
        doctor.image &&
        typeof doctor.id === "number" &&
        typeof doctor.specialist === "string" &&
        typeof doctor.description === "string" &&
        typeof doctor.image === "string"
      );
    });

    if (validatedDoctors.length === 0) {
      return NextResponse.json(
        {
          error: "No valid doctor suggestions found",
          details: "Please try rephrasing your symptoms",
        },
        { status: 500 }
      );
    }

    // Return the validated response
    return NextResponse.json({
      doctors: validatedDoctors,
      message: `Found ${validatedDoctors.length} doctor recommendation(s) based on your symptoms`,
    });
  } catch (error: any) {
    console.error("API Error:", error);

    // Handle specific OpenAI errors
    if (error.status === 429) {
      return NextResponse.json(
        {
          error: "Service temporarily busy",
          details: "Please try again in a few minutes",
        },
        { status: 429 }
      );
    }

    if (error.status === 401) {
      return NextResponse.json(
        {
          error: "API configuration error",
          details: "Please contact support",
        },
        { status: 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: "Something went wrong",
        details: "Unable to process your request at this time",
      },
      { status: 500 }
    );
  }
}
