import appConfig from '@covid/appConfig';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
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
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['Vaccine'],
});
