import { store } from '../../store';
import { decrement, increment, incrementByAmount, resetState } from '../index';
import { useExampleValue } from '../selectors';
import { exampleThunk } from '../thunks';

describe('Example Reducer', () => {
  it('should return the correct initial state', () => {
    const state = store.getState().example;
    expect(state).toEqual({ value: 0 });
  });

  it('should correctly increment the example value', () => {
    store.dispatch(resetState());
    store.dispatch(increment());

    const state = store.getState().example;
    expect(state).toEqual({ value: 1 });
  });

  it('should correctly decrement the example value', () => {
    store.dispatch(resetState());
    store.dispatch(decrement());

    const state = store.getState().example;
    expect(state).toEqual({ value: -1 });
  });

  it('should correctly increment the example value by a specific amount', async () => {
    store.dispatch(resetState());
    store.dispatch(incrementByAmount(5));

    const state = store.getState().example;
    expect(state).toEqual({ value: 5 });
  });

  it('should correctly call all of the actions from the thunk', async () => {
    store.dispatch(resetState());
    await store.dispatch(exampleThunk());

    const state = store.getState().example;
    expect(state).toEqual({ value: 4 });
  });

  it('should correctly return the value when using the selector', () => {
    store.dispatch(resetState());
    store.dispatch(incrementByAmount(5));
    const state = store.getState();
    const value = useExampleValue(state);
    expect(value).toEqual(5);
  });
});
