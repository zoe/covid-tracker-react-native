import * as React from 'react';

export const OnboardingContext = React.createContext({
  closeProfileTabOnboarding: () => {},
  closeStudyTabOnboarding: () => {},
  showProfileTabOnboarding: false,
  showStudyTabOnboarding: false,
});
