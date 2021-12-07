import appConfig from '@covid/appConfig';
import { api } from '@covid/core/api/rtkApi';
import { TDoseSymptomsRequest, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

export const vaccineApi = api.injectEndpoints({
  endpoints: (build) => ({
    addDoseSymptoms: build.mutation<string, { payload: Partial<TDoseSymptomsRequest>; patientId: string }>({
      query: ({ patientId, payload }) => ({
        body: {
          patient: patientId,
          ...payload,
        },
        method: 'POST',
        url: '/dose_symptoms/',
      }),
    }),
    addVaccineAndDoses: build.mutation<string, { payload: Partial<TVaccineRequest>; patientId: string }>({
      invalidatesTags: ['Vaccine'],
      query: ({ patientId, payload }) => ({
        body: {
          patient: patientId,
          ...payload,
          version: appConfig.vaccineVersion,
        },
        method: 'POST',
        url: '/vaccines/',
      }),
    }),
    listVaccines: build.query<TVaccineRequest[], void>({
      providesTags: ['Vaccine'],
      query: () => '/vaccines/',
    }),
    updateVaccineAndDoses: build.mutation<string, { payload: Partial<TVaccineRequest>; patientId: string }>({
      invalidatesTags: ['Vaccine'],
      query: ({ patientId, payload }) => ({
        body: {
          patient: patientId,
          ...payload,
          version: appConfig.vaccineVersion,
        },
        method: 'PATCH',
        url: `/vaccines/${payload.id}/`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useListVaccinesQuery,
  useAddVaccineAndDosesMutation,
  useUpdateVaccineAndDosesMutation,
  useAddDoseSymptomsMutation,
} = vaccineApi;
