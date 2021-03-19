import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';

import { RootState } from '../state/root';

export type SchoolState = {
  joinedSchoolGroups: ISubscribedSchoolGroupStats[]; //TODO Rename
};

const initialState: SchoolState = {
  joinedSchoolGroups: [],
};

// Actions: Async

export const fetchSubscribedSchoolGroups = createAsyncThunk(
  'school/fetch_subscribed_school_groups',
  async (): Promise<ISubscribedSchoolGroupStats[]> => {
    const service = container.get<ISchoolService>(Services.SchoolService);
    return await service.getSubscribedSchoolGroups();
  }
);

// Slice (Store, Reducer, Actions etc...)

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    removeGroup: (state, action: PayloadAction<string>) => {
      const index = state.joinedSchoolGroups.findIndex((group) => group.id === action.payload);
      state.joinedSchoolGroups.splice(index, 1);
    },
  },
  extraReducers: {
    [fetchSubscribedSchoolGroups.fulfilled.type]: (state, action) => {
      state.joinedSchoolGroups = action.payload;
    },
  },
});

// Selectors
export const selectAllJoinedGroups = (state: RootState, higherEducation: boolean = false) =>
  state.school.joinedSchoolGroups?.filter((group) => group.school.higher_education === higherEducation);

export const selectPatientsJoinedGroups = (state: RootState, patientId: string, higherEduction: boolean = false) => {
  const allJoinedGroups = selectAllJoinedGroups(state, higherEduction);
  return allJoinedGroups ? allJoinedGroups.find((s) => s.patient_id === patientId) : undefined;
};
