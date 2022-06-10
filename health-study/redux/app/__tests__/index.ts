import { store } from '../../store';
import { appActions, initialState } from '..';
import { useAppState, useShowRepeatUsualSelfIntro, useToggleRebrand } from '../selectors';

describe('App Reducer', () => {
  it('should return the correct initial state', () => {
    const state = store.getState().app;
    expect(state).toEqual(initialState);
  });

  it('should correctly set modalHealthProfileIntroVisible', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setModalHealthProfileIntroVisible(true));

    const { modalHealthProfileIntroVisible } = store.getState().app;
    expect(modalHealthProfileIntroVisible).toEqual(true);
  });

  it('should correctly set modalMentalHealthPlaybackVisible', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setModalMentalHealthPlaybackVisible(true));

    const { modalMentalHealthPlaybackVisible } = store.getState().app;
    expect(modalMentalHealthPlaybackVisible).toEqual(true);
  });

  it('should correctly set modalReBrandVisible', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setModalReBrandVisible(true));

    const { modalReBrandVisible } = store.getState().app;
    expect(modalReBrandVisible).toEqual(true);
  });

  it('should correctly set toggleReBrand', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setReBrandVisible(true));

    const { toggleReBrand } = store.getState().app;
    expect(toggleReBrand).toEqual(true);
  });

  it('should correctly set useAssessmentFlowV1', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setUseAssessmentFlowV1(true));

    const { useAssessmentFlowV1 } = store.getState().app;
    expect(useAssessmentFlowV1).toEqual(true);
  });

  it('should correctly set showRepeatUsualSelfIntro', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setShowRepeatUsualSelfIntro(true));

    const { showRepeatUsualSelfIntro } = store.getState().app;
    expect(showRepeatUsualSelfIntro).toEqual(true);
  });

  it('should correctly return the app state when using the selector', () => {
    store.dispatch(appActions.reset());
    const state = store.getState();
    const appState = useAppState(state);
    expect(appState).toEqual(initialState);
  });

  it('should correctly return the toggleReBrand value when using the selector', () => {
    store.dispatch(appActions.reset());
    store.dispatch(appActions.setReBrandVisible(true));
    const state = store.getState();
    const toggleReBrand = useToggleRebrand(state);
    expect(toggleReBrand).toEqual(true);
  });

  it('should correctly return the showRepeatUsualSelfIntro value when using the selector', () => {
    store.dispatch(appActions.reset());
    const state = store.getState();
    const showRepeatUsualSelfIntro = useShowRepeatUsualSelfIntro(state);
    expect(showRepeatUsualSelfIntro).toEqual(false);
  });
});
