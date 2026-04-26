'use client';

import { useCvStore } from "@/store/useCvStore";
import FormSteps from "@/components/builder/FormSteps";
import Preview from "@/components/builder/Preview";
import { AutoScale } from "@/components/builder/AutoScale";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvSchema, CVData } from "@/lib/schema";
import { useEffect } from "react";

export default function BuilderPage() {
  const { data, updateData, currentStep } = useCvStore();

  const methods = useForm<CVData>({
    resolver: zodResolver(cvSchema),
    defaultValues: data as CVData,
    mode: "onChange"
  });

  const watchedValues = useWatch({ control: methods.control });

  // Keep store synced with form values for the live preview.
  useEffect(() => {
    updateData(watchedValues as Partial<CVData>);
  }, [watchedValues, updateData]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      <header className="flex-none h-14 bg-white border-b px-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="font-poppins font-semibold text-lg tracking-tight text-slate-900">
            CV<span className="text-blue-600">BUILDER</span>
          </h1>
        </div>
        <div className="text-sm font-medium text-slate-500">
          Step {currentStep} of 9
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <FormProvider {...methods}>
          {/* Left pane - Form */}
          <section className="w-full lg:w-1/2 flex flex-col h-full overflow-y-auto border-r border-slate-200 bg-white shadow-[2px_0_10px_rgba(0,0,0,0.02)] relative z-0">
            <div className="w-full max-w-xl mx-auto p-6 md:p-8 flex-1">
               <FormSteps />
            </div>
          </section>
        </FormProvider>

        {/* Right pane - Live Preview */}
        <section className="hidden lg:flex w-1/2 h-full bg-slate-100 overflow-y-auto items-start justify-center p-8">
          <div className="relative aspect-[210/297] w-full max-w-[794px] bg-white shadow-lg shrink-0 box-content">
            <AutoScale width={794} height={1123}>
              <Preview />
            </AutoScale>
          </div>
        </section>
      </main>
    </div>
  );
}
