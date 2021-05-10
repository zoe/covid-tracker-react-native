import { AssessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { getConfig, setConfigCountry } from '@covid/core/Config';
import { getInitialPatientState } from '@covid/core/patient/PatientState';

describe('Checks if user needs to back fill any profile questions', () => {
  it('should be always be false for SE hasRaceEthnicityAnswer config', () => {
    setConfigCountry('SE');
    const config = getConfig()!;
    const state = getInitialPatientState('000');
    state.hasRaceEthnicityAnswer = false;
    state.hasBloodPressureAnswer = true;
    expect(AssessmentCoordinator.mustBackFillProfile(state, config)).toBe(false);
  });

  it('should be always be true for other SE config', () => {
    setConfigCountry('SE');
    const config = getConfig()!;
    const state = getInitialPatientState('000');
    state.hasRaceEthnicityAnswer = false;
    state.hasBloodPressureAnswer = false;
    expect(AssessmentCoordinator.mustBackFillProfile(state, config)).toBe(true);
  });

  it('should be true for US config that hasRaceEthnicityAnswer is false ', () => {
    setConfigCountry('US');
    const config = getConfig()!;
    const state = getInitialPatientState('000');
    state.hasRaceEthnicityAnswer = false;
    expect(AssessmentCoordinator.mustBackFillProfile(state, config)).toBe(true);
  });

  it('should be true for GB config that hasRaceEthnicityAnswer is false ', () => {
    setConfigCountry('GB');
    const config = getConfig()!;
    const state = getInitialPatientState('000');
    state.hasRaceEthnicityAnswer = false;
    expect(AssessmentCoordinator.mustBackFillProfile(state, config)).toBe(true);
  });
});
