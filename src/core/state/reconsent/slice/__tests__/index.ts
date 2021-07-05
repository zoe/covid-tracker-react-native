import { updateDiseasePreferences } from '@covid/core/state/reconsent/slice';
import store from '@covid/core/state/store';

describe('\n** redux reconsent state **\n', () => {
  let state = store.getState().reconsent;
  it('should initially set disease preferences to empty object', () => {
    expect(state).toEqual({});
  });
  it('should be able to set dementia to true', () => {
    store.dispatch(updateDiseasePreferences({ dementia: true }));
    state = store.getState().reconsent;
    expect(state.dementia).toBe(true);
  });
  it('should be able to set mental health to true', () => {
    store.dispatch(updateDiseasePreferences({ mental_health: true }));
    state = store.getState().reconsent;
    expect(state.mental_health).toBe(true);
  });
  it('should be able to set dementia to false', () => {
    store.dispatch(updateDiseasePreferences({ dementia: false, mental_health: true }));
    state = store.getState().reconsent;
    expect(state.mental_health).toBe(true);
    expect(state.dementia).toBe(false);
  });
});
