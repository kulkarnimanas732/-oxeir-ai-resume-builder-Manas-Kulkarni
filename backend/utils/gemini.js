// // // // // // utils/gemini.js
// // // // // import { GoogleGenerativeAI } from '@google/generative-ai';
// // // // // import dotenv from 'dotenv';
// // // // // dotenv.config();

// // // // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // // // export async function getSkillScoreFromResume(resumeText, jobTitle = "Frontend Developer") {
// // // // //   try {
// // // // //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// // // // //     const prompt = `
// // // // // You are an intelligent HR bot. Given the resume below, rate the candidate's skill match for the job of "${jobTitle}" on a scale of 1 to 10. Only return the number.

// // // // // Resume:
// // // // // ${resumeText}
// // // // // `;

// // // // //     const result = await model.generateContent(prompt);
// // // // //     const response = await result.response;
// // // // //     const text = response.text();

// // // // //     // Extract number (e.g., "8", "7.5", etc.)
// // // // //     const match = text.match(/(\d+(\.\d+)?)/);
// // // // //     const score = match ? parseFloat(match[0]) : null;

// // // // //     return score;
// // // // //   } catch (error) {
// // // // //     console.error("Gemini Error:", error);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // utils/gemini.js

// // // // import dotenv from 'dotenv';
// // // // import { GoogleGenerativeAI } from '@google/generative-ai';

// // // // dotenv.config();

// // // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // // /**
// // // //  * Uses Gemini to evaluate a resume against a job title and return a skill match score.
// // // //  * @param {string} resumeText - The extracted resume content (plain text).
// // // //  * @param {string} jobTitle - The job title (e.g. "Backend Developer", "UI/UX Designer").
// // // //  * @returns {Promise<number|null>} A number between 1–10, or null if Gemini fails.
// // // //  */
// // // // export async function getSkillScoreFromResume(resumeText, jobTitle = "Frontend Developer") {
// // // //   try {
// // // //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// // // //     const prompt = `
// // // // You are an intelligent HR bot. Given the resume below, rate the candidate's skill match for the job of "${jobTitle}" on a scale of 1 to 10.
// // // // Only return the number. Do not include any other text.

// // // // Resume:
// // // // ${resumeText}
// // // // `;

// // // //     const result = await model.generateContent(prompt);
// // // //     const response = await result.response;
// // // //     const text = response.text();

// // // //     // Extract just the number from the response (e.g. "7.5")
// // // //     const match = text.match(/(\d+(\.\d+)?)/);
// // // //     return match ? parseFloat(match[0]) : null;

// // // //   } catch (error) {
// // // //     console.error("Gemini Error:", error.message);
// // // //     return null;
// // // //   }
// // // // }
// // // import { GoogleGenerativeAI } from "@google/generative-ai";
// // // import dotenv from "dotenv";
// // // dotenv.config();

// // // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // // export async function getSkillScoreFromResume(resumeText, jobTitle = "Software Developer") {
// // //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
// // //   const prompt = `
// // // Rate this resume out of 10 for the job title "${jobTitle}".
// // // Only return a number. Resume:\n${resumeText}`;

// // //   const result = await model.generateContent(prompt);
// // //   const text = await result.response.text();
// // //   const match = text.match(/(\d+(\.\d+)?)/);
// // //   return match ? parseFloat(match[0]) : 0;
// // // }
// // import { GoogleGenerativeAI } from "@google/generative-ai";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // export async function getSkillScoreFromResume(resumeText, jobTitle = "Software Developer") {
// //   try {
// //     const model = genAI.getGenerativeModel({ model: "models/gemini-pro" }); // ✅ Must include `models/`
    
// //     const prompt = `
// // Rate the candidate's resume on a scale of 1 to 10 for the job title "${jobTitle}".
// // Only return the number (no explanation).
// // Resume:
// // ${resumeText}
// // `;

// //     const result = await model.generateContent(prompt);
// //     const response = result.response;
// //     const text = response.text();

// //     const match = text.match(/(\d+(\.\d+)?)/);
// //     return match ? parseFloat(match[0]) : 0;
// //   } catch (err) {
// //     console.error("Gemini API Error:", err);
// //     throw new Error("Failed to fetch skill score from Gemini API");
// //   }
// // }
// // utils/gemini.js
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export async function getSkillScoreFromResume(resumeText, jobTitle = "Frontend Developer") {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "models/gemini-pro" // ✅ FULL path required
//     });

//     const prompt = `
// You are an intelligent HR bot. Rate this resume for the job title "${jobTitle}" on a scale from 1 to 10.
// Only return a number without explanation.

// Resume:
// ${resumeText}
// `;

//     const result = await model.generateContent([prompt]);
//     const text = result.response.text();

//     const match = text.match(/(\d+(\.\d+)?)/);
//     return match ? parseFloat(match[0]) : 0;
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     throw new Error("Failed to fetch skill score from Gemini API");
//   }
// }

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
