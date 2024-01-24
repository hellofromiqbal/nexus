import moment from 'moment';

export const timeJoined = (timestamp) => {
  return moment(timestamp).format('ll');
};

export const timePosted = (timestamp) => {
  return moment(timestamp).startOf('hour').fromNow();
};