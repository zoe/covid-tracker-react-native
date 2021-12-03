import appConfig from '@covid/appConfig';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.apiBase,
    prepareHeaders: async (headers) => {
      const user = await AsyncStorageService.getStoredData();
      const hasUser = !!user && !!user!.userToken && !!user!.userId;
      if (hasUser) {
        headers.set('Authorization', `Token ${user.userToken}`);
      }

      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
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
  reducerPath: 'covidApi',
  tagTypes: ['Vaccine'],
});

export const { useListVaccinesQuery, useAddVaccineAndDosesMutation, useUpdateVaccineAndDosesMutation } = api;
