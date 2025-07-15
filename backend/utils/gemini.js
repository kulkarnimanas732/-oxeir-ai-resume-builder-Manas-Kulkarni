import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function getSkillScoreFromResume(resumeText, jobTitle = "Frontend Developer") {
  try {
    const prompt = `
You are an intelligent HR assistant. Review the following resume and rate how well the applicant matches the role of "${jobTitle}" on a scale from 1 to 10.
Only return a single number without any extra explanation.

Resume:
${resumeText}
`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const text = response.data.candidates[0]?.content?.parts[0]?.text ?? "";
    const match = text.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : 0;
  } catch (err) {
    console.error("Gemini API Error:", err?.response?.data || err.message);
    throw new Error("Failed to fetch skill score from Gemini API");
  }
}
