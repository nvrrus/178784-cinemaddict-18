import { Constants } from '../constants.module';
import CommentsModel from '../model/comments';
import { render } from '../render';
import { getRandomElement } from '../utils';
import FilmCommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  init = (filmsModel, commentsModel) => {
    const footerContainer = document.querySelector(Constants.FOOTER_SELECTOR);
    const randomFilm = getRandomElement(filmsModel.get());
    const filmPopupView = new FilmPopupView(randomFilm);
    const commentsListContainer = filmPopupView.getElement().querySelector(Constants.COMMENTS_CONTAINER_SELECTOR);
    const filmComments = commentsModel.get(randomFilm);

    render(filmPopupView, footerContainer);
    filmComments
      .sort(CommentsModel.compareByDate)
      .forEach((comment) => render(new FilmCommentView(comment), commentsListContainer));
  };
}
