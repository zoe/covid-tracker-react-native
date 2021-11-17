import moment, { Moment } from 'moment';

type TDateTypes = Moment | string;

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

export const yesterday = () => {
  return moment().subtract(1, 'days');
};

export const isDateBefore = (date: TDateTypes, compDate: TDateTypes): boolean => {
  return moment(date).isBefore(compDate);
};

export const dateToString = (date: Date) => moment(date).format('YYYY-MM-DD');
