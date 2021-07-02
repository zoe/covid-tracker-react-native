import ApiClient from '@covid/core/api/ApiClient';
import {
  IMentalHealthChanges,
  IMentalHealthFrequency,
  IMentalHealthHistory,
  IMentalHealthLearning,
} from '@covid/core/state';
import { IMentalHealthSupport } from '@covid/core/state/mental-health/support/types';
import { IMHInsights } from '@covid/features/mental-health-playback/types';

import { MentalHealthInfosRequest } from './MentalHealthInfosRequest';

const PATH = '/mental_health/';

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

const apiClient = new ApiClient();

export class MentalHealthApiClient implements IMentalHealthApiClient {
  get() {
    return apiClient.get<MentalHealthInfosRequest[]>(PATH);
  }

  getInsights() {
    return apiClient.get<IMHInsights>('/mental_health_insight/');
  }

  feedback(rating: number, comments: string) {
    return apiClient.post('/feedback/', {
      comments,
      feature: 'mental_health_insights',
      rating,
    });
  }

  add(patientId: string, mentalHealth: MentalHealthInfosRequest) {
    mentalHealth = {
      patient: patientId,
      ...mentalHealth,
    };
    return apiClient.post<MentalHealthInfosRequest, MentalHealthInfosRequest>(PATH, mentalHealth);
  }

  update(mentalHealth: MentalHealthInfosRequest) {
    const url = `${PATH}${mentalHealth.id}/`;
    return apiClient.patch<MentalHealthInfosRequest, MentalHealthInfosRequest>(url, mentalHealth);
  }

  buildRequestObject(existingMentalHealth: MentalHealthInfosRequest, data: IMentalHealthApiClientBuildRequest) {
    let updatedMentalHealth: MentalHealthInfosRequest = {
      id: existingMentalHealth.id,
      patient: existingMentalHealth.patient,
    };

    if (data.mentalHealthChanges) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        being_physically_active_or_doing_exercise: data.mentalHealthChanges.physical,
        drinking_alcohol: data.mentalHealthChanges.drinkingAlcohol,
        eating_savoury_snacks_or_confectionery: data.mentalHealthChanges.snacks,
        engaging_in_orgs_clubs_socs: data.mentalHealthChanges.engagingWithOrganisations,
        feeling_more_alone: data.mentalHealthChanges.feelingAlone,
        interacting_face_to_face_with_family_friends: data.mentalHealthChanges.interactingFaceToFace,
        reading_watching_listening_to_the_news: data.mentalHealthChanges.readingWatchingListeningNews,
        relaxation_mindfulness_meditation: data.mentalHealthChanges.relaxation,
        sleeping_well: data.mentalHealthChanges.sleep,
        smoking_or_vaping: data.mentalHealthChanges.smokingOrVaping,
        spending_time_in_green_spaces: data.mentalHealthChanges.greenSpaces,
        spending_time_with_pets: data.mentalHealthChanges.timeWithPets,
        talking_to_family_friends_via_phone_or_technology: data.mentalHealthChanges.interactingViaPhoneOrTechnology,
        using_devices_with_a_screen: data.mentalHealthChanges.devicesWithScreen,
        working: data.mentalHealthChanges.working,
      };
    }

    if (data.mentalHealthFrequency) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        feeling_down: data.mentalHealthFrequency.feelingDown,
        feeling_nervous: data.mentalHealthFrequency.feelingNervous,
        little_interest_or_pleasure_in_doing_things: data.mentalHealthFrequency.pleasureInDoingThings,
        not_being_able_to_control_worrying: data.mentalHealthFrequency.stopWorrying,
      };
    }

    if (data.mentalHealthHistory) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        add_adhd: data.mentalHealthHistory.conditions.includes('ADD_ADHD'),
        agoraphobia: data.mentalHealthHistory.conditions.includes('AGORAPHOBIA'),
        autism: data.mentalHealthHistory.conditions.includes('AUTISTIC_SPECTRUM_DISORDER'),
        depression: data.mentalHealthHistory.conditions.includes('DEPRESSION'),
        eating: data.mentalHealthHistory.conditions.includes('EATING_DISORDER'),
        ever_diagnosed_with_mental_health_condition: data.mentalHealthHistory.hasDiagnosis,
        generalised_anxiety_disorder: data.mentalHealthHistory.conditions.includes('GAD'),
        history_other: data.mentalHealthHistory.conditions.includes('OTHER'),
        history_other_text: data.mentalHealthHistory.otherText,
        history_prefer_not_to_say: data.mentalHealthHistory.conditions.includes('DECLINE_TO_SAY'),
        mania_hypomania_bipolar_manic_depression: data.mentalHealthHistory.conditions.includes('MANIA'),
        ocd: data.mentalHealthHistory.conditions.includes('OCD'),
        panic: data.mentalHealthHistory.conditions.includes('PANIC_DISORDER'),
        personality: data.mentalHealthHistory.conditions.includes('PERSONALITY_DISORDER'),
        psychosis_or_psychotic_illness: data.mentalHealthHistory.conditions.includes('TYPE_OF_PSYCHOSIS'),
        ptsd: data.mentalHealthHistory.conditions.includes('PTSD'),
        schizophrenia: data.mentalHealthHistory.conditions.includes('SCHIZOPHRENIA'),
        social_anxiety: data.mentalHealthHistory.conditions.includes('SOCIAL_ANXIETY_DISORDER'),
        specific_phobias: data.mentalHealthHistory.conditions.includes('SPECIFIC_PHOBIAS'),
        substance_use: data.mentalHealthHistory.conditions.includes('SUBSTANCE_USE_DISORDER'),
      };
    }

    if (data.mentalHealthLearning) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        about_your_learning_needs: data.mentalHealthLearning.hasDisability,
        dyscalculia: data.mentalHealthLearning.conditions.includes('DYSCALCULIA'),
        dysgraphia: data.mentalHealthLearning.conditions.includes('DYSGRAPHIA'),
        dyslexia: data.mentalHealthLearning.conditions.includes('DYSLEXIA'),
        learning_other: data.mentalHealthLearning.conditions.includes('OTHER'),
        learning_other_text: data.mentalHealthLearning.otherText,
        learning_prefer_not_to_say: data.mentalHealthLearning.conditions.includes('DECLINE_TO_SAY'),
        non_verbal: data.mentalHealthLearning.conditions.includes('NON-VERBAL'),
        oral: data.mentalHealthLearning.conditions.includes('ORAL_WRITTEN'),
        sensory_impairment: data.mentalHealthLearning.conditions.includes('SENSORY'),
      };
    }

    if (data.mentalHealthSupport) {
      updatedMentalHealth = {
        ...updatedMentalHealth,
        able_to_get_support: data.mentalHealthSupport.hasReceivedSupport,
        needed_support_in_the_last_6_months: data.mentalHealthSupport.hasNeededSupport,
      };
    }

    return updatedMentalHealth;
  }
}
