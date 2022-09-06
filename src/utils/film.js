import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const getEmojiUrl = (emotion) => `./images/emoji/${emotion}.png`;

const formatStringToDateAndTime = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
const formatStringToDate = (date) => dayjs(date).format('DD MMMM YYYY');
const formatMinutesToTime = (minutes) => dayjs(minutes, 'minutes').format('HH[h] mm[m]');
const getDateSeconds = (date) => dayjs(date).unix();

const compareCommentsByDate = (comment1, comment2) => getDateSeconds(comment1.date) - getDateSeconds(comment2.date);
const compareFilmsByRatingDesc = (film1, film2) => film2.rating - film1.rating;
const compareFilmsByCommentsCountDesc = (film1, film2) => film2.comments.length - film1.comments.length;

export { getEmojiUrl, formatStringToDateAndTime, formatStringToDate, formatMinutesToTime, getDateSeconds,
  compareCommentsByDate, compareFilmsByRatingDesc, compareFilmsByCommentsCountDesc };