import ApiClient from '@covid/core/api/ApiClient';
import { setHasEmailSubscription } from '@covid/core/state';
import { Dispatch } from '@reduxjs/toolkit';

const apiClient = new ApiClient();

export const setEmailSubscriptionThunk = (preference: boolean) => async (dispatch: Dispatch) => {
  await apiClient.patch('/users/email_preference/', { nutrition_newsletter: preference });
  dispatch(setHasEmailSubscription(preference));
};
