import * as React from 'react';

export type TStateOnboarding = {
  studyHubInterestOverlay: {
    iconXValue?: number;
    iconYValue?: number;
    show: boolean;
    renderIcon?: () => React.ReactElement;
  };
};

export type TShowStudyHubInterestOverlayAction = {
  iconXValue: number;
  iconYValue: number;
  renderIcon?: () => React.ReactElement;
};
