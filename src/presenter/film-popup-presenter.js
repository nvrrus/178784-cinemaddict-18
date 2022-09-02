import { Constants } from '../constants.module';
import { render } from '../framework/render';
import CommentsModel from '../model/comments';
import { getRandomElement } from '../utils/film';
import FilmCommentView from '../view/comment-view';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  init = (filmsModel, commentsModel) => {
    const footerContainer = document.querySelector(Constants.FOOTER_SELECTOR);
    const randomFilm = getRandomElement(filmsModel.get());
    const filmPopupView = new FilmPopupView(randomFilm);
    const commentsListContainer = filmPopupView.element.querySelector(Constants.COMMENTS_CONTAINER_SELECTOR);
    const filmComments = commentsModel.get(randomFilm);

    render(filmPopupView, footerContainer);
    filmComments
      .sort(CommentsModel.compareByDate)
      .forEach((comment) => render(new FilmCommentView(comment), commentsListContainer));
  };
}
