import store from '../../../../store';
import { setHasNeededSupport, setHasReceivedSupport } from '../index';

describe('\n** redux mental health support **\n', () => {
  let state = store.getState().mentalHealthSupport;
  it('should initially set has needed support to undefined', () => {
    expect(state.hasNeededSupport).toBe(undefined);
  });
  it('should be able to set the state of hasNeededSupport YES', () => {
    store.dispatch(setHasNeededSupport('YES'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasNeededSupport).toBe('YES');
  });
  it('should be able to set the state of hasNeededSupport NO', () => {
    store.dispatch(setHasNeededSupport('NO'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasNeededSupport).toBe('NO');
  });
  it('should be able to set the state of hasNeededSupport DECLINE_TO_SAY', () => {
    store.dispatch(setHasNeededSupport('DECLINE_TO_SAY'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasNeededSupport).toBe('DECLINE_TO_SAY');
  });
  it('should initially set has received support to undefined', () => {
    expect(state.hasReceivedSupport).toBe(undefined);
  });
  it('should be able to set the state of hasReceivedSupport YES', () => {
    store.dispatch(setHasReceivedSupport('YES'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasReceivedSupport).toBe('YES');
  });
  it('should be able to set the state of hasReceivedSupport NO', () => {
    store.dispatch(setHasReceivedSupport('NO'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasReceivedSupport).toBe('NO');
  });
  it('should be able to set the state of hasReceivedSupport DECLINE_TO_SAY', () => {
    store.dispatch(setHasReceivedSupport('DECLINE_TO_SAY'));
    state = store.getState().mentalHealthSupport;
    expect(state.hasReceivedSupport).toBe('DECLINE_TO_SAY');
  });
});
