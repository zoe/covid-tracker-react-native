import { cleanIntegerVal, cleanFloatVal } from './number';

describe('cleanIntegerVal', () => {
  it("doesn't coerce octal", () => {
    expect(cleanIntegerVal('020')).toBe(20);
  });
  it('can handle spaces', () => {
    expect(cleanIntegerVal('1980')).toBe(1980);
    expect(cleanIntegerVal('1 980')).toBe(1980);
    expect(cleanIntegerVal('1 9 8 0')).toBe(1980);
  });
});

describe('cleanFloatVal', () => {
  it("doesn't coerce octal", () => {
    expect(cleanFloatVal('093')).toBe(93);
  });
  it('can handle spaces', () => {
    expect(cleanFloatVal('93')).toBe(93);
    expect(cleanFloatVal('9.3')).toBe(9.3);
    expect(cleanFloatVal('9 . 3')).toBe(9.3);
    expect(cleanFloatVal('9 . 3 . 4')).toBe(9.3);
  });
});
