import ApiClient from '@covid/core/api/ApiClient';

// import symptom_category_details from '../../../../../mock-server/db/symptom_category_details.json';
// import usual_self_symptoms from '../../../../../mock-server/db/usual_self_symptoms.json';

const EP_NEW_DAILY_REPORT = 'report';
const EP_RECOMMENDED_SYMPTOMS_GET = 'recommended_symptoms';
const EP_USUAL_SELF_SYMPTOMS = 'usual_self/latest';

interface IAssessmentFlowService {
  getUsualSelf: () => Promise<any>;
  getRecommendedSymptoms: (patientID: string) => Promise<any>;
  getSymptomByCategory: (categoryName: string) => Promise<any>;
  addNewDailyAssessment: ({ patientID, data }: any) => Promise<any>;
  getSymptomAreas: (details: boolean) => Promise<any>;
}

export const makeAssessmentFlowService = (): IAssessmentFlowService => {
  const prefix = 'usual_self';
  const api = new ApiClient();
  const base = `https://base/${prefix}`;

  return {
    addNewDailyAssessment: async ({ data }) =>
      api.post(`${base}/${EP_NEW_DAILY_REPORT}/`, {
        data,
      }),
    getRecommendedSymptoms: async (patientID: string) => {
      return api.get(`${base}/${EP_RECOMMENDED_SYMPTOMS_GET}/?patient_id=${patientID}`);
      // return Promise.resolve({
      //   otherSymptoms: [
      //     {
      //       frequency: 'Daily',
      //       severity: 'high',
      //       symptom: 'Symptom 1',
      //     },
      //     {
      //       frequency: 'Weekly',
      //       severity: 'low',
      //       symptom: 'Symptom 2',
      //     },
      //     {
      //       frequency: 'Monthly',
      //       severity: 'medium',
      //       symptom: 'Symptom 3',
      //     },
      //     {
      //       frequency: 'Rarely',
      //       severity: 'low',
      //       symptom: 'Symptom 4',
      //     },
      //   ],
      //   symptoms: [
      //     {
      //       frequency: 'Daily',
      //       severity: 'high',
      //       symptom: 'Symptom W',
      //     },
      //     {
      //       frequency: 'Weekly',
      //       severity: 'low',
      //       symptom: 'Symptom X',
      //     },
      //     {
      //       frequency: 'Monthly',
      //       severity: 'medium',
      //       symptom: 'Symptom Y',
      //     },
      //     {
      //       frequency: 'Rarely',
      //       severity: 'low',
      //       symptom: 'Symptom Z',
      //     },
      //   ],
      // });
    },
    getSymptomAreas: async (details: boolean) => {
      const EP_SYMPTOM_CATEGORIES = 'symptom_categories';
      return api.get(`${base}/${EP_SYMPTOM_CATEGORIES}/?nest=${details}`);
      // return Promise.resolve([
      //   { name: 'Miscellaneous' },
      //   { name: 'Head & Face' },
      //   { name: 'Throat, Chest & Lungs' },
      //   { name: 'Stomach, Gut & Bladder' },
      //   { name: 'Bones, Joints & Muscles' },
      //   { name: 'Skin & Nails' },
      //   { name: 'Reproductive' },
      //   { name: 'Thinking & Mood' },
      // ]);
    },
    getSymptomByCategory: async (categoryName: string) => {
      return api.get(`${base}/${EP_RECOMMENDED_SYMPTOMS_GET}/${categoryName}`);
      // return Promise.resolve(symptom_category_details.symptoms);
    },
    getUsualSelf: async () => {
      return api.get(`${base}/${EP_USUAL_SELF_SYMPTOMS}`);
      // return Promise.resolve(usual_self_symptoms);
    },
  };
};
