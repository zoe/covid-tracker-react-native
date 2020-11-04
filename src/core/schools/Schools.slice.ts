import { createSlice, createAsyncThunk, createAction, PrepareAction, Draft } from '@reduxjs/toolkit';
import { PayloadAction } from 'typesafe-actions';

import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { camelizeKeys } from '@covid/core/api/utils';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';

import { RootState } from '../state/root';

// State interface

export type SchoolState = {
  // Form state when joining a school
  selectedSchoolId?: string;

  joinedSchoolNetworks?: SubscribedSchoolGroupStats[]; //TODO Rename

  joinedGroup?: SubscribedSchoolGroupStats; // TODO remove
};

// Default state

const initialState: SchoolState = {};

// Actions

export const selectSchool = createAction<string>('school/select_school');

export const joinedSchoolGroup = createAction<SubscribedSchoolGroupStats>('school/joined_school_group');
export const finishedSchoolGroup = createAction('school/finished_school_group');

// Actions: Async

export const fetchSubscribedSchoolGroups = createAsyncThunk(
  'school/fetch_subscribed_school_groups',
  async (): Promise<Partial<SchoolState>> => {
    const service = container.get<ISchoolService>(Services.SchoolService);
    const response = await service.getSubscribedSchoolGroups();
    return {
      joinedSchoolNetworks: response,
    } as Partial<SchoolState>;
  }
);

// Slice (Store, Reducer, Actions etc...)

export const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {},
  extraReducers: {
    [selectSchool.type]: (current, action) => {
      current.selectedSchoolId = action.payload;
    },
    [joinedSchoolGroup.type]: (
      current: SchoolState,
      action: PayloadAction<'school/joined_school_group', SubscribedSchoolGroupStats>
    ) => {
      //TODO unused
      current.joinedGroup = action.payload;
      current.joinedSchoolNetworks = [...(current.joinedSchoolNetworks ?? []), action.payload];
    },
    [finishedSchoolGroup.type]: (current) => {
      delete current.joinedGroup;
    },
    [fetchSubscribedSchoolGroups.fulfilled.type]: (current, action: { payload: Partial<SchoolState> }) => {
      const { joinedSchoolNetworks } = action.payload;
      if (joinedSchoolNetworks) {
        current.joinedSchoolNetworks = joinedSchoolNetworks;
      }
    },
  },
});

// selectors
export const selectJoinedGroups = (state: RootState, higherEducation: boolean = false) =>
  state.school.joinedSchoolNetworks?.filter((group) => group.school.higher_education === higherEducation);

export const selectPreviouslyJoinedGroups = (state: RootState, patientId: string, higherEduction: boolean = false) => {
  const previouslyJoinedGroups = selectJoinedGroups(state, higherEduction);
  return previouslyJoinedGroups ? previouslyJoinedGroups.find((s) => s.patient_id === patientId) : undefined;
};
