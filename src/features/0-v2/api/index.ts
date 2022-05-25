import ApiClient from '@covid/core/api/ApiClient';

import { TUsualSelf } from '../usual-self/types';

const ROUTE_PREFIX = 'usual_self';

interface UsualSelfService {
  createUsualSelf: (usualSelf: any) => Promise<any>;
  getUsualSelf: () => Promise<any>;
}

export const makeUsualSelfService = (): UsualSelfService => {
  const api = new ApiClient();
  const base = ROUTE_PREFIX;

  const EP_USUAL_SELF = 'usual_self';
  const EP_USUAL_SELF_LATEST = 'usual_self/latest';

  return {
    createUsualSelf: async (usualSelf: TUsualSelf) => api.post(`${base}/${EP_USUAL_SELF}/`, usualSelf),
    getUsualSelf: async () => api.get(`${base}/${EP_USUAL_SELF_LATEST}/`),
  };
};

interface SymptomService {
  getRecommendedSymptoms: () => Promise<any>;
  getSymptomByCategory: (categoryName: string) => Promise<any>;
  getSymptomAreas: (details: boolean) => Promise<any>;
  getSymptomReasons: () => Promise<any>;
}

export const makeSymptomService = (): SymptomService => {
  const api = new ApiClient();
  const base = ROUTE_PREFIX;

  const EP_SYMPTOMS_RECOMMENDED = 'recommended_symptoms';
  const EP_SYMPTOM_CATEGORIES = 'symptom_categories';
  const EP_SYMPTOM_REASONS = 'symptom_reasons';

  return {
    getRecommendedSymptoms: async () => {
      return api.get(`${base}/${EP_SYMPTOMS_RECOMMENDED}/`);
    },
    getSymptomAreas: async (details: boolean) => {
      return api.get(`${base}/${EP_SYMPTOM_CATEGORIES}/?nest=${details}`);
    },
    getSymptomByCategory: async (categoryName: string) => {
      return api.get(`${base}/${EP_SYMPTOM_CATEGORIES}/${categoryName}/`);
    },
    getSymptomReasons: async () => {
      return api.get(`${base}/${EP_SYMPTOM_REASONS}/`);
    },
  };
};

interface IAssessmentService {
  createNewDailyAssessment: (data: any) => Promise<any>;
}

export const makeAssessmentService = (): IAssessmentService => {
  const api = new ApiClient();
  const base = ROUTE_PREFIX;

  const EP_ASSESSMENT_NEW_REPORT = 'report';

  return {
    createNewDailyAssessment: async (data: TUsualSelf) => api.post(`${base}/${EP_ASSESSMENT_NEW_REPORT}/`, data),
  };
};
