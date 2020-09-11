import { createSlice, createAsyncThunk, createAction, PrepareAction } from '@reduxjs/toolkit';

import { container } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { camelizeKeys } from '@covid/core/api/utils';
import { SchoolGroupSubscriptionModel, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';

// State interface

export type SchoolState = {
  // Form state when joining a school
  selectedSchoolId?: string;

  joinedSchoolNetworks?: SchoolGroupSubscriptionModel[];

  joinedGroup?: SubscribedSchoolGroupStats;
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
    const groups = response.map((item) => camelizeKeys(item));
    return {
      joinedSchoolNetworks: groups,
    };
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
    [joinedSchoolGroup.type]: (current, action) => {
      current.joinedGroup = action.payload;
    },
    [finishedSchoolGroup.type]: (current) => {
      delete current.joinedGroup;
    },
    [fetchSubscribedSchoolGroups.fulfilled.type]: (current, action: { payload: Partial<SchoolState> }) => {
      const { joinedSchoolNetworks } = action.payload;
      if (joinedSchoolNetworks && joinedSchoolNetworks.length > 0) {
        current.joinedSchoolNetworks = joinedSchoolNetworks;
      }
    },
  },
});
