'use client';

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui";
import { ChevronRight, FileText, Star } from "lucide-react";
import { ModernCorporate, AtsMinimal, CreativeDesigner, ExecutivePremium, StudentFresh } from "@/components/builder/templates";
import { AutoScale } from "@/components/builder/AutoScale";

const MOCK_DATA: any = {
  fullName: "Alex Rivera",
  email: "alex@example.com",
  phone: "+1 415 555 0198",
  linkedIn: "linkedin.com/in/arivera",
  city: "San Francisco, CA",
  jobTitle: "Senior Designer",
  company: "InnovateTech",
  workDescription: "• Spearheaded the redesign of the flagship mobile app, leading to a 40% increase in user engagement.\n• Conducted A/B testing and user research to iterate on core features.\n• Mentored cross-functional teams on accessibility standards.",
  yearsOfExperience: "3-5",
  primarySkills: ["React", "UI/UX", "Figma", "Prototyping"],
  technicalSkills: "HTML/CSS, Node.js",
  softSkills: "Leadership, Agile",
  educationType: "Masters",
  fieldOfStudy: "Human-Computer Interaction",
  university: "Stanford University",
  graduationYear: "2021",
  careerSummary: "Detail-oriented UX/UI Designer and Front-End Developer with a passion for creating accessible and delightful user experiences.",
  courses: [
    { title: "Advanced UI/UX patterns", institute: "DesignLab" }
  ],
  achievements: "• Best Mobile Design 2022\n• Published 3 articles in Smashing Magazine"
};

export default function LandingPage() {
  const templates = [
    { id: 1, name: "Modern Corporate", color: "from-blue-500 to-cyan-500", component: <ModernCorporate data={MOCK_DATA} /> },
    { id: 2, name: "ATS Minimal", color: "from-slate-500 to-slate-700", component: <AtsMinimal data={MOCK_DATA} /> },
    { id: 3, name: "Creative Designer", color: "from-pink-500 to-rose-500", component: <CreativeDesigner data={MOCK_DATA} /> },
    { id: 4, name: "Executive Premium", color: "from-indigo-600 to-purple-800", component: <ExecutivePremium data={MOCK_DATA} /> },
    { id: 5, name: "Student Fresh", color: "from-emerald-400 to-teal-500", component: <StudentFresh data={MOCK_DATA} /> }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Dark Cinematic Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10 w-full">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#0F172A] -z-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full -z-10"></div>
        
        <div className="container mx-auto px-4 relative flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300 md:mb-6 mb-4 backdrop-blur-md"
          >
            <Star className="mr-2 h-4 w-4 text-amber-500" />
            <span>The #1 Resume Builder for Professionals</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl"
          >
            Create Your Winning CV in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Minutes.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light"
          >
            Stand out from the crowd with our professional, ATS-friendly templates. No signup required. Completely free.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/builder">
              <Button className="h-14 px-8 text-lg font-medium rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-105 border border-blue-400/50">
                Build My CV Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="py-20 md:py-32 relative bg-slate-950/50 backdrop-blur-3xl border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-white mb-4">5 Professional Templates</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Designed by HR experts. Choose the perfect layout for your industry and experience level.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto">
            {templates.map((tpl, idx) => (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] group cursor-pointer"
              >
                <div className="relative aspect-[210/297] rounded-2xl overflow-hidden bg-white border border-slate-800 p-0 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-slate-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <AutoScale width={794} height={1123}>
                    {tpl.component}
                  </AutoScale>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                    <FileText className="w-10 h-10 text-white mb-3" />
                     <Link href="/builder">
                       <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-blue-900 rounded-full px-6">
                         Use Template
                       </Button>
                     </Link>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-poppins font-medium text-slate-200 group-hover:text-white transition-colors">{tpl.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-center text-slate-500">
        <div className="container mx-auto px-4 flex flex-col items-center">
           <h3 className="font-poppins font-bold text-xl text-slate-300 mb-2">CV BUILDER</h3>
           <p className="text-sm">Build, Download, Succeed. The modern way to create your resume.</p>
        </div>
      </footer>
    </div>
  );
}
