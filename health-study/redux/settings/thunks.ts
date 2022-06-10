import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import { Dispatch } from '@reduxjs/toolkit';

import { settingsActions } from '.';

export const setEmailSubscriptionThunk =
  (preference: boolean, apiClient: IApiClient = new ApiClient()) =>
  async (dispatch: Dispatch) => {
    await apiClient.patch('/users/email_preference/', { nutrition_newsletter: preference });
    dispatch(settingsActions.setHasEmailSubscription(preference));
  };
