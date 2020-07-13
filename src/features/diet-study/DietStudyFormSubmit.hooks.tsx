import { useState } from 'react';

import { DietStudyResponse } from '@covid/core/diet-study/dto/DietStudyResponse';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { useInjection } from '@covid/provider/services.hooks';
import { IDietStudyRemoteClient } from '@covid/core/diet-study/DietStudyApiClient';
import { Services } from '@covid/provider/services.types';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import i18n from '@covid/locale/i18n';

import { ScreenParamList } from '../ScreenParamList';

type FormSubmitApiCall = (
  infos: DietStudyRequest | Partial<DietStudyRequest>,
  entryId?: string
) => Promise<DietStudyResponse>;

type DietStudyFormSubmitHook = {
  submitting: boolean;
  errorMessage: string;
  submitDietStudy: FormSubmitApiCall;
};

export const useDietStudyFormSubmit = (next: keyof ScreenParamList): DietStudyFormSubmitHook => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const apiClient = useInjection<IDietStudyRemoteClient>(Services.DietStudy);

  const submitDietStudy = async (infos: DietStudyRequest | Partial<DietStudyRequest>): Promise<DietStudyResponse> => {
    console.log(infos);
    try {
      const studyId = dietStudyCoordinator.dietStudyData.recentDietStudyId;
      let response: DietStudyResponse;

      if (studyId) {
        response = await apiClient.updateDietStudy(studyId, infos);
      } else {
        response = await apiClient.addDietStudy(
          dietStudyCoordinator.dietStudyData.currentPatient.patientId,
          infos as DietStudyRequest
        );
      }

      dietStudyCoordinator.dietStudyData.recentDietStudyId = response.id;
      dietStudyCoordinator.gotoNextScreen(next);

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
