/**
 * ResumeIQ Type Definitions
 */

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  education: Array<{
    institution: string;
    degree: string;
    major: string;
    dates: string;
    gpa?: string;
  }>;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    dates: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  certifications: string[];
  summary: string;
}

export interface ScoreDetail {
  score: number;
  why: string;
  factors: string[];
  missing: string[];
  recommendations: string[];
}

export interface ATSCompatibility {
  overallScore: number;
  categoryScores: {
    skillsMatch: number;
    experienceRelevance: number;
    keywordCoverage: number;
    educationMatch: number;
    projectsMatch: number;
    formattingCompliance: number;
  };
  explanation: {
    skillsMatch: ScoreDetail;
    experienceRelevance: ScoreDetail;
    keywordCoverage: ScoreDetail;
    educationMatch: ScoreDetail;
    projectsMatch: ScoreDetail;
    formattingCompliance: ScoreDetail;
  };
}

export interface MissingKeyword {
  word: string;
  importance: "High" | "Medium" | "Low";
  locationSuggestion: string;
}

export interface BulletPointEnhancement {
  original: string;
  enhanced: string;
  impactAdded: string;
  actionVerbsUsed: string[];
}

export interface SectionHealth {
  status: "Good" | "Weak" | "Missing" | "Overloaded";
  feedback: string;
}

export interface SectionAnalysis {
  summary: SectionHealth;
  education: SectionHealth;
  skills: SectionHealth;
  experience: SectionHealth;
  projects: SectionHealth;
  certifications: SectionHealth;
}

export interface FormattingAnalysis {
  riskLevel: "Low" | "Medium" | "High";
  riskScore: number;
  indicators: {
    tables: boolean;
    columns: boolean;
    graphics: boolean;
    icons: boolean;
    smallFonts: boolean;
  };
  issues: string[];
}

export interface CoachRecommendation {
  priority: "High" | "Medium" | "Low";
  exactSection: string;
  change: string;
  impact: string;
}

export interface ProjectParsedAnalysis {
  name: string;
  depthScore: number;
  scoreBreakdown: {
    complexity: number;
    impact: number;
    innovation: number;
  };
  recommendations: string[];
}

export interface ProjectQualityAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  projectsParsed: ProjectParsedAnalysis[];
}

export interface RecruiterSimulation {
  interviewProbability: "High" | "Medium" | "Low";
  feedbackSummary: string;
  topStrengths: string[];
  topConcerns: string[];
}

export interface ResumeBenchmarking {
  skillsPercentile: number;
  projectsPercentile: number;
  experiencePercentile: number;
  formattingPercentile: number;
  achievementsPercentile: number;
}

export interface SkillGap {
  skill: string;
  priority: "High" | "Medium" | "Low";
  scoreImprovement: number;
  resourcesSuggestion: string;
}

export interface SkillGapAnalysis {
  currentScore: number;
  skillsGaps: SkillGap[];
}

export interface ClaimValidationReport {
  claim: string;
  evidenceFound: boolean;
  details: string;
  responseAction: string;
}

export interface ResumeClaimValidation {
  confidenceScore: number;
  reports: ClaimValidationReport[];
}

export interface SectionAttention {
  header: number;
  summary: number;
  education: number;
  experience: number;
  projects: number;
  skills: number;
  certifications: number;
}

export interface RecruiterAttentionHeatmap {
  sectionScores: SectionAttention;
  mostViewed: string[];
  leastViewed: string[];
}

export interface STARExampleToFix {
  bullet: string;
  missingComponent: string;
  actionImprovement: string;
}

export interface STARAnalysis {
  starCompletenessScore: number;
  breakdown: {
    situationScore: number;
    taskScore: number;
    actionScore: number;
    resultScore: number;
  };
  feedback: string[];
  examplesToFix: STARExampleToFix[];
}

export interface RoleSpecificResume {
  role: string;
  summary: string;
  suggestedSkillsToAdd: string[];
  focusBulletPoints: string[];
}

export interface InterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  answerApproach: string;
}

export interface InterviewQuestionGenerator {
  technical: InterviewQuestion[];
  behavioral: InterviewQuestion[];
  resumeBased: InterviewQuestion[];
  projectBased: InterviewQuestion[];
}

export interface CareerTrajStep {
  step: string;
  duration: string;
  expectedReadinessScore: number;
  description: string;
}

export interface CareerTrajectoryAnalyzer {
  currentReadinessScore: number;
  timelineRoadmap: CareerTrajStep[];
}

export interface FullAnalysisReport {
  timestamp: string;
  jobTitle: string;
  companyName?: string;
  parsedResume: ParsedResume;
  atsCompatibility: ATSCompatibility;
  missingKeywords: MissingKeyword[];
  bulletPointEnhancements: BulletPointEnhancement[];
  sectionAnalysis: SectionAnalysis;
  formattingAnalysis: FormattingAnalysis;
  coachRecommendations: CoachRecommendation[];
  projectAnalysis: ProjectQualityAnalysis;
  recruiterSimulation: RecruiterSimulation;
  benchmarking: ResumeBenchmarking;
  skillGapAnalysis: SkillGapAnalysis;
  claimValidation: ResumeClaimValidation;
  attentionHeatmap: RecruiterAttentionHeatmap;
  starAnalysis: STARAnalysis;
  targetRoleVersions: RoleSpecificResume[];
  interviewPrep: InterviewQuestionGenerator;
  careerTrajectory: CareerTrajectoryAnalyzer;
}
