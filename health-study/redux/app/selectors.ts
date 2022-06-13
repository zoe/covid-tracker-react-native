import { TRootState } from '@covid/core/state/root';
// TODO: Change to use the following type once all of the redux has been moved
// import { RootState } from '../store';

export const useAppState = (state: TRootState) => state.app;
export const useToggleRebrand = (state: TRootState) => state.app.toggleReBrand;
export const useShowRepeatUsualSelfIntro = (state: TRootState) => state.app.showRepeatUsualSelfIntro;
