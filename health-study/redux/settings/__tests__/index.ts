import { store } from '../../store';
import { action, resetState } from '../index';
import { useSettings } from '../selectors';
import { settingsThunk } from '../thunks';

describe('Settings Reducer', () => {
  it('should return the correct initial state', () => {
    const state = store.getState().settings;
    expect(state).toEqual({ value: 0 });
  });

  it('should correctly increment the settings value', () => {
    store.dispatch(resetState());
    store.dispatch(action(1));

    const state = store.getState().settings;
    expect(state).toEqual({ value: 1 });
  });

  it('should correctly decrement the settings value', () => {
    store.dispatch(resetState());
    store.dispatch(action(-1));

    const state = store.getState().settings;
    expect(state).toEqual({ value: -1 });
  });

  it('should correctly increment the settings value by a specific amount', async () => {
    store.dispatch(resetState());
    store.dispatch(action(5));

    const state = store.getState().settings;
    expect(state).toEqual({ value: 5 });
  });

  it('should correctly call all of the actions from the thunk', async () => {
    store.dispatch(resetState());
    await store.dispatch(settingsThunk());

    const state = store.getState().settings;
    expect(state).toEqual({ value: 2 });
  });

  it('should correctly return the value when using the selector', () => {
    store.dispatch(resetState());
    store.dispatch(action(5));
    const state = store.getState();
    const value = useSettings(state).value;
    expect(value).toEqual(5);
  });
});
