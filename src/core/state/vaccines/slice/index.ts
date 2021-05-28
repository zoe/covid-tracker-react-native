import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IVaccineState } from '../types';

const initialState: IVaccineState = {
  vaccines: [],
};

export const fetchVaccines = createAsyncThunk('vaccines/fetchVaccines', async (patientId: string): Promise<
  VaccineRequest[]
> => {
  const service = container.get<IVaccineService>(Services.Vaccine);
  const response = await service.listVaccines();
  const patientVaccines = response.filter((vaccine) => vaccine.patient === patientId);
  return patientVaccines;
});

const vaccinesSlice = createSlice({
  extraReducers: {
    [fetchVaccines.fulfilled.type]: (state, action: { payload: VaccineRequest[] }) => {
      state.vaccines = action.payload;
    },
  },
  initialState,
  name: 'Vaccine',
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    // Added 14.01.2021. Not currently used but should be useful for setting and saving vaccine
    setVaccine: (state, action: PayloadAction<VaccineRequest[]>) => {
      state.vaccines = action.payload;
    },
  },
});

export const { setVaccine, reset } = vaccinesSlice.actions;
export const selectApp = (state: IVaccineState) => state.vaccines;
export default vaccinesSlice;
