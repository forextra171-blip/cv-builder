'use client';

import { useCvStore } from "@/store/useCvStore";
import { ModernCorporate, AtsMinimal, CreativeDesigner, ExecutivePremium, StudentFresh } from "./templates";

export default function Preview() {
  const data = useCvStore(state => state.data);

  // Map template IDs to components
  const getTemplate = () => {
    switch (data.templateId) {
      case 'modern': return <ModernCorporate data={data as any} />;
      case 'minimal': return <AtsMinimal data={data as any} />;
      case 'creative': return <CreativeDesigner data={data as any} />;
      case 'executive': return <ExecutivePremium data={data as any} />;
      case 'student': return <StudentFresh data={data as any} />;
      default: return <ModernCorporate data={data as any} />;
    }
  };

  return (
    <div id="cv-preview-container" className="w-full h-full bg-white relative overflow-hidden">
      {getTemplate()}
    </div>
  );
}
