import { Dispatch } from '@reduxjs/toolkit';

import { action } from '.';

export const exampleThunk = () => async (dispatch: Dispatch) => {
  // await some async function
  dispatch(action(2));
};
