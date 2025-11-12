"use server";
import { geminiClient, GEMINI_MODEL } from "@/lib/gemini-config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/lib/firebase-config";

export interface JobAnalysisResult {
  jobTitle: string;
  company: string;
  compatibilityScore: number;
  improvementTips: string;
}

export async function analyzeJobApplication(
  cvStoragePath: string,
  jobUrl: string,
): Promise<JobAnalysisResult> {
  try {
    const cvRef = ref(storage, cvStoragePath);
    const cvDownloadUrl = await getDownloadURL(cvRef);

    const [cvResponse, jobResponse] = await Promise.all([
      fetch(cvDownloadUrl),
      fetch(jobUrl),
    ]);

    if (!cvResponse.ok || !jobResponse.ok) {
      throw new Error(
        `Failed to fetch content: CV=${cvResponse.status}, Job=${jobResponse.status}`,
      );
    }

    const [cvText, jobHtml] = await Promise.all([
      cvResponse.text(),
      jobResponse.text(),
    ]);

    const prompt = `You are an expert career advisor and recruiter. Analyze the CV and job listing to provide detailed insights.

Please analyze both documents and provide:
1. The job title from the job listing
2. The company name from the job listing
3. A compatibility score (0-100) between the candidate's CV and the job requirements
4. Detailed improvement tips in markdown format for how the candidate can improve their application

Return ONLY a valid JSON response in this exact format (no additional text):
{
  "jobTitle": "exact job title from listing",
  "company": "company name",
  "compatibilityScore": 85,
  "improvementTips": "## Key Improvements\\n\\n### Skills to Highlight\\n- Tip 1\\n- Tip 2\\n\\n### Experience to Emphasize\\n- Tip 3\\n- Tip 4"
}

--- CV CONTENT ---
${cvText}

--- JOB LISTING CONTENT ---
${jobHtml}`;

    const response = await geminiClient.models.generateContent({
      model: GEMINI_MODEL,
      contents: [prompt],
    });

    const text = response.text;

    let jsonString = "";
    const codeBlockMatch = text?.match(/```(?:json)?\s*\n([\s\S]*?)\n```/);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      const jsonMatch = text?.match(/\{[\s\S]*?\n\}/);
      if (!jsonMatch) {
        console.error("AI Response:", text);
        throw new Error("Failed to parse AI response");
      }
      jsonString = jsonMatch[0];
    }

    let parsed: JobAnalysisResult;
    try {
      parsed = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse JSON:", jsonString);
      console.error("Parse error:", parseError);
      throw parseError;
    }

    return {
      jobTitle: parsed.jobTitle || "Unknown Position",
      company: parsed.company || "Unknown Company",
      compatibilityScore: Math.min(
        100,
        Math.max(0, parsed.compatibilityScore || 70),
      ),
      improvementTips:
        parsed.improvementTips ||
        "## General Tips\n\n- Review the job description carefully\n- Tailor your resume to match key requirements\n- Highlight relevant experience and skills",
    };
  } catch (error) {
    console.error("Error analyzing job application:", error);
    return {
      jobTitle: "Error: Could not analyze",
      company: "Unknown",
      compatibilityScore: 0,
      improvementTips:
        "## Analysis Error\n\nUnable to analyze the job listing. Please check the URL and try again.",
    };
  }
}
