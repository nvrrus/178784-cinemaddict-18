import { KeysPressType, UiBlockerTimeLimit } from '../constants/constants.module';
import { remove, render } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

import CommentsModel from '../model/comments';

import FilmsModel from '../model/films';
import KeysPressObserver from '../utils/keys-press-observer';
import PopupView from '../view/popup-view';
import ErrorAlertPresenter from './error-alert-presenter';

export default class PopupPresenter {
  #film;
  /** @type {PopupView} */
  #popupView;
  #footerElement;

  /** @type {FilmsModel} */
  #filmsModel;

  /** @type {CommentsModel} */
  #commentsModel;

  #uiBlocker = new UiBlocker(UiBlockerTimeLimit.LOWER_TIME, UiBlockerTimeLimit.UPPER_TIME);

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
    const comments = await this.#getCommentsAsync(film.id);

    if (film && comments) {
      this.#popupView = new PopupView(film, comments);
      render(this.#popupView, this.#footerElement);
      this.#popupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
      this.#popupView.setDeleteCommentClick(this.#onDeleteCommentAsync);
      this.#popupView.setAddNewCommentHandler(this.#onAddNewCommentAsync);

      this.#filmsModel.addObserver(this.#onFilmsModelUpdateAsync);
      KeysPressObserver.getInstance().addObserver(this.#onKeyPressed);
    }
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
    try {
      this.#popupView.updateElement({isDeletingCommentId: commentId});
      await this.#commentsModel.delete(this.#film.id, commentId);
      this.#filmsModel.onDeleteComment(this.#film.id, commentId);
      this.#popupView.updateElement({isDeletingCommentId: null});
    }
    catch {
      this.#popupView.updateElement({isDeletingCommentId: null});
      ErrorAlertPresenter.getInstance().showError('Не удалось удалить комментарий');
      this.#popupView.shake();
    }
  };

  #onAddNewCommentAsync = async (newComment) => {
    try {
      this.#uiBlocker.block();
      this.#popupView.updateElement({isAdding: true});
      const newCommentIds = await this.#commentsModel.add(this.#film.id, newComment);
      this.#filmsModel.onAddComment(this.#film.id, newCommentIds);
      this.#popupView.updateElement({ newComment: null, commentEmoji: null, isAdding: false });
      this.#uiBlocker.unblock();
    }
    catch {
      this.#uiBlocker.unblock();
      ErrorAlertPresenter.getInstance().showError('Не удалось добавить комментарий');
      this.#popupView.updateElement({isAdding: false});
      this.#popupView.shake();
    }
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
    const comments = await this.#getCommentsAsync(film.id);

    if (film && comments) {
      const newState = PopupView.parseFilmDataToState(film, comments);
      this.#popupView.updateElement(newState);
    }
  };

  async #getCommentsAsync(filmId) {
    try {
      return await this.#commentsModel.getComments(filmId);
    }
    catch {
      ErrorAlertPresenter.getInstance().showError('Не удалось получить комментарии');
    }
    return [];
  }

  setDisabled(isDisabled) {
    if (this.#popupView) {
      this.#popupView.updateElement({isDisabled: isDisabled});
    }
  }

  setAboarting() {
    if (this.#popupView) {
      this.setDisabled(false);
      this.#popupView.shake();
    }
  }
}
