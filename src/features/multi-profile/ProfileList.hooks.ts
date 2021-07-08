import { AppException } from '@covid/core/api/ApiServiceErrors';
import { patientService } from '@covid/core/patient/PatientService';
import { Profile } from '@covid/core/profile/ProfileService';
import i18n from '@covid/locale/i18n';
import { offlineService } from '@covid/services';
import * as React from 'react';

export const useProfileList = () => {
  const [status, setStatus] = React.useState<string>('');
  const [error, setError] = React.useState<AppException | null>(null);
  const [isApiError, setIsApiError] = React.useState<boolean>(false);

  const [profiles, setProfiles] = React.useState<Profile[]>([]);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

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
