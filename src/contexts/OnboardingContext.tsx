import { createContext, useContext, useState, type ReactNode } from "react";

interface OnboardingData {
  businessName: string;
  email: string;
  phone: string;
  city: string;
  sector: string;
  goals: string[];
}

interface OnboardingContextType {
  data: OnboardingData;
  setData: (d: Partial<OnboardingData>) => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<OnboardingData>({
    businessName: "",
    email: "",
    phone: "",
    city: "",
    sector: "",
    goals: [],
  });

  const setData = (d: Partial<OnboardingData>) => setDataState(prev => ({ ...prev, ...d }));

  return (
    <OnboardingContext.Provider value={{ data, setData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
};
