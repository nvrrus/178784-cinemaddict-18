import { getFilmComments } from '../mock/mock-comment';

export default class CommentsModel {
  get = (film) => getFilmComments(film);
}
