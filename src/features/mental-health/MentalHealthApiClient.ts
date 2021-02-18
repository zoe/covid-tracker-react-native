import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';
import {
  IMentalHealthChanges,
  IMentalHealthFrequency,
  IMentalHealthHistory,
  IMentalHealthLearning,
} from '@covid/core/state';
import { IMentalHealthSupport } from '@covid/core/state/mental-health/support/types';

import { MentalHealthInfosRequest } from './MentalHealthInfosRequest';

const API_URL = '/mental_health/';

export interface IMentalHealthApiClient {
  get(id: any): Promise<MentalHealthInfosRequest[]>;
  add(patientId: string, mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest>;
  update(mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest>;
}

export interface IMentalHealthApiClientBuildRequest {
  mentalHealthChanges?: IMentalHealthChanges;
  mentalHealthFrequency?: IMentalHealthFrequency;
  mentalHealthHistory?: IMentalHealthHistory;
  mentalHealthLearning?: IMentalHealthLearning;
  mentalHealthSupport?: IMentalHealthSupport;
}

@injectable()
export class MentalHealthApiClient implements IMentalHealthApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<MentalHealthInfosRequest[]> {
    return this.apiClient.get<MentalHealthInfosRequest[]>(API_URL);
  }

  add(patientId: string, mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest> {
    mentalHealth = {
      patient: patientId,
      ...mentalHealth,
    };
    return this.apiClient.post<MentalHealthInfosRequest, MentalHealthInfosRequest>(API_URL, mentalHealth);
  }

  update(mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest> {
    const url = `${API_URL}${mentalHealth.id}/`;
    return this.apiClient.patch<MentalHealthInfosRequest, MentalHealthInfosRequest>(url, mentalHealth);
  }

  buildRequestObject(
    existingMentalHealth: MentalHealthInfosRequest,
    data: IMentalHealthApiClientBuildRequest
  ): MentalHealthInfosRequest {
    let updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id,
      patient: existingMentalHealth.patient,
    };

    if (data.mentalHealthChanges) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        using_devices_with_a_screen: data.mentalHealthChanges.devicesWithScreen,
        drinking_alcohol: data.mentalHealthChanges.drinkingAlcohol,
        engaging_in_orgs_clubs_socs: data.mentalHealthChanges.engagingWithOrganisations,
        feeling_more_alone: data.mentalHealthChanges.feelingAlone,
        spending_time_in_green_spaces: data.mentalHealthChanges.greenSpaces,
        interacting_face_to_face_with_family_friends: data.mentalHealthChanges.interactingFaceToFace,
        talking_to_family_friends_via_phone_or_technology: data.mentalHealthChanges.interactingViaPhoneOrTechnology,
        being_physically_active_or_doing_exercise: data.mentalHealthChanges.physical,
        reading_watching_listening_to_the_news: data.mentalHealthChanges.readingWatchingListeningNews,
        relaxation_mindfulness_meditation: data.mentalHealthChanges.relaxation,
        sleeping_well: data.mentalHealthChanges.sleep,
        smoking_or_vaping: data.mentalHealthChanges.smokingOrVaping,
        eating_savoury_snacks_or_confectionery: data.mentalHealthChanges.snacks,
        working: data.mentalHealthChanges.working,
        spending_time_with_pets: data.mentalHealthChanges.timeWithPets,
      };
    }

    if (data.mentalHealthFrequency) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        little_interest_or_pleasure_in_doing_things: data.mentalHealthFrequency.pleasureInDoingThings,
        feeling_down: data.mentalHealthFrequency.feelingDown,
        feeling_nervous: data.mentalHealthFrequency.feelingNervous,
        not_being_able_to_control_worrying: data.mentalHealthFrequency.stopWorrying,
      };
    }

    if (data.mentalHealthHistory) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        ever_diagnosed_with_mental_health_condition: data.mentalHealthHistory.hasDiagnosis,
        generalised_anxiety_disorder: data.mentalHealthHistory.conditions.includes('GAD'),
        panic: data.mentalHealthHistory.conditions.includes('PANIC_DISORDER'),
        specific_phobias: data.mentalHealthHistory.conditions.includes('SPECIFIC_PHOBIAS'),
        ocd: data.mentalHealthHistory.conditions.includes('OCD'),
        ptsd: data.mentalHealthHistory.conditions.includes('PTSD'),
        social_anxiety: data.mentalHealthHistory.conditions.includes('SOCIAL_ANXIETY_DISORDER'),
        agoraphobia: data.mentalHealthHistory.conditions.includes('AGORAPHOBIA'),
        depression: data.mentalHealthHistory.conditions.includes('DEPRESSION'),
        add_adhd: data.mentalHealthHistory.conditions.includes('ADD_ADHD'),
        autism: data.mentalHealthHistory.conditions.includes('AUTISTIC_SPECTRUM_DISORDER'),
        eating: data.mentalHealthHistory.conditions.includes('EATING_DISORDER'),
        personality: data.mentalHealthHistory.conditions.includes('PERSONALITY_DISORDER'),
        mania_hypomania_bipolar_manic_depression: data.mentalHealthHistory.conditions.includes('MANIA'),
        schizophrenia: data.mentalHealthHistory.conditions.includes('SCHIZOPHRENIA'),
        substance_use: data.mentalHealthHistory.conditions.includes('SUBSTANCE_USE_DISORDER'),
        psychosis_or_psychotic_illness: data.mentalHealthHistory.conditions.includes('TYPE_OF_PSYCHOSIS'),
        history_other: data.mentalHealthHistory.conditions.includes('OTHER'),
        history_prefer_not_to_say: data.mentalHealthHistory.conditions.includes('DECLINE_TO_SAY'),
      };
    }

    if (data.mentalHealthLearning) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        about_your_learning_needs: data.mentalHealthLearning.hasDisability,
        dyslexia: data.mentalHealthLearning.conditions.includes('DYSLEXIA'),
        dyscalculia: data.mentalHealthLearning.conditions.includes('DYSCALCULIA'),
        dysgraphia: data.mentalHealthLearning.conditions.includes('DYSGRAPHIA'),
        non_verbal: data.mentalHealthLearning.conditions.includes('NON-VERBAL'),
        oral: data.mentalHealthLearning.conditions.includes('ORAL_WRITTEN'),
        sensory_impairment: data.mentalHealthLearning.conditions.includes('SENSORY'),
        learning_other: data.mentalHealthLearning.conditions.includes('OTHER'),
        learning_prefer_not_to_say: data.mentalHealthLearning.conditions.includes('DECLINE_TO_SAY'),
      };
    }

    if (data.mentalHealthSupport) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        needed_support_in_the_last_6_months: data.mentalHealthSupport.hasNeededSupport,
        able_to_get_support: data.mentalHealthSupport.hasReceivedSupport,
      };
    }

    return updatedMentalHealth;
  }
}
