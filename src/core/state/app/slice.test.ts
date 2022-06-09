/* eslint-env jest */
import { appActions, initialStateApp } from '@covid/core/state/app/slice';
import store from '@covid/core/state/store';

describe('\n** redux app state **\n', () => {
  let state = store.getState().app;
  it('should initially set mental health study active to true', () => {
    expect(state.mentalHealthStudyActive).toBe(true);
  });
  it('should be able to set the state of setMentalHealthStudyActive', () => {
    store.dispatch(appActions.setMentalHealthStudyActive(false));
    state = store.getState().app;
    expect(state.mentalHealthStudyActive).toBe(false);
  });
  it('should be able to reset all app values back to initial state', () => {
    store.dispatch(appActions.reset());
    state = store.getState().app;
    expect(state).toEqual(initialStateApp);
  });
});
