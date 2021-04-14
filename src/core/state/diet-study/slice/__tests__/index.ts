import store from '../../../store';
import { setDietStudyConsent } from '../index';

describe('\n** redux diet study state **\n', () => {
  let state = store.getState().dietStudy;
  it('should initially set consent to undefined', () => {
    expect(state.consent).toBe(undefined);
  });
  it('should be able to set consent to YES', () => {
    store.dispatch(setDietStudyConsent('YES'));
    state = store.getState().dietStudy;
    expect(state.consent).toBe('YES');
  });
  it('should be able to set consent to NO', () => {
    store.dispatch(setDietStudyConsent('NO'));
    state = store.getState().dietStudy;
    expect(state.consent).toBe('NO');
  });
  it('should be able to set consent to undefined', () => {
    store.dispatch(setDietStudyConsent());
    state = store.getState().dietStudy;
    expect(state.consent).toBe(undefined);
  });
});
