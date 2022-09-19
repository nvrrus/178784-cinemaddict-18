import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Constants } from '../constants/constants.module';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getEmojiUrl = (emotion) => `./images/emoji/${emotion}.png`;

const formatStringToDateAndTime = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const formatStringToDate = (date) => dayjs(date).format('DD MMMM YYYY');
const formatStringToYear = (date) => dayjs(date).format('YYYY');

const formatMinutesToTime = (minutes) => dayjs.duration(minutes, 'minute').format('HH[h] mm[m]');
const getDateSeconds = (date) => dayjs(date).unix();

const compareCommentsByDate = (comment1, comment2) => getDateSeconds(comment1.date) - getDateSeconds(comment2.date);
const compareFilmsByRatingDesc = (film1, film2) => film2.rating - film1.rating;
const compareFilmsByReleaseDateDesc = (film1, film2) => film2.release.date - film1.release.date;

const compareFilmsByCommentsCountDesc = (film1, film2) => film2.comments.length - film1.comments.length;
const getFilmId = (targetElement) => {
  while (targetElement) {
    if (Constants.FILM_ID_DATA_ATTRIBUTE in targetElement.dataset) {
      return targetElement.dataset.id;
    }

    targetElement = targetElement.parentElement;
  }
};

export {
  getEmojiUrl, formatStringToDateAndTime, formatStringToDate, formatStringToYear,
  formatMinutesToTime, getDateSeconds,
  compareCommentsByDate, compareFilmsByRatingDesc, compareFilmsByCommentsCountDesc,
  compareFilmsByReleaseDateDesc, getFilmId
};
