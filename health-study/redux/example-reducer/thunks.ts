import { Dispatch } from '@reduxjs/toolkit';

import { increment, incrementByAmount } from '.';

export const exampleThunk = () => async (dispatch: Dispatch) => {
  dispatch(increment());
  // await some async function
  dispatch(incrementByAmount(3));
};
