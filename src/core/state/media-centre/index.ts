import { IMediaCentreState, TMediaContentItem } from '@covid/core/state/media-centre/types';
import { TRootState } from '@covid/core/state/root';
// import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import contentItemsHardcoded from './data.json';

export const initialStateMediaCentre: IMediaCentreState = {
  // @todo: when backend is ready swap the below two lines of code.
  // contentItems: [],
  contentItems: contentItemsHardcoded as TMediaContentItem[],
};

export default createSlice({
  initialState: initialStateMediaCentre,
  name: 'MediaCentre',
  reducers: {
    setContentItems: (state, action: PayloadAction<TMediaContentItem[]>) => ({
      ...state,
      contentItems: action.payload,
    }),
  },
});

// @todo: when backend is ready swap the below two lines of code.
// export const selectContentItems = (state: TRootState) => state.mediaCentre.contentItems;
export const selectContentItems = () => contentItemsHardcoded as TMediaContentItem[];

export const searchContentItems = (state: TRootState, searchQuery: string) => {
  const contentItems = selectContentItems();
  if (!searchQuery) {
    return contentItems;
  }
  const searchTags = searchQuery.toLowerCase().split(' ');
  return contentItems.filter(
    (contentItem: TMediaContentItem) =>
      contentItem.tags.filter((tag) => searchTags.includes(tag.toLowerCase())).length > 0,
  );
};

export const selectEnabledTags = (state: TRootState, searchQuery: string) => {
  const contentItems = selectContentItems();
  if (!searchQuery) {
    return [];
  }
  const searchTags = searchQuery.toLowerCase().split(' ');
  return searchTags.filter((searchTag: string) => {
    return contentItems.find((contentItem: TMediaContentItem) => {
      return contentItem.tags.find((tag: string) => {
        return tag.toLowerCase() === searchTag;
      });
    });
  });
};
