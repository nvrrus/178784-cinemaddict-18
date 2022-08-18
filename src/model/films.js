import { getAllCommentByIds } from '../mock/mock-comment';
import { getFilm } from '../mock/mock-film';

export default class FilmsModel {
  films = Array.from({length: 15}, getFilm);

  getFilms = () => this.films;
  getAllCommentByIds = () => getAllCommentByIds();
  static compareByRatingDesc = (film1, film2) => film2.rating - film1.rating;
  static compareByCommentsCountDesc = (film1, film2) => film2.commentIds.length - film1.commentIds.length;
}
