import { Constants } from '../constants.module';
import { remove, render } from '../framework/render';
import { isEscapeKey } from '../utils/common';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  #commentsModel;

  /** @type {FilmPopupView} */
  #filmPopupView;
  #footerElement;

  constructor(commentsModel, footerElement) {
    this.#commentsModel = commentsModel;
    this.#footerElement = footerElement;
  }

  init = (film) => {
    const filmComments = this.#commentsModel.get(film.id);

    if (!this.#filmPopupView) {
      this.#filmPopupView = new FilmPopupView(film, filmComments);
      render(this.#filmPopupView, this.#footerElement);
    }

    this.#filmPopupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
    document.addEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
  };

  onControlButtonClick(controlType) {
    this.#filmPopupView?.onControlButtonClick(controlType);
  }

  isOpened() {
    if (this.#filmPopupView) {
      return true;
    }
    return false;
  }

  #onClickPopupCloseBtn = () => {
    this.#removePopup();
  };

  #onPopupEscapeKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#removePopup();
    }
  };

  #removePopup() {
    if (!this.#filmPopupView) {
      return;
    }

    remove(this.#filmPopupView);
    this.#filmPopupView = null;
    document.removeEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
    document.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickPopupCloseBtn);
  }

  setControlButtonClickHandler(onControlButtonClick) {
    if (this.#filmPopupView) {
      this.#filmPopupView.setControlButtonClickHandler(onControlButtonClick);
    }
  }
}
