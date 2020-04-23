import moment from 'moment';

export default function patientIsDueCheck(timeAgo) {
  const today = moment().utc().startOf("day")
  let diffDays = today.diff(moment(timeAgo).startOf("day"), "days");
  return diffDays > 0;
}