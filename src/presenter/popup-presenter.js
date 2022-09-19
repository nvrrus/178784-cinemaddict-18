import { KeysPressType } from '../constants/constants.module';
import { remove, render } from '../framework/render';

import CommentsModel from '../model/comments';

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

  initAsync = async (film) => {
    if (this.#popupView) {
      return;
    }
    this.#film = film;
    const comments = await this.#commentsModel.getAsync(film.id);

    this.#popupView = new PopupView(film, comments);
    render(this.#popupView, this.#footerElement);
    this.#popupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
    this.#popupView.setDeleteCommentClick(this.#onDeleteCommentAsync);
    this.#popupView.setAddNewCommentHandler(this.#onAddNewCommentAsync);

    this.#filmsModel.addObserver(this.#onFilmsModelUpdateAsync);
    KeysPressObserver.getInstance().addObserver(this.#onKeyPressed);
  };

  isOpened() {
    if (this.#popupView) {
      return true;
    }
    return false;
  }

  #onClickPopupCloseBtn = () => {
    this.#removePopup();
  };

  #onDeleteCommentAsync = async (commentId) => {
    this.#commentsModel.delete(this.#film.id, commentId);
    await this.#onUpdateFilmCommentsAsync();
  };

  #onAddNewCommentAsync = async (newComment) => {
    this.#commentsModel.add(this.#film.id, newComment);
    await this.#onUpdateFilmCommentsAsync();
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

    this.#filmsModel.removeObserver(this.#onFilmsModelUpdateAsync);
    KeysPressObserver.getInstance().removeObserver(this.#onKeyPressed);
  };

  async #onUpdateFilmCommentsAsync() {
    const comments = await this.#commentsModel.getAsync(this.#film.id);
    this.#filmsModel.update(this.#film.id, { comments: comments.map((c) => c.id) });
  }

  setControlButtonClickHandler(onControlButtonClick) {
    if (this.#popupView) {
      this.#popupView.setControlButtonClickHandler(onControlButtonClick);
    }
  }

  #onFilmsModelUpdateAsync = async (updateType, updatedFilmId) => {
    if (updatedFilmId !== this.#film.id || !this.#popupView) {
      return;
    }
    const film = this.#filmsModel.getById(this.#film.id);
    const comments = await this.#commentsModel.getAsync(film.id);
    const newState = PopupView.parseFilmDataToState(film, comments);
    this.#popupView.updateElement(newState);
  };
}
