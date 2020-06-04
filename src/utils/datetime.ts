import moment from 'moment';

export function getDaysAgo(startDate: Date): number {
  const now = new Date();
  return calcDaysDiff(startDate, now);
}

export const calcDaysDiff = (startDate: Date, endDate: Date) => {
  const startMoment = moment(startDate).startOf('day');
  const endMoment = moment(endDate).startOf('day');
  return Math.abs(endMoment.diff(startMoment, 'days'));
};
