import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import moment from 'moment';

import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { container } from '@covid/provider/services';
import { IContentService } from '@covid/core/content/ContentService';
import { Services } from '@covid/provider/services.types';
import { PersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { IPredictiveMetricsClient } from '@covid/core/content/PredictiveMetricsClient';
import { SchoolNetworkData } from '@covid/core/content/state/school-network.interfaces';
import { SchoolNetworks } from '@covid/core/content/__mocks__/school-networks';

// State interface

type ApiState = 'ready' | 'loading' | 'finished' | 'error';

export type ContentState = {
  // Startup info
  infoApiState: ApiState;
  startupInfo?: StartupInfo;
  personalizedLocalData?: PersonalisedLocalData;

  // Metrics
  ukMetricsApiState: ApiState;
  ukActive?: string;
  ukDaily?: string;

  todayDate: string;

  joinedSchoolNetworks?: SchoolNetworkData[];
};

// Default state

const todaysDate = (): string => moment().format('dddd Do MMMM');

const initialState: ContentState = {
  infoApiState: 'ready',
  ukMetricsApiState: 'ready',
  todayDate: todaysDate(),
  joinedSchoolNetworks: SchoolNetworks,
};

// Async Actions

export const fetchStartUpInfo = createAsyncThunk(
  'content/startup_info',
  async (): Promise<Partial<ContentState>> => {
    const service = container.get<IContentService>(Services.Content);
    return {
      startupInfo: (await service.getStartupInfo()) ?? undefined,
      personalizedLocalData: service.localData,
    };
  }
);

export const fetchUKMetrics = createAsyncThunk(
  'content/uk_metrics',
  async (): Promise<Partial<ContentState>> => {
    const service = container.get<IPredictiveMetricsClient>(Services.PredictiveMetricsClient);
    return {
      ukActive: (await service.getActiveCases()) ?? undefined,
      ukDaily: (await service.getDailyCases()) ?? undefined,
    };
  }
);

export const updateTodayDate = createAction('context/update_today_date');

// Slice (Store, Reducer, Actions etc...)

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    [updateTodayDate.type]: (current) => void (current.todayDate = todaysDate()),
  },
  extraReducers: {
    // StartUpInfo reducers
    [fetchStartUpInfo.pending.type]: (current) => void (current.infoApiState = 'loading'),
    [fetchStartUpInfo.rejected.type]: (current) => void (current.infoApiState = 'error'),
    [fetchStartUpInfo.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.infoApiState = !action.payload ? 'error' : 'finished';
      const { startupInfo, personalizedLocalData } = action.payload;
      current.startupInfo = startupInfo;
      current.personalizedLocalData = personalizedLocalData;
    },

    // UK Predictive Metrics reducers
    [fetchUKMetrics.pending.type]: (current) => void (current.ukMetricsApiState = 'loading'),
    [fetchUKMetrics.rejected.type]: (current) => void (current.ukMetricsApiState = 'error'),
    [fetchUKMetrics.fulfilled.type]: (current, action: { payload: Partial<ContentState> }) => {
      current.ukMetricsApiState = !action.payload ? 'error' : 'finished';
      const { ukActive, ukDaily } = action.payload;
      current.ukActive = ukActive;
      current.ukDaily = ukDaily;
    },
  },
});
