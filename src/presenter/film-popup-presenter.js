import { Constants } from '../constants.module';
import { remove, render } from '../framework/render';
import { isEscapeKey } from '../utils/common';
import FilmPopupView from '../view/film-popup-view';

export default class FilmPopupPresenter {
  #commentsModel;

  /** @type {FilmPopupView} */
  #filmPopupView;
  #footerElement;
  #bodyElement;

  constructor(commentsModel, footerElement, bodyElement) {
    this.#commentsModel = commentsModel;
    this.#footerElement = footerElement;
    this.#bodyElement = bodyElement;
  }

  init = (film) => {
    this.#renderPopup(film);
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);
    document.addEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
  };

  #onClickPopupCloseBtn = () => {
    this.#removePopup();
  };

  #renderPopup(film) {
    const filmComments = this.#commentsModel.get(film.id);
    this.#filmPopupView = new FilmPopupView(film, filmComments);
    render(this.#filmPopupView, this.#footerElement);
    this.#filmPopupView.setCloseClickHandler(this.#onClickPopupCloseBtn);
  }

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
    this.#bodyElement.classList.remove(Constants.HIDE_OVERFLOW_CLASS);
    document.removeEventListener(Constants.KEYDOWN_EVENT_TYPE, this.#onPopupEscapeKeyDown);
    document.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onClickPopupCloseBtn);
  }

  setClickHandlers(onControlButtonClick) {
    if (this.#filmPopupView) {
      this.#filmPopupView.setControlButtonClickHandlers(onControlButtonClick);
    }
  }

  updateFilm(film) {
    if (this.#filmPopupView) {
      remove(this.#filmPopupView);
      this.#renderPopup(film);
    }
  }
}
