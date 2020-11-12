import moment, { Moment } from 'moment';

type DateTypes = Moment | string;

export function getDaysAgo(startDate: Date): number {
  const now = new Date();
  return calcDaysDiff(startDate, now);
}

export const calcDaysDiff = (startDate: Date, endDate: Date) => {
  const startMoment = moment(startDate).startOf('day');
  const endMoment = moment(endDate).startOf('day');
  return Math.abs(endMoment.diff(startMoment, 'days'));
};

export const now = () => {
  return moment().format();
};

export const aWeekAgo = () => {
  return moment().subtract(7, 'days');
};

export const isDateBefore = (date: DateTypes, compDate: DateTypes): boolean => {
  return moment(date).isBefore(compDate);
};
