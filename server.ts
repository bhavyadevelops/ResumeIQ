import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up generous body limits for uploaded base64 files
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please supply an API key in the Settings > Secrets panel of your workspace.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API for Resume & JD Analysis
app.post("/api/analyze", async (req, res) => {
  try {
    const { resumeText, resumeFile, jobText } = req.body;

    if (!jobText || jobText.trim() === "") {
      return res.status(400).json({ error: "Job description is required to perform compatibility scoring." });
    }

    if (!resumeText && !resumeFile) {
      return res.status(400).json({ error: "Please provide resume content either by pasting text or uploading a file." });
    }

    const ai = getGeminiClient();

    // Prepare content parts
    const parts: any[] = [];

    // Prompt instructions explaining the complete multi-dimensional ATS evaluation and optimization analysis
    const systemPrompt = `You are an elite ATS resume parser, resume optimization coach, and expert recruiter simulation.
Evaluate the candidate's resume against the provided Job Description (JD).
You must analyze the text and formatting of the resume, detect skills, experience relevance, formatting risks, missing keywords, bullet point enhancements, heatmaps, STAR feedback, simulated interview prep, and career Trajectory.

You MUST reply with a single, perfectly structured, valid JSON object that exactly matches this TypeScript schema:
{
  "timestamp": "2026-05-31T03:16:50Z",
  "jobTitle": "Extracted Job Title from JD",
  "companyName": "Extracted Company Name from JD (optional)",
  "parsedResume": {
    "name": "Candidate Name (or Unknown)",
    "email": "Candidate Email (or empty)",
    "phone": "Candidate Phone (or empty)",
    "education": [{"institution": "...", "degree": "...", "major": "...", "dates": "...", "gpa": "..."}],
    "skills": ["skill1", "skill2"],
    "experience": [{"company": "...", "role": "...", "dates": "...", "bullets": ["..."]}],
    "projects": [{"name": "...", "description": "...", "technologies": ["..."]}],
    "certifications": ["cert1"],
    "summary": "Brief executive overview description or candidate bio"
  },
  "atsCompatibility": {
    "overallScore": 76, // Integer 0-100 calculated recursively by the standard weights below
    "categoryScores": {
      "skillsMatch": 75, // Integer 0-100
      "experienceRelevance": 80, // Integer 0-100
      "keywordCoverage": 70, // Integer 0-100
      "educationMatch": 90, // Integer 0-100
      "projectsMatch": 60, // Integer 0-100
      "formattingCompliance": 85 // Integer 0-100
    },
    "explanation": {
      "skillsMatch": {"score": 75, "why": "Explanation", "factors": ["Possesses Python and NLP"], "missing": ["TensorFlow", "Docker"], "recommendations": ["Add tensorflow projects", "Learn docker"]},
      "experienceRelevance": {"score": 80, "why": "Explanation", "factors": ["..."], "missing": ["..."], "recommendations": ["..."]},
      "keywordCoverage": {"score": 70, "why": "Explanation", "factors": ["..."], "missing": ["..."], "recommendations": ["..."]},
      "educationMatch": {"score": 90, "why": "Explanation", "factors": ["..."], "missing": ["..."], "recommendations": ["..."]},
      "projectsMatch": {"score": 60, "why": "Explanation", "factors": ["..."], "missing": ["..."], "recommendations": ["..."]},
      "formattingCompliance": {"score": 85, "why": "Explanation", "factors": ["..."], "missing": ["..."], "recommendations": ["..."]}
    }
  },
  "missingKeywords": [
    {"word": "Docker", "importance": "High", "locationSuggestion": "Skills or Experience sections where deployment is mentioned"}
  ],
  "bulletPointEnhancements": [
    {
      "original": "Worked on a python web app for predictions.",
      "enhanced": "Engineered a predictive web analytics app using Python and Flask, boosting data retrieval speed by 42% and processing 10k+ requests daily.",
      "impactAdded": "Added quantitative metrics (42% speed, 10k+ requests) and emphasized technical framework Flask.",
      "actionVerbsUsed": ["Engineered", "Boosting", "Processing"]
    }
  ],
  "sectionAnalysis": {
    "summary": {"status": "Good", "feedback": "Clear and aligns well with the roles requirements."},
    "education": {"status": "Good", "feedback": "Detailed GPA and graduation date provided."},
    "skills": {"status": "Weak", "feedback": "Missing relevant containerization and cloud frameworks."},
    "experience": {"status": "Good", "feedback": "Positions are detailed, but lack measurable impact in several points."},
    "projects": {"status": "Weak", "feedback": "Projects lack quantitative metrics and details on architecture."},
    "certifications": {"status": "Missing", "feedback": "No formal certifications listed, which are preferred in the job description."}
  },
  "formattingAnalysis": {
    "riskLevel": "Medium", // "Low" or "Medium" or "High"
    "riskScore": 45, // 0-100 (where 100 means very risky, such as columns, graphics, text boxes)
    "indicators": {
      "tables": false,
      "columns": true,
      "graphics": false,
      "icons": true,
      "smallFonts": false
    },
    "issues": ["Two-column layout can throw off legacy parser engines.", "Used custom bullet point icons."]
  },
  "coachRecommendations": [
    {"priority": "High", "exactSection": "Experience", "change": "Integrate 3 quantitative impact figures (percentage, dollars saved, hours reduced) to substantiate results.", "impact": "Greatly improves Recruiter Response likelihood by proving value."}
  ],
  "projectAnalysis": {
    "score": 68,
    "strengths": ["Clear focus on software engineering", "Strong core web programming foundations"],
    "weaknesses": ["Lack of deployment complexity", "No distributed systems or caching mechanisms shown"],
    "recommendations": ["Deploy existing portfolio Web App using AWS EC2 and integrate container orchestration via Docker."],
    "projectsParsed": [
      {
        "name": "Project Title",
        "depthScore": 72,
        "scoreBreakdown": {"complexity": 70, "impact": 65, "innovation": 80},
        "recommendations": ["Re-write bullet points to show technical challenges overcome."]
      }
    ]
  },
  "recruiterSimulation": {
    "interviewProbability": "Medium", // "Low", "Medium", "High"
    "feedbackSummary": "The candidate has beautiful fundamentals but needs broader cloud infrastructure experience to excel.",
    "topStrengths": ["Excellent academic credentials", "Direct experience in development"],
    "topConcerns": ["Missing keywords required by operational staff", "Project impact metrics are soft"]
  },
  "benchmarking": {
    "skillsPercentile": 62,
    "projectsPercentile": 45,
    "experiencePercentile": 74,
    "formattingPercentile": 80,
    "achievementsPercentile": 55
  },
  "skillGapAnalysis": {
    "currentScore": 76,
    "skillsGaps": [
      {"skill": "Docker", "priority": "High", "scoreImprovement": 6, "resourcesSuggestion": "Complete Docker Essentials & learn standard networking volumes."},
      {"skill": "AWS Cloud Practitioner", "priority": "Medium", "scoreImprovement": 5, "resourcesSuggestion": "Obtain basic AWS accreditation or deploy static backend systems."}
    ]
  },
  "claimValidation": {
    "confidenceScore": 78, // Score 0-100 indicating how substantiated claims are
    "reports": [
      {"claim": "Expert in Machine Learning", "evidenceFound": false, "details": "The candidate asserts expertise in Machine Learning, yet no direct experiences or projects utilizing ML models are listed.", "responseAction": "Either remove the 'expert' modifier or describe a concrete ML project inside the Projects directory."}
    ]
  },
  "attentionHeatmap": {
    "sectionScores": {
      "header": 85,
      "summary": 95,
      "education": 70,
      "experience": 90,
      "projects": 60,
      "skills": 95,
      "certifications": 30
    },
    "mostViewed": ["Skills Section", "Summary Statement", "Experience Bullet Points"],
    "leastViewed": ["Certifications section (scant/empty)", "Academic course lists"]
  },
  "starAnalysis": {
    "starCompletenessScore": 55, // 0-100
    "breakdown": {
      "situationScore": 60,
      "taskScore": 50,
      "actionScore": 70,
      "resultScore": 40
    },
    "feedback": [
      "Most statements explain the 'Action' cleanly, but omit the direct 'Result' or business impact.",
      "The 'Situation' and context are often combined in a single vague sentence."
    ],
    "examplesToFix": [
      {
        "bullet": "Parsed log files to identify bugs.",
        "missingComponent": "Result & Task context (e.g., Why were we doing this? What did it achieve?)",
        "actionImprovement": "Wrote script to parse 5,000 hourly log files, decreasing system diagnostic times by 35%."
      }
    ]
  },
  "targetRoleVersions": [
    {
      "role": "Software Engineer",
      "summary": "Full-stack software developer with core capabilities in web technologies, database design, and modular coding...",
      "suggestedSkillsToAdd": ["Docker", "Kubernetes", "Redis"],
      "focusBulletPoints": [
        "Architected standard API endpoints to serve parsed JSON payloads dynamically.",
        "Streamlined code bases for increased speed and accessibility."
      ]
    }
  ],
  "interviewPrep": {
    "technical": [
      {"question": "How would you handle high volume API request throttling?", "difficulty": "Medium", "answerApproach": "Describe token bucket algorithms, using Redis to track keys, or CDN caching strategies."}
    ],
    "behavioral": [
      {"question": "Tell me about a technical project where you faced a major bottleneck.", "difficulty": "Medium", "answerApproach": "Use STAR. Discuss the project scope, identifying the slow query or module, profiling, and fixing it."}
    ],
    "resumeBased": [
      {"question": "I see you listed experience with Python. Can you elaborate on the web prediction backend?", "difficulty": "Easy", "answerApproach": "Connect Python's ML/analysis stack to Express or other web layers."}
    ],
    "projectBased": [
      {"question": "For your web application project, how did you choose your primary database schema?", "difficulty": "Hard", "answerApproach": "Discuss relational structures vs non-relational, indexing, and normalized forms."}
    ]
  },
  "careerTrajectory": {
    "currentReadinessScore": 72,
    "timelineRoadmap": [
      {"step": "Integrate Docker containerization into current web app", "duration": "1 week", "expectedReadinessScore": 78, "description": "Package the service into small, deployable images with clean volume architectures."},
      {"step": "Complete AWS certification and set up CDN cloud networks", "duration": "4 weeks", "expectedReadinessScore": 86, "description": "Configure static asset distributors to speed up file loading for international clients."}
    ]
  }
}

CRITICAL RULES FOR CALCULATION & INTEGRITY:
- The overall ATS Score MUST be a weighted sum calculated strictly as follows:
  Overall ATS Score = (Skills Match * 25%) + (Experience Relevance * 25%) + (Keyword Coverage * 20%) + (Education Match * 10%) + (Projects Match * 10%) + (Formatting Compliance * 10%).
  Double check this math so overallScore represents the mathematically correct weighted average.
- Do not invent fake placeholders. Make all recommendations, missing keywords, and evaluations highly specific and entirely custom-tailored to the actual Candidate Resume and Target Job Description provided in the prompt.
- Retain professional, objective, high-fidelity feedback. Output exactly the raw, valid, unquoted JSON data without markdown wrap comments (no \`\`\`json blocks in raw payload wrappers).`;

    // Package the user assets into parts
    parts.push({ text: systemPrompt });

    // Handle document upload vs plain text resume
    if (resumeFile && resumeFile.base64) {
      parts.push({
        text: `--- CANDIDATE RESUME DOCUMENT ---
Filename: ${resumeFile.filename || "resume.pdf"}
MIME Type: ${resumeFile.mimeType || "application/pdf"}`
      });
      parts.push({
        inlineData: {
          data: resumeFile.base64,
          mimeType: resumeFile.mimeType || "application/pdf"
        }
      });
    }

    if (resumeText && resumeText.trim() !== "") {
      parts.push({ text: `--- CANDIDATE RESUME PLAIN TEXT ---\n${resumeText}` });
    }

    parts.push({ text: `--- TARGET JOB DESCRIPTION ---\n${jobText}` });

    parts.push({ text: "Perform the comprehensive ATS analysis now, making certain that overallScore perfectly computes based on the weighted average weights." });

    // Invoke Gemini model with strict JSON mimeType
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        // Setting low temperature to prioritize diagnostic correctness
        temperature: 0.2,
      }
    });

    const textResult = response.text;
    if (!textResult) {
      throw new Error("No response text returned from the Gemini API model.");
    }

    // Attempt to parse output
    let parsedResult;
    try {
      parsedResult = JSON.parse(textResult.trim());
    } catch (parseErr: any) {
      console.error("JSON Parsing failed. Attempting cleanup of response.", textResult);
      // Clean potential wrap markings
      let cleanedText = textResult.trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.substring(7);
      }
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.substring(0, cleanedText.length - 3);
      }
      parsedResult = JSON.parse(cleanedText.trim());
    }

    // Double-check ATS math alignment before dispatching
    const ats = parsedResult.atsCompatibility;
    if (ats && ats.categoryScores) {
      const mathScore = Math.round(
        (ats.categoryScores.skillsMatch * 0.25) +
        (ats.categoryScores.experienceRelevance * 0.25) +
        (ats.categoryScores.keywordCoverage * 0.20) +
        (ats.categoryScores.educationMatch * 0.10) +
        (ats.categoryScores.projectsMatch * 0.10) +
        (ats.categoryScores.formattingCompliance * 0.10)
      );
      if (parsedResult.atsCompatibility.overallScore !== mathScore) {
        parsedResult.atsCompatibility.overallScore = mathScore;
      }
    }

    res.json(parsedResult);

  } catch (error: any) {
    console.error("Analysis Endpoint Failure:", error);
    res.status(500).json({ error: error.message || "An error occurred during resume analysis." });
  }
});

// Configure Vite middleware or Server Bundle Static delivery
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware configured.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production asset path configured:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ResumeIQ Server booted and running on port ${PORT}`);
  });
}

startServer();
