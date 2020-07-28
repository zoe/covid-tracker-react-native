import { useState } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { AppException } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { Services } from '@covid/provider/services.types';
import { useInjection } from '@covid/provider/services.hooks';
import { Profile } from '@covid/components/Collections/ProfileList';
import { IPatientService } from '@covid/core/patient/PatientService';

import { ScreenParamList } from '../ScreenParamList';
import appCoordinator from '../AppCoordinator';

export const useProfileList = (navigation: DrawerNavigationProp<ScreenParamList, 'SelectProfile'>) => {
  const patientService = useInjection<IPatientService>(Services.Patient);

  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<AppException | null>(null);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [onRetry, setOnRetry] = useState<any>(() => {});

  const retryListProfiles = () => {
    setStatus(i18n.t('errors.status-retrying'));
    setError(null);
    setTimeout(() => listProfiles(), offlineService.getRetryDelay());
  };

  const listProfiles = async () => {
    setStatus(i18n.t('errors.status-loading'));
    setError(null);

    try {
      const profiles = await patientService.listPatients();
      if (profiles) {
        setProfiles(profiles);
        setIsLoaded(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  const profileSelected = async (profileId: string, index: number) => {
    try {
      const currentPatient = await patientService.getPatientState(profileId);
      setIsApiError(false);
      await appCoordinator.profileSelected(index === 0, currentPatient);
    } catch (error) {
      setIsApiError(true);
      setError(error);

      setOnRetry(() => {
        setStatus(i18n.t('errors.status-retrying'));
        setError(null);

        setTimeout(() => {
          setStatus(i18n.t('errors.status-loading'));
          profileSelected(profileId, index);
        }, offlineService.getRetryDelay());
      });
    }
  };

  return {
    status,
    error,
    isApiError,
    isLoaded,
    onRetry,
    profiles,
    listProfiles,
    retryListProfiles,
    profileSelected,
    setIsApiError,
  };
};
