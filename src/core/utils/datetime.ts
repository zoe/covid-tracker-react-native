import moment, { Moment } from 'moment';

type DateTypes = Moment | string;

export const now = () => {
  return moment().format();
};

export const aWeekAgo = () => {
  return moment().subtract(7, 'days');
};

export const isDateBefore = (date: DateTypes, compDate: DateTypes): boolean => {
  return moment(date).isBefore(compDate);
};
