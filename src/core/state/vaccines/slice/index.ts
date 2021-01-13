import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { Services } from '@covid/provider/services.types';
import { container } from '@covid/provider/services';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';

import { IVaccineState } from '../types';

const initialState: IVaccineState = {
  vaccines: [],
};

export const fetchVaccines = createAsyncThunk(
  'vaccines/fetchVaccines',
  async (patientId: string): Promise<VaccineRequest[]> => {
    const service = container.get<IVaccineService>(Services.Vaccine);
    const response = await service.listVaccines();
    const patientVaccines = response.filter((vaccine) => vaccine.patient === patientId);
    return patientVaccines;
  }
);

const vaccinesSlice = createSlice({
  name: 'Vaccine',
  initialState,
  reducers: {
    setVaccine: (state, action: PayloadAction<VaccineRequest[]>) => {
      state.vaccines = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [fetchVaccines.fulfilled.type]: (state, action: { payload: VaccineRequest[] }) => {
      state.vaccines = action.payload;
    },
  },
});

export const { setVaccine, reset } = vaccinesSlice.actions;
export const selectApp = (state: IVaccineState) => state.vaccines;
export default vaccinesSlice;
