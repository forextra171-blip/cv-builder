'use client';

import { useCvStore } from "@/store/useCvStore";
import { useFormContext, useFieldArray } from "react-hook-form";
import { CVData } from "@/lib/schema";
import { motion, AnimatePresence } from "motion/react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { ChevronRight, ChevronLeft, Check, Plus, Trash2, Upload, Crop as CropIcon, Download, Wand2, LayoutTemplate } from "lucide-react";
import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Preview from "@/components/builder/Preview";
import { AutoScale } from "@/components/builder/AutoScale";
import Image from "next/image";

// List of step fields for validation
const stepFields: Record<number, (keyof CVData)[]> = {
  1: ["fullName", "email", "phone", "linkedIn", "city"],
  2: ["status"],
  3: ["educationType", "fieldOfStudy", "university", "graduationYear"],
  4: ["yearsOfExperience", "jobTitle", "company", "workDescription"],
  5: ["primarySkills", "technicalSkills", "softSkills"],
  6: ["portfolioUrl", "githubUrl", "achievements", "careerSummary", "courses", "activities", "objectives"],
  7: ["photoUrl"],
  8: ["templateId"],
  9: [] // Submit step
};

export default function FormSteps() {
  const { currentStep, nextStep, prevStep, updateData } = useCvStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { trigger, handleSubmit, getValues, reset } = useFormContext<CVData>();

  const loadExample = () => {
    const exampleData: CVData = {
      fullName: "Alex Rivera",
      email: "alex.rivera@example.com",
      phone: "+1 415 555 0198",
      linkedIn: "linkedin.com/in/arivera",
      city: "San Francisco, CA",
      status: "Working Professional",
      educationType: "Masters",
      fieldOfStudy: "Human-Computer Interaction",
      university: "Stanford University",
      graduationYear: "2021",
      yearsOfExperience: "3-5",
      jobTitle: "Senior UX/UI Designer",
      company: "InnovateTech",
      workDescription: "• Spearheaded the redesign of the flagship mobile app, leading to a 40% increase in user engagement.\n• Conducted A/B testing and user research to iterate on core features.\n• Mentored cross-functional teams on accessibility standards.",
      primarySkills: ["React", "Figma", "UI/UX Design", "TypeScript", "Tailwind CSS", "Prototyping"],
      technicalSkills: "HTML/CSS, Node.js, Webflow, Git, Jest",
      softSkills: "Leadership, Empathetic Communication, Agile, Public Speaking",
      portfolioUrl: "alexrivera.design",
      githubUrl: "github.com/arivera",
      achievements: "• Best Mobile Design 2022 - UXAwards\n• Published 3 articles in Smashing Magazine",
      careerSummary: "Detail-oriented UX/UI Designer and Front-End Developer with a passion for creating accessible and delightful user experiences. Proven track record of bridging the gap between design and engineering.",
      activities: "Design Mentor at ADPList, Volunteer for Tech4Good",
      objectives: "To leverage my dual expertise in design and development to build impactful, scalable products in a forward-thinking tech environment.",
      courses: [
        { title: "Advanced React Patterns", institute: "Frontend Masters" },
        { title: "Google UX Design Professional Certificate", institute: "Coursera" }
      ],
      templateId: "modern"
    };
    reset(exampleData);
    updateData(exampleData);
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      nextStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (formData: CVData) => {
    setIsSubmitting(true);
    try {
      const SCRIPT_URL =
        process.env.NEXT_PUBLIC_APPS_SCRIPT_URL ||
        "https://script.google.com/macros/s/AKfycbxhFconZTwDsSWTUEugS0eQSWHNp27NG2x1hrFFQDUVJm6-Hb6MVViQt0sV4rEaR7sB/exec";
      if (!SCRIPT_URL) {
        alert("Missing NEXT_PUBLIC_APPS_SCRIPT_URL. Add it to .env.local and redeploy.");
        return;
      }
      
      const payload = {
        ...formData,
        primarySkills: formData.primarySkills?.join(', ') || '',
        courses: JSON.stringify(formData.courses || []),
      };

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      
      alert("CV Submitted Successfully to Google Sheets!");
    } catch (e) {
      console.error(e);
      alert("Submission finished (might have errored due to placeholder URL)");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mr-4">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-out" 
            style={{ width: `${(currentStep / 9) * 100}%` }}
          />
        </div>
        <Button type="button" variant="outline" size="sm" onClick={loadExample} className="shrink-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
          <Wand2 className="w-3 h-3 mr-1.5" /> Fill Example
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            {currentStep === 1 && <Step1BasicInfo />}
            {currentStep === 2 && <Step2Status />}
            {currentStep === 3 && <Step3Education />}
            {currentStep === 4 && <Step4Experience />}
            {currentStep === 5 && <Step5Skills />}
            {currentStep === 6 && <Step6Additional />}
            {currentStep === 7 && <Step7Photo />}
            {currentStep === 8 && <Step8Template />}
            {currentStep === 9 && <Step9Review isSubmitting={isSubmitting} />}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t flex justify-between items-center bg-white sticky bottom-0 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
          >
            <ChevronLeft className="w-4 h-4 mr-1.5" /> Back
          </Button>

          {currentStep < 9 ? (
            <Button type="button" onClick={handleNext}>
              Next <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Finish & Submit"} <Check className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function ErrorMsg({ name }: { name: string }) {
  const { formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;
  if (!error) return null;
  return <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>;
}

// -----------------------------------------------------------------------------
// STEP COMPONENTS
// -----------------------------------------------------------------------------

function Step1BasicInfo() {
  const { register } = useFormContext<CVData>();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Basic Information</h2>
        <p className="text-slate-500 mt-1">Let&apos;s start with your contact details.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" {...register("fullName")} className="mt-1" placeholder="John Doe" />
          <ErrorMsg name="fullName" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1" placeholder="john@example.com" />
          <ErrorMsg name="email" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} className="mt-1" placeholder="+1 234 567 8900" />
        </div>
        <div>
          <Label htmlFor="linkedIn">LinkedIn URL</Label>
          <Input id="linkedIn" {...register("linkedIn")} className="mt-1" placeholder="linkedin.com/in/johndoe" />
        </div>
        <div>
          <Label htmlFor="city">City, Country</Label>
          <Input id="city" {...register("city")} className="mt-1" placeholder="New York, USA" />
        </div>
      </div>
    </div>
  );
}

function Step2Status() {
  const { register, watch } = useFormContext<CVData>();
  const statusOptions = [
    "Student", "Fresh Graduate", "Working Professional", 
    "Job Holder", "Expert", "Housewife", "Other"
  ];
  const selectedStatus = watch("status");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Current Status</h2>
        <p className="text-slate-500 mt-1">Which of these best describes your current professional status?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {statusOptions.map((opt) => (
          <label 
            key={opt}
            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
              selectedStatus === opt 
              ? 'border-blue-600 bg-blue-50/50 shadow-[0_0_0_1px_#2563eb]' 
              : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <input 
              type="radio" 
              value={opt} 
              {...register("status")} 
              className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-600"
            />
            <span className="ml-3 font-medium text-slate-900">{opt}</span>
          </label>
        ))}
      </div>
      <ErrorMsg name="status" />
    </div>
  );
}

function Step3Education() {
  const { register } = useFormContext<CVData>();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Education</h2>
        <p className="text-slate-500 mt-1">What is your highest level of education?</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="educationType">Degree Type *</Label>
          <select 
            id="educationType"
            {...register("educationType")} 
            className="flex h-9 w-full mt-1 items-center justify-between rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Select a degree type...</option>
            <option value="Matric">Matric / O-Levels</option>
            <option value="Inter">Intermediate / A-Levels</option>
            <option value="Graduate">Graduate / Bachelors</option>
            <option value="Masters">Masters / Post-grad</option>
            <option value="Other">Other</option>
          </select>
          <ErrorMsg name="educationType" />
        </div>
        <div>
          <Label htmlFor="fieldOfStudy">Field of Study *</Label>
          <Input id="fieldOfStudy" {...register("fieldOfStudy")} className="mt-1" placeholder="e.g. Computer Science" />
          <ErrorMsg name="fieldOfStudy" />
        </div>
        <div>
          <Label htmlFor="university">University / Institution *</Label>
          <Input id="university" {...register("university")} className="mt-1" placeholder="e.g. Harvard University" />
          <ErrorMsg name="university" />
        </div>
        <div>
          <Label htmlFor="graduationYear">Graduation Year *</Label>
          <Input id="graduationYear" type="number" {...register("graduationYear")} className="mt-1" placeholder="2024" />
          <ErrorMsg name="graduationYear" />
        </div>
      </div>
    </div>
  );
}

function Step4Experience() {
  const { register } = useFormContext<CVData>();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Experience</h2>
        <p className="text-slate-500 mt-1">Tell us about your most recent role.</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <select 
            id="yearsOfExperience"
            {...register("yearsOfExperience")} 
            className="flex h-9 w-full mt-1 items-center justify-between rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Select experience...</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5-10">5-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" {...register("jobTitle")} className="mt-1" placeholder="e.g. Frontend Developer" />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} className="mt-1" placeholder="e.g. Google" />
        </div>
        <div>
          <Label htmlFor="workDescription">Work Description</Label>
          <Textarea 
            id="workDescription" 
            {...register("workDescription")} 
            className="mt-1 h-32 resize-none" 
            placeholder="Describe your responsibilities and achievements..." 
          />
        </div>
      </div>
    </div>
  );
}

function Step5Skills() {
  const { register, watch, setValue } = useFormContext<CVData>();
  
  const commonSkills = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "UI/UX", "Marketing", "Sales", "Project Management", "Data Analysis"];
  const selectedSkills = watch("primarySkills") || [];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setValue("primarySkills", selectedSkills.filter(s => s !== skill), { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("primarySkills", [...selectedSkills, skill], { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Skills</h2>
        <p className="text-slate-500 mt-1">Highlight your core competencies.</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block">Primary Skills</Label>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    isSelected 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
          <ErrorMsg name="primarySkills" />
        </div>
        
        <div>
          <Label htmlFor="technicalSkills">Technical Details (Comma separated)</Label>
          <Textarea id="technicalSkills" {...register("technicalSkills")} className="mt-1 h-20" placeholder="e.g. AWS, Docker, Kubernetes, CI/CD" />
        </div>
        
        <div>
          <Label htmlFor="softSkills">Soft Skills (Comma separated)</Label>
          <Textarea id="softSkills" {...register("softSkills")} className="mt-1 h-20" placeholder="e.g. Communication, Team Leadership, Problem Solving" />
        </div>
      </div>
    </div>
  );
}

function Step6Additional() {
  const { register, control } = useFormContext<CVData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses"
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Additional Details</h2>
        <p className="text-slate-500 mt-1">Add URLs and extra sections to strengthen your CV.</p>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="portfolioUrl">Portfolio URL</Label>
            <Input id="portfolioUrl" {...register("portfolioUrl")} className="mt-1" placeholder="https://yourportfolio.com" />
          </div>
          <div>
            <Label htmlFor="githubUrl">GitHub / Dribbble URL</Label>
            <Input id="githubUrl" {...register("githubUrl")} className="mt-1" placeholder="https://github.com/..." />
          </div>
        </div>

        <div>
          <Label htmlFor="careerSummary">Career Summary</Label>
          <Textarea id="careerSummary" {...register("careerSummary")} className="mt-1 h-24" placeholder="A brief professional summary about yourself..." />
        </div>

        <div>
          <Label htmlFor="objectives">Career Objective</Label>
          <Textarea id="objectives" {...register("objectives")} className="mt-1 h-20" placeholder="What are you looking to achieve?" />
        </div>

        <div>
          <Label htmlFor="achievements">Key Achievements</Label>
          <Textarea id="achievements" {...register("achievements")} className="mt-1 h-20" placeholder="List notable awards, recognitions..." />
        </div>

        <div>
          <Label htmlFor="activities">Extracurricular Activities</Label>
          <Textarea id="activities" {...register("activities")} className="mt-1 h-20" placeholder="Clubs, volunteering, hobbies..." />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-base font-semibold">Courses & Certifications</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ title: "", institute: "" })} className="h-8 text-xs">
              <Plus className="w-3 h-3 mr-1" /> Add Course
            </Button>
          </div>
          
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex-1 space-y-3">
                  <Input {...register(`courses.${index}.title` as const)} placeholder="Course Title" className="bg-white" />
                  <Input {...register(`courses.${index}.institute` as const)} placeholder="Institute / Platform (e.g. Coursera)" className="bg-white" />
                </div>
                <Button type="button" variant="ghost" onClick={() => remove(index)} className="text-slate-400 hover:text-red-500 px-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {fields.length === 0 && <p className="text-sm text-slate-500 italic">No courses added yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step7Photo() {
  const { setValue, watch } = useFormContext<CVData>();
  const updateData = useCvStore(state => state.updateData);
  const photoUrl = watch("photoUrl");
  const [upImg, setUpImg] = useState<string>();
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(convertToPixelCrop(initialCrop, width, height));
  };

  const formatCrop = (img: HTMLImageElement, c: PixelCrop) => {
    if (!c.width || !c.height) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    
    // Original crop dimensions
    const cropWidth = c.width * scaleX;
    const cropHeight = c.height * scaleY;

    // Cap at 512x512
    const MAX_DIMENSION = 512;
    let targetWidth = cropWidth;
    let targetHeight = cropHeight;

    if (cropWidth > MAX_DIMENSION || cropHeight > MAX_DIMENSION) {
      if (cropWidth > cropHeight) {
        targetWidth = MAX_DIMENSION;
        targetHeight = (cropHeight / cropWidth) * MAX_DIMENSION;
      } else {
        targetHeight = MAX_DIMENSION;
        targetWidth = (cropWidth / cropHeight) * MAX_DIMENSION;
      }
    }
    
    canvas.width = Math.floor(targetWidth);
    canvas.height = Math.floor(targetHeight);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        img,
        c.x * scaleX,
        c.y * scaleY,
        cropWidth,
        cropHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const base64Image = canvas.toDataURL('image/jpeg', 0.95);
      setValue("photoUrl", base64Image, { shouldDirty: true, shouldValidate: true });
      updateData({ photoUrl: base64Image });
    }
  };

  const handleApplyCrop = () => {
    if (imgRef.current && completedCrop?.width && completedCrop?.height) {
      formatCrop(imgRef.current, completedCrop);
      setUpImg(undefined); // dismiss cropper
    } else {
      alert("Please select a crop area first.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Profile Photo</h2>
        <p className="text-slate-500 mt-1">Upload a professional headshot for your CV.</p>
      </div>

      {!upImg ? (
        <div className="mt-8 flex flex-col items-center">
          {photoUrl ? (
            <div className="relative group">
              <Image
                src={photoUrl}
                alt="Profile"
                width={160}
                height={160}
                unoptimized
                className="w-40 h-40 object-cover rounded-full shadow-md border-4 border-white"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Label htmlFor="photo-upload" className="cursor-pointer text-white font-medium text-sm text-center">Change<br/>Photo</Label>
              </div>
            </div>
          ) : (
            <Label htmlFor="photo-upload" className="w-40 h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-full bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-500">Upload Photo</span>
            </Label>
          )}
          <input id="photo-upload" type="file" accept="image/*" onChange={onSelectFile} className="hidden" />
          
          {photoUrl && (
            <Button type="button" variant="ghost" className="mt-4 text-red-500" onClick={() => setValue("photoUrl", "")}>
              Remove Photo
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center">
           <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
          >
            <Image
              ref={imgRef}
              src={upImg}
              alt="Crop me"
              width={400}
              height={400}
              unoptimized
              onLoad={onImageLoad}
              className="max-h-[400px] w-auto bg-slate-900 rounded-lg"
            />
          </ReactCrop>
          <div className="mt-6 flex gap-3">
             <Button type="button" variant="outline" onClick={() => setUpImg(undefined)}>Cancel</Button>
             <Button type="button" onClick={handleApplyCrop}><CropIcon className="w-4 h-4 mr-2"/> Crop & Save</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Step8Template() {
  const { watch, setValue } = useFormContext<CVData>();
  const updateData = useCvStore(state => state.updateData);
  const templateId = watch("templateId");

  const templates = [
    { id: "modern", name: "Modern Corporate", color: "bg-blue-600" },
    { id: "minimal", name: "ATS Minimal", color: "bg-slate-800" },
    { id: "creative", name: "Creative Designer", color: "bg-pink-500" },
    { id: "executive", name: "Executive Premium", color: "bg-indigo-700" },
    { id: "student", name: "Student Fresh", color: "bg-emerald-500" }
  ];

  const handleSelectTemplate = (id: string) => {
    setValue("templateId", id, { shouldDirty: true, shouldValidate: true });
    updateData({ templateId: id });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-poppins text-slate-900">Choose Template</h2>
        <p className="text-slate-500 mt-1">Select a design for your CV. (Preview updates instantly)</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {templates.map(tpl => (
          <div 
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl.id)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all group ${
              templateId === tpl.id ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-md' : 'border-slate-200 hover:border-blue-300 shadow-sm'
            }`}
          >
            <div className={`p-6 border-b text-center text-white ${tpl.color}`}>
              <LayoutTemplate className="w-8 h-8 opacity-80 mx-auto" />
            </div>
            <div className={`p-4 font-medium text-center text-sm ${templateId === tpl.id ? 'bg-blue-50 text-blue-700' : 'bg-white text-slate-700 group-hover:bg-slate-50'}`}>
              {tpl.name}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile inline preview */}
      <div className="lg:hidden w-full bg-slate-100 p-4 rounded-xl mt-6 border flex justify-center">
        <div className="relative aspect-[210/297] w-full max-w-[400px] overflow-hidden bg-white shadow-sm rounded-md border border-slate-200" style={{ transform: 'translateZ(0)' }}>
          <AutoScale width={794} height={1123} className="pointer-events-none">
             <Preview />
          </AutoScale>
        </div>
      </div>
    </div>
  );
}

export function Step9Review({ isSubmitting }: { isSubmitting: boolean }) {
  const { setStep } = useCvStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('pdf-export-container');
      if (element) {
        const opt: any = {
          margin:       0,
          filename:     'My_CV.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
          jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center text-center py-6 md:py-12">
      {/* Hidden export container - strictly 794x1123 unscaled for pixel-perfect PDF rendering */}
      <div className="overflow-hidden h-0 w-0 absolute pointer-events-none opacity-0">
        <div id="pdf-export-container" className="w-[794px] h-[1123px] bg-white origin-top-left">
           <Preview />
        </div>
      </div>

      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold font-poppins text-slate-900">You&apos;re All Set!</h2>
      <p className="text-slate-500 max-w-sm">
        Your CV is ready and looks great. Review the live preview, download as PDF, or submit the data to your records.
      </p>

      {/* Mobile inline preview */}
      <div className="lg:hidden w-full bg-slate-100 p-4 rounded-xl mt-6 border flex justify-center">
        <div className="relative aspect-[210/297] w-full max-w-[400px] overflow-hidden bg-white shadow-sm rounded-md border border-slate-200" style={{ transform: 'translateZ(0)' }}>
          <AutoScale width={794} height={1123} className="pointer-events-none">
             <Preview />
          </AutoScale>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
        <Button type="button" onClick={() => setStep(1)} variant="outline" className="h-11 px-6">
          Edit Details
        </Button>
        <Button type="button" onClick={handleDownload} disabled={isGenerating} className="h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white">
          <Download className="w-4 h-4 mr-2" /> {isGenerating ? 'Generating...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
}
