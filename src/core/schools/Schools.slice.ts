import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { schoolService } from '@covid/core/schools/SchoolService';
import { RootState } from '@covid/core/state/root';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SchoolState = {
  joinedSchoolGroups: ISubscribedSchoolGroupStats[]; // TODO Rename
};

export const initialStateSchools: SchoolState = {
  joinedSchoolGroups: [],
};

// Actions: Async

export const fetchSubscribedSchoolGroups = createAsyncThunk('school/fetch_subscribed_school_groups', async (): Promise<
  ISubscribedSchoolGroupStats[]
> => {
  return schoolService.getSubscribedSchoolGroups();
});

// Slice (Store, Reducer, Actions etc...)

export const schoolSlice = createSlice({
  extraReducers: {
    [fetchSubscribedSchoolGroups.fulfilled.type]: (state, action) => {
      state.joinedSchoolGroups = action.payload;
    },
  },
  initialState: initialStateSchools,
  name: 'school',
  reducers: {
    removeGroup: (state, action: PayloadAction<string>) => {
      const index = state.joinedSchoolGroups.findIndex((group) => group.id === action.payload);
      state.joinedSchoolGroups.splice(index, 1);
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
