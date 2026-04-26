import { create } from 'zustand';
import { CVData, defaultValues } from '@/lib/schema';

interface CvStore {
  data: Partial<CVData>;
  updateData: (newData: Partial<CVData>) => void;
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useCvStore = create<CvStore>((set) => ({
  data: { ...defaultValues },
  updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
  currentStep: 1,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 9) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  reset: () => set({ data: { ...defaultValues }, currentStep: 1 }),
}));
