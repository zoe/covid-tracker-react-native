import UserService from '../UserService';

describe('UserService shouldAskLevelOfIsolation Tests', () => {
  it('Returns true for null', () => {
    expect(UserService.shouldAskLevelOfIsolation(null)).toBe(true);
  });
  it('Returns true for today and days less than 7 days ago', () => {
    expect(UserService.shouldAskLevelOfIsolation(new Date())).toBe(false);

    const d = new Date();
    d.setDate(d.getDate() - 6);
    expect(UserService.shouldAskLevelOfIsolation(d)).toBe(false);
  });
  it('Returns true for 7 days ago and more', () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    expect(UserService.shouldAskLevelOfIsolation(d)).toBe(true);

    d.setDate(d.getDate() - 8);
    expect(UserService.shouldAskLevelOfIsolation(d)).toBe(true);
  });
});
