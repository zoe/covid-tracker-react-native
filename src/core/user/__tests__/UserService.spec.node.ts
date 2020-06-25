import { container } from '@covid/provider/services';
import { IPatientService } from '@covid/core/patient/PatientService';
import { Services } from '@covid/provider/services.types';

describe('UserService shouldAskLevelOfIsolation Tests', () => {
  it('Returns true for null', () => {
    expect(container.get<IPatientService>(Services.Patient).shouldAskLevelOfIsolation(null)).toBe(true);
  });
  it('Returns true for today and days less than 7 days ago', () => {
    expect(container.get<IPatientService>(Services.Patient).shouldAskLevelOfIsolation(new Date())).toBe(false);

    const d = new Date();
    d.setDate(d.getDate() - 6);
    expect(container.get<IPatientService>(Services.Patient).shouldAskLevelOfIsolation(d)).toBe(false);
  });
  it('Returns true for 7 days ago and more', () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    expect(container.get<IPatientService>(Services.Patient).shouldAskLevelOfIsolation(d)).toBe(true);

    d.setDate(d.getDate() - 8);
    expect(container.get<IPatientService>(Services.Patient).shouldAskLevelOfIsolation(d)).toBe(true);
  });
});
