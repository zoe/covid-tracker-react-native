import { IAnniversary } from '@covid/core/state/anniversary/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IAnniversary = {
  hasViewedModal: false,
};

const anniversarySlice = createSlice({
  initialState,
  name: 'Anniversary',
  reducers: {
    setHasViewedAnniversaryModal: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasViewedModal: action.payload,
      };
    },
  },
});

export const { setHasViewedAnniversaryModal } = anniversarySlice.actions;
export const selectAnniversary = (state: RootState) => state.anniversary;
export default anniversarySlice.reducer;
