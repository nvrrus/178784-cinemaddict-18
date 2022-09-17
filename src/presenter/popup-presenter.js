import { KeysPressType } from '../constants/constants.module';
import { remove, render } from '../framework/render';
// eslint-disable-next-line no-unused-vars
import CommentsModel from '../model/comments';
// eslint-disable-next-line no-unused-vars
import FilmsModel from '../model/films';
import KeysPressObserver from '../utils/keys-press-observer';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #film;
  /** @type {PopupView} */
  #popupView;
  #footerElement;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {CommentsModel} */
  #commentsModel;

  /**
   *
   * @param {FilmsModel} filmsModel
   * @param {CommentsModel} commentsModel
   * @param {HTMLElement} footerElement;
   */
  constructor(filmsModel, commentsModel, footerElement) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#footerElement = footerElement;
  }

  init = (film) => {
    if (this.#popupView) {
      return;
    }
    this.#film = film;
    const comments = this.#commentsModel.get(film.id);

    this.#popupView = new PopupView(film, comments);
    render(this.#popupView, this.#footerElement);
    this.#popupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
    this.#popupView.setDeleteCommentClick(this.#onDeleteComment);
    this.#popupView.setAddNewCommentHandler(this.#onAddNewComment);

    this.#filmsModel.addObserver(this.#onFilmsModelUpdate);
    KeysPressObserver.getInstance().addObserver(this.#onKeyPressed);
  };

  #onClickPopupCloseBtn = () => {
    this.#removePopup();
  };

  #onDeleteComment = (commentId) => {
    this.#commentsModel.delete(this.#film.id, commentId);
    this.#onUpdateFilmComments();
  };

  #onAddNewComment = (newComment) => {
    this.#commentsModel.add(this.#film.id, newComment);
    this.#onUpdateFilmComments();
  };

  #onKeyPressed = (keyPressType) => {
    if (keyPressType === KeysPressType.ESCAPE) {
      this.#removePopup();
    }
  };

  #removePopup = () => {
    if (!this.#popupView) {
      return;
    }

    remove(this.#popupView);
    this.#popupView = null;

    this.#filmsModel.removeObserver(this.#onFilmsModelUpdate);
    KeysPressObserver.getInstance().removeObserver(this.#onKeyPressed);
  };

  #onUpdateFilmComments() {
    const comments = this.#commentsModel.get(this.#film.id);
    this.#filmsModel.update(this.#film.id, { comments: comments.map((c) => c.id) });
  }

  setControlButtonClickHandler(onControlButtonClick) {
    if (this.#popupView) {
      this.#popupView.setControlButtonClickHandler(onControlButtonClick);
    }
  }

  #onFilmsModelUpdate = (updateType, updatedFilmId) => {
    if (updatedFilmId !== this.#film.id || !this.#popupView) {
      return;
    }
    const film = this.#filmsModel.getById(this.#film.id);
    const comments = this.#commentsModel.get(film.id);
    const newState = PopupView.parseFilmDataToState(film, comments);
    this.#popupView.updateElement(newState);
  };
}
