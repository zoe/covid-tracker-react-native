import { AppException } from '@covid/core/api/ApiServiceErrors';
import { patientService } from '@covid/core/patient/PatientService';
import { Profile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/Services';
import { useState } from 'react';

export const useProfileList = () => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<AppException | null>(null);
  const [isApiError, setIsApiError] = useState<boolean>(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const retryListProfiles = () => {
    setStatus(i18n.t('errors.status-retrying'));
    setError(null);
    setTimeout(() => listProfiles(), offlineService.getRetryDelay());
  };

  const listProfiles = async () => {
    setStatus(i18n.t('errors.status-loading'));
    setError(null);

    try {
      const profiles = await patientService.listProfiles();
      if (profiles) {
        setProfiles(profiles);
        setIsLoaded(true);
      }
    } catch (error) {
      setError(error);
    }
  };

  return {
    error,
    isApiError,
    isLoaded,
    listProfiles,
    profiles,
    retryListProfiles,
    setError,
    setIsApiError,
    status,
  };
};
