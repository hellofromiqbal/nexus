import moment from 'moment';

export const joinedDate = (timestamp) => {
  return moment(timestamp).format('ll');
};