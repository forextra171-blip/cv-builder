import { z } from "zod";

export const cvSchema = z.object({
  // Step 1 - Basic Info
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  linkedIn: z.string().optional(),
  city: z.string().optional(),

  // Step 2 - Status
  status: z.enum([
    "Student",
    "Fresh Graduate",
    "Working Professional",
    "Job Holder",
    "Expert",
    "Housewife",
    "Other",
  ], {
    message: "Please select a status"
  }),

  // Step 3 - Education
  educationType: z.enum(["Matric", "Inter", "Graduate", "Masters", "Other"], {
    message: "Please select an education level"
  }),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  university: z.string().min(1, "University/Institution is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),

  // Step 4 - Experience
  yearsOfExperience: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  workDescription: z.string().optional(),

  // Step 5 - Skills
  primarySkills: z.array(z.string()),
  technicalSkills: z.string().optional(),
  softSkills: z.string().optional(),

  // Step 6 - Additional
  portfolioUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  achievements: z.string().optional(),
  careerSummary: z.string().optional(),
  courses: z.array(z.object({
    title: z.string(),
    institute: z.string(),
  })).optional(),
  activities: z.string().optional(),
  objectives: z.string().optional(),

  // Step 7 - Photo
  photoUrl: z.string().optional(),

  // Step 8 - Template
  templateId: z.string().optional(),
});

export type CVData = z.infer<typeof cvSchema>;

export const defaultValues: Partial<CVData> = {
  status: undefined,
  primarySkills: [],
  courses: [],
  templateId: "modern",
};
