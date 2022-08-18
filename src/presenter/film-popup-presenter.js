import { Constants } from '../constants.module';
import { render } from '../render';
import FilmCommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  init = (film, allCommentByIds) => {
    const footerContainer = document.querySelector(Constants.FOOTER_SELECTOR);
    const filmPopupView = new FilmPopupView(film);
    render(filmPopupView, footerContainer);
    const commentsListContainer = filmPopupView.getElement().querySelector(Constants.COMMENTS_CONTAINER_SELECTOR);
    film.commentIds.forEach((id) => render(new FilmCommentView(allCommentByIds.get(id)), commentsListContainer));
  };
}
