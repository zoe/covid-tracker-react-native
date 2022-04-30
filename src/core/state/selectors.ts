import { TRootState } from '@covid/core/state/root';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';

const WIDER_HEALTH_CONSENT_NEW_JOINERS_DATE = new Date('2021-09-14T21:00:00+00:00');

export function selectStartupInfo(state: TRootState): TStartupInfo | undefined {
  if (state.content.startupInfo?.is_tester) {
    return {
      ...state.content.startupInfo,
      ...(state.testingMode.startupInfo || {}),
    };
  }
  return state.content.startupInfo;
}

export function selectCanOptOutOfWiderHealthStudies(state: TRootState): boolean {
  return !!(
    state.content.startupInfo?.wider_health_studies_consent &&
    state.content.startupInfo?.primary_patient_date_joined &&
    new Date(state.content.startupInfo?.primary_patient_date_joined) < WIDER_HEALTH_CONSENT_NEW_JOINERS_DATE
  );
}

export function selectCanOptInOfWiderHealthStudies(state: TRootState): boolean {
  return !!(
    !state.content.startupInfo?.wider_health_studies_consent &&
    state.content.startupInfo?.primary_patient_date_joined &&
    new Date(state.content.startupInfo?.primary_patient_date_joined) < WIDER_HEALTH_CONSENT_NEW_JOINERS_DATE
  );
}
