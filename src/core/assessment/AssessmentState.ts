import store from '@covid/core/state/store';

import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { clearAssessment, updateAssessment } from './state/actions';

export interface IAssessmentState {
  initAssessment(assessment: Partial<AssessmentInfosRequest>): void;
  updateAssessment(assessment: Partial<AssessmentInfosRequest>): void;
  getAssessment(): Partial<AssessmentInfosRequest>;
}

export default class ReduxAssessmentState implements IAssessmentState {
  initAssessment(assessment: Partial<AssessmentInfosRequest>) {
    store.dispatch(clearAssessment());
    store.dispatch(updateAssessment(assessment));
  }

  updateAssessment(assessment: Partial<AssessmentInfosRequest>) {
    return store.dispatch(updateAssessment(assessment));
  }

  getAssessment(): Partial<AssessmentInfosRequest> {
    const state = store.getState();
    return state.assessment;
  }
}
