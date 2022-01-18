import { patientService } from '@covid/core/patient/PatientService';
import { updateShowStudyHubInterestOnboarding } from '@covid/core/state';
import { onboardingActions } from '@covid/core/state/onboarding/slice';
import { TRootState } from '@covid/core/state/root';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function useHideStudyHubInterestOverlay() {
  const dispatch = useDispatch();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);

  return React.useCallback(async () => {
    dispatch(onboardingActions.hideStudyHubInterestOverlay());

    dispatch(updateShowStudyHubInterestOnboarding(false));

    try {
      await patientService.updatePatientInfo(patientId, {
        has_seen_study_hub_interest_onboarding: true,
      });
    } catch (_) {}
  }, [dispatch, patientId]);
}
