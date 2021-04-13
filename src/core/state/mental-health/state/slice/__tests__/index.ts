import store from '../../../../store';
import { setCompleted, setCurrentSection, setConsent, setLastPresentedDate } from '../index';

describe('\n** redux mental health state **\n', () => {
  let state = store.getState().mentalHealthState;
  it('should initially set completed to false', () => {
    expect(state.completed).toBe(false);
  });
  it('should be able to set the state of completed to true', () => {
    store.dispatch(setCompleted(true));
    state = store.getState().mentalHealthState;
    expect(state.completed).toBe(true);
  });
  it('should initially set consent to undefined', () => {
    expect(state.consent).toBe(undefined);
  });
  it('should be able to set the state of consent to YES', () => {
    store.dispatch(setConsent('YES'));
    state = store.getState().mentalHealthState;
    expect(state.consent).toBe('YES');
  });
  it('should be able to set the state of consent to LATER', () => {
    store.dispatch(setConsent('LATER'));
    state = store.getState().mentalHealthState;
    expect(state.consent).toBe('LATER');
  });
  it('should be able to set the state of consent to NO', () => {
    store.dispatch(setConsent('NO'));
    state = store.getState().mentalHealthState;
    expect(state.consent).toBe('NO');
  });

  it('should initially set current selection to undefined', () => {
    expect(state.currentSection).toBe(undefined);
  });
  it('should be able to set the state of currentSection to CHANGES', () => {
    store.dispatch(setCurrentSection('CHANGES'));
    state = store.getState().mentalHealthState;
    expect(state.currentSection).toBe('CHANGES');
  });

  it('should initially set last presented date to undefined', () => {
    expect(state.lastPresentedDate).toBe(undefined);
  });
});
