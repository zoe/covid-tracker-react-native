import * as helpers from '@covid/utils/helpers';

describe('Helper Utils', () => {
  it('should correctly identify null and undefined values', () => {
    expect(helpers.nullOrUndefined(null)).toBeTruthy();
    expect(helpers.nullOrUndefined(undefined)).toBeTruthy();
    expect(helpers.nullOrUndefined(0)).toBeFalsy();
    expect(helpers.nullOrUndefined(1)).toBeFalsy();
    expect(helpers.nullOrUndefined('')).toBeFalsy();
    expect(helpers.nullOrUndefined('undefined')).toBeFalsy();
    expect(helpers.nullOrUndefined(true)).toBeFalsy();
    expect(helpers.nullOrUndefined(false)).toBeFalsy();
  });
});
