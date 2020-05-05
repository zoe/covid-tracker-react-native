import moment from 'moment';

export const now = () => {
  return moment().format();
};

export const aWeekAgo = () => {
  return moment().subtract(7, 'days');
};
