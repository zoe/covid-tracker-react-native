import store from '../state/store';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { updateAssessment, clearAssessment } from './state/actions';

export interface IAssessmentState {
  initAssessment(): void;
  updateAssessment(assessment: Partial<AssessmentInfosRequest>): void;
  getAssessment(): Partial<AssessmentInfosRequest>;
}

export default class ReduxAssessmentState implements IAssessmentState {
  initAssessment() {
    store.dispatch(clearAssessment());
  }

  updateAssessment(assessment: Partial<AssessmentInfosRequest>) {
    console.log('[STATE] update:', assessment);
    return store.dispatch(updateAssessment(assessment));
  }

  getAssessment(): Partial<AssessmentInfosRequest> {
    const state = store.getState();
    console.log('[STATE] Assessment:', state.assessment);
    return state.assessment;
  }
}
