import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const OnboardingDataContext = createContext(null);

export function OnboardingDataProvider({ children }) {
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState(null);
  const [journeyStage, setJourneyStage] = useState(null);
  /** Hamilelik: tahmini doğum (YYYY-MM-DD), onboarding → kayıt / metadata. */
  const [pregnancyDueDate, setPregnancyDueDate] = useState(null);

  const reset = useCallback(() => {
    setDisplayName('');
    setRole(null);
    setJourneyStage(null);
    setPregnancyDueDate(null);
  }, []);

  const value = useMemo(
    () => ({
      displayName,
      setDisplayName,
      role,
      setRole,
      journeyStage,
      setJourneyStage,
      pregnancyDueDate,
      setPregnancyDueDate,
      reset,
    }),
    [displayName, role, journeyStage, pregnancyDueDate, reset]
  );

  return <OnboardingDataContext.Provider value={value}>{children}</OnboardingDataContext.Provider>;
}

export function useOnboardingData() {
  const ctx = useContext(OnboardingDataContext);
  if (!ctx) {
    throw new Error('useOnboardingData: OnboardingDataProvider gerekli');
  }
  return ctx;
}
