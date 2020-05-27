import moment from 'moment';

export function getDaysAgo(date: Date): number {
  const today = moment().utc().startOf('day');
  return today.diff(moment(date).startOf('day'), 'days');
}
