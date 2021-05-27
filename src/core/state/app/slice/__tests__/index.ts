import store from '../../../store';
import {
  appInitialState,
  reset,
  setDashboardHasBeenViewed,
  setLoggedVaccine,
  setMentalHealthStudyActive,
} from '../index';

describe('\n** redux app state **\n', () => {
  let state = store.getState().app;
  it('should initially set the dashboard has been viewed to false', () => {
    expect(state.dashboardHasBeenViewed).toBe(false);
  });
  it('should initially set mental health study active to true', () => {
    expect(state.mentalHealthStudyActive).toBe(true);
  });
  it('should initially set logged vaccine to false', () => {
    expect(state.loggedVaccine).toBe(false);
  });
  it('should be able to set the state of dashboardHasBeenViewed', () => {
    store.dispatch(setDashboardHasBeenViewed(true));
    state = store.getState().app;
    expect(state.dashboardHasBeenViewed).toBe(true);
  });
  it('should be able to set the state of setLoggedVaccine', () => {
    store.dispatch(setLoggedVaccine(true));
    state = store.getState().app;
    expect(state.loggedVaccine).toBe(true);
  });
  it('should be able to set the state of setMentalHealthStudyActive', () => {
    store.dispatch(setMentalHealthStudyActive(false));
    state = store.getState().app;
    expect(state.mentalHealthStudyActive).toBe(false);
  });
  it('should be able to reset all app values back to initial state', () => {
    store.dispatch(reset());
    state = store.getState().app;
    expect(state).toEqual(appInitialState);
  });
});
