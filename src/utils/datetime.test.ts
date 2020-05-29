import { calcDaysDiff } from './datetime';

const utcComparisons = [
  { startDate: '2020-05-07T18:13:29Z', endDate: '2020-05-02T18:13:29Z', expected: 5 },
  { startDate: '2020-05-02T18:13:29Z', endDate: '2020-05-05T18:13:29Z', expected: 3 },
  { startDate: '2020-05-05T18:13:29Z', endDate: '2020-05-02T18:13:29Z', expected: 3 },
  { startDate: '2020-05-05T18:13:29Z', endDate: '2020-05-05T18:13:29Z', expected: 0 },
  { startDate: '2020-05-05T18:13:29Z', endDate: '2020-05-05T18:45:29Z', expected: 0 },
];

const pacificComparisons = [
  { startDate: '2020-05-05T11:13:29-07:00', endDate: '2020-05-05T11:13:29Z', expected: 0 },
  { startDate: '2020-05-05T18:13:29-07:00', endDate: '2020-05-05T18:13:29Z', expected: 0 },
];

describe('getDaysAgo', () => {
  it('works in UTC', () => {
    utcComparisons.forEach((test) => {
      const { startDate, endDate, expected } = test;
      expect(calcDaysDiff(new Date(startDate), new Date(endDate))).toBe(expected);
    });
  });
  it('works in pacific timezones', () => {
    pacificComparisons.forEach((test) => {
      const { startDate, endDate, expected } = test;
      expect(calcDaysDiff(new Date(startDate), new Date(endDate))).toBe(expected);
    });
  });
});
