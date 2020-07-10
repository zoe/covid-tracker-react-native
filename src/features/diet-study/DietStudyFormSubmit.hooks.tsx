import { useState } from 'react';

import { DietStudyResponse } from '@covid/core/diet-study/dto/DietStudyResponse';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import { dietStudyApiClient } from '@covid/Services';
import i18n from '@covid/locale/i18n';

import { ScreenParamList } from '../ScreenParamList';

type FormSubmitApiCall = <Dto>(infos: Partial<Dto>, entryId?: string) => Promise<DietStudyResponse>;

type DietStudyFormSubmitHook = {
  submitting: boolean;
  errorMessage: string;
  submitDietStudy: FormSubmitApiCall;
};

export const useDietStudyFormSubmit = (next: keyof ScreenParamList): DietStudyFormSubmitHook => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const submitDietStudy = async <Dto extends any>(infos: Partial<Dto>): Promise<DietStudyResponse> => {
    console.log(infos);
    try {
      const studyId = dietStudyCoordinator.dietStudyData.recentDietStudyId;
      let response: DietStudyResponse;

      if (studyId) {
        response = await dietStudyApiClient.updateDietStudy(studyId, infos);
      } else {
        response = await dietStudyApiClient.addDietStudy(
          dietStudyCoordinator.dietStudyData.currentPatient.patientId,
          infos
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
