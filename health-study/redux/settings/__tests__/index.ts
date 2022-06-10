import { store } from '../../store';
import { settingsActions } from '../index';
import { useSettingsState } from '../selectors';
import { setEmailSubscriptionThunk } from '../thunks';

describe('Settings Reducer', () => {
  it('should return the correct initial state', () => {
    const state = store.getState().settings;
    expect(state).toEqual({ hasEmailSubscription: false });
  });

  it('should set email subscription', () => {
    store.dispatch(settingsActions.reset());
    store.dispatch(settingsActions.setHasEmailSubscription(true));

    const state = store.getState().settings;
    expect(state).toEqual({ hasEmailSubscription: true });
  });

  it('should reset settings state', () => {
    store.dispatch(settingsActions.setHasEmailSubscription(true));
    store.dispatch(settingsActions.reset());

    const state = store.getState().settings;
    expect(state).toEqual({ hasEmailSubscription: false });
  });

  it('should correctly call all of the actions from the thunk', async () => {
    store.dispatch(settingsActions.reset());
    await store.dispatch(setEmailSubscriptionThunk(true));

    const state = store.getState().settings;
    expect(state).toEqual({ hasEmailSubscription: true });
  });

  it('should correctly return the value when using the selector', () => {
    store.dispatch(settingsActions.reset());
    store.dispatch(settingsActions.setHasEmailSubscription(true));
    const state = store.getState();
    const value = useSettingsState(state).hasEmailSubscription;
    expect(value).toEqual(true);
  });
});
