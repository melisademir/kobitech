import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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

const OB_KEY = "kobitech-onboarding";

const defaultData: OnboardingData = { businessName: "", email: "", phone: "", city: "", sector: "", goals: [] };

const loadData = (): OnboardingData => {
  try {
    const raw = localStorage.getItem(OB_KEY);
    return raw ? { ...defaultData, ...JSON.parse(raw) } : defaultData;
  } catch { return defaultData; }
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setDataState] = useState<OnboardingData>(loadData);

  useEffect(() => {
    localStorage.setItem(OB_KEY, JSON.stringify(data));
  }, [data]);

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
