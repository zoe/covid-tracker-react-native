import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { container } from '@covid/provider/services';
import { IContentService } from '@covid/core/content/ContentService';
import { Services } from '@covid/provider/services.types';
import { PersonalisedLocalData } from '@covid/core/AsyncStorageService';

// State interface

export type ContentState = {
  state: 'loading' | 'finished' | 'error';
  startupInfo?: StartupInfo;
  personalizedLocalData?: PersonalisedLocalData;
};

// Default state
const initialState: ContentState = { state: 'loading' };

// Async Actions
export const fetchStartUpInfo = createAsyncThunk('content/startup_info', async () => {
  const service = container.get<IContentService>(Services.Content);
  return {
    startupInfo: await service.getStartupInfo(),
    personalizedLocalData: service.localData,
  };
});

// Slice (Store, Reducer, Actions etc...)

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: {
    // StartUpInfo reducers
    [fetchStartUpInfo.pending.type]: (current) => {
      current.state = 'loading';
    },
    [fetchStartUpInfo.rejected.type]: (current) => {
      current.state = 'error';
    },
    [fetchStartUpInfo.fulfilled.type]: (current, action) => {
      current.state = !action.payload ? 'error' : 'finished';
      const { startupInfo, personalizedLocalData } = action.payload;
      current.startupInfo = startupInfo;
      current.personalizedLocalData = personalizedLocalData;
    },
  },
});
