import { useState } from 'react';

import { DietStudyResponse } from '@covid/core/diet-study/dto/DietStudyResponse';
import dietStudyCoordinator, { LAST_4_WEEKS } from '@covid/core/diet-study/DietStudyCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { IDietStudyRemoteClient } from '@covid/core/diet-study/DietStudyApiClient';
import { Services } from '@covid/provider/services.types';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import i18n from '@covid/locale/i18n';

import { ScreenParamList } from '../ScreenParamList';

type FormSubmitApiCall = (infos: DietStudyRequest | Partial<DietStudyRequest>) => Promise<DietStudyResponse>;

type DietStudyFormSubmitHook = {
  submitting: boolean;
  errorMessage: string;
  submitDietStudy: FormSubmitApiCall;
};

export const useDietStudyFormSubmit = (next: keyof ScreenParamList): DietStudyFormSubmitHook => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const apiClient = useInjection<IDietStudyRemoteClient>(Services.DietStudy);

  const isCurrentTimePeriod = (): boolean => {
    const { timePeriod } = dietStudyCoordinator.dietStudyData;
    return timePeriod === LAST_4_WEEKS;
  };

  const getStudyId = (): string | undefined => {
    const { recentDietStudyId, febDietStudyId } = dietStudyCoordinator.dietStudyData;
    return isCurrentTimePeriod() ? recentDietStudyId : febDietStudyId;
  };

  const saveStudyIdInDietCoordinator = (id: string) => {
    if (isCurrentTimePeriod()) {
      dietStudyCoordinator.dietStudyData.recentDietStudyId = id;
    } else {
      dietStudyCoordinator.dietStudyData.febDietStudyId = id;
    }
  };

  const submitDietStudy = async (infos: DietStudyRequest | Partial<DietStudyRequest>): Promise<DietStudyResponse> => {
    try {
      setSubmitting(true);
      let response: DietStudyResponse;

      const studyId = getStudyId();
      if (studyId) {
        response = await apiClient.updateDietStudy(studyId, infos);
      } else {
        const { patientId } = dietStudyCoordinator.dietStudyData.patientData;
        response = await apiClient.addDietStudy(patientId, infos as DietStudyRequest);
      }

      saveStudyIdInDietCoordinator(response.id);

      return response;
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    submitting,
    errorMessage,
    submitDietStudy,
  };
};
