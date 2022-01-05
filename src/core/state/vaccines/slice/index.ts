import { TRootState } from '@covid/core/state/root';
import { IVaccineState } from '@covid/core/state/vaccines/types';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateVaccine: IVaccineState = {
  vaccines: [],
};

const vaccinesSlice = createSlice({
  initialState: initialStateVaccine,
  name: 'Vaccine',
  reducers: {
    reset: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialStateVaccine;
    },
    // Added 14.01.2021. Not currently used but should be useful for setting and saving vaccine
    setVaccine: (state, action: PayloadAction<TVaccineRequest[]>) => {
      state.vaccines = action.payload;
    },
  },
});

export const { setVaccine, reset } = vaccinesSlice.actions;
export const selectVaccineState = (state: TRootState) => state.vaccines;
export default vaccinesSlice;
