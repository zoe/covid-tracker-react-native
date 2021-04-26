import store from '../../../store';
import { setHasViewedAnniversaryModal } from '../index';

describe('\n** redux anniversary state **\n', () => {
  let state = store.getState().anniversary;
  it('should initially set has viewed modal to false', () => {
    expect(state.hasViewedModal).toBe(false);
  });
  it('should be able to set the state of hasViewedModal', () => {
    store.dispatch(setHasViewedAnniversaryModal(true));
    state = store.getState().anniversary;
    expect(state.hasViewedModal).toBe(true);
  });
});
