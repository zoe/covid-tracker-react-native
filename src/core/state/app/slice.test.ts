/* eslint-env jest */
import { appActions, initialStateApp } from '@covid/core/state/app/slice';
import store from '@covid/core/state/store';

describe('\n** redux app state **\n', () => {
  let state = store.getState().app;
  it('should be able to reset all app values back to initial state', () => {
    store.dispatch(appActions.reset());
    state = store.getState().app;
    expect(state).toEqual(initialStateApp);
  });
});
