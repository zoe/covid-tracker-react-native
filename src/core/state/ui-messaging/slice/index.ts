import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@covid/core/state/root';

import { IUIMessage, IUIMessageCollection } from '../types';

const initialState: IUIMessageCollection = {
  messages: [],
};

const uiMessagesSlice = createSlice({
  name: 'UIMessages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IUIMessage>) => {
      const messages = [...state.messages, action.payload];
      return {
        ...state,
        messages,
      };
    },
    resetUiMessages: (state) => {
      return {
        ...state,
        messages: [],
      };
    },
  },
});

export const { addMessage, resetUiMessages } = uiMessagesSlice.actions;
export const selectUIMessages = (state: RootState) => state.uiMessages;
export default uiMessagesSlice.reducer;
