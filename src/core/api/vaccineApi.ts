import appConfig from '@covid/appConfig';
import { api } from '@covid/core/api/rtkApi';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

const vaccineApi = api.injectEndpoints({
  endpoints: (build) => ({
    addVaccineAndDoses: build.mutation<boolean, { payload: Partial<TVaccineRequest>; patientId: string }>({
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
    updateVaccineAndDoses: build.mutation<boolean, { payload: Partial<TVaccineRequest>; patientId: string }>({
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

export const { useListVaccinesQuery, useAddVaccineAndDosesMutation, useUpdateVaccineAndDosesMutation } = vaccineApi;
