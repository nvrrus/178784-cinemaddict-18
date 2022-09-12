import { Constants } from '../constants.module';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getFilterPopupTemplate } from '../template/film-popup-template';

export default class FilmPopupView extends AbstractStatefulView {
  #bodyElement = document.querySelector(Constants.BODY_SELECTOR);

  static #parseFilmToState(film, filmComments) {
    return {...film, filmComments: filmComments};
  }

  constructor(film, filmComments) {
    super();
    this._state = FilmPopupView.#parseFilmToState(film, filmComments);

    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);

    this.#setInnerHandlers();
  }

  get template() {
    return getFilterPopupTemplate(this._state);
  }

  removeElement() {
    super.removeElement();
    this.#bodyElement.classList.remove(Constants.HIDE_OVERFLOW_CLASS);
  }

  #setInnerHandlers() {
    this.element.querySelector(Constants.POPUP_EMOJI_CONTAINER_SELECTOR)
      .querySelectorAll(`input[type=radio][name=${Constants.POPUP_EMOJI_RADIO_NAME}]`)
      .forEach((radio) => {
        radio.addEventListener(Constants.CHANGE_EVENT_TYPE, this.#onEmojiClickHandler);
      });

    this.element.addEventListener(Constants.SCROLL_EVENT_TYPE, this.#onScrollHandler);
    this.element
      .querySelector(Constants.COMMENT_INPUT_SELECTOR)
      .addEventListener(Constants.INPUT_EVENT_TYPE, this.#onCommentInputHandler);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
    this.element.scrollTop = this._state.scrollTop;
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);
  };

  updateState = (updateObject) => {
    this.updateElement(updateObject);
  };

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.element.querySelector(Constants.FILM_POPUP_CLOSE_BTN_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onCloseClickHandler);
  }

  #onCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick(evt);
  };

  setControlButtonClickHandler(callback) {
    this._callback.controlButtonClick = callback;
    this.element.querySelector(Constants.POPUP_CONTROLS_CONTAINER_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onControlButtonClickHandler);
  }

  #onControlButtonClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== Constants.BUTTON_TAG) {
      return;
    }

    if (evt.target.classList.contains(Constants.TO_FAVORITE_POPUP_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.favorite, this._state.id);
      return;
    }

    if (evt.target.classList.contains(Constants.TO_WATCH_LIST_POPUP_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.watchlist, this._state.id);
      return;
    }

    if (evt.target.classList.contains(Constants.MARK_WATCHED_POPUP_BTN_CLASS)) {
      this._callback.controlButtonClick(Constants.CONTROL_BTN_TYPE.watched, this._state.id);
    }
  };

  #onEmojiClickHandler = (evt) => {
    evt.preventDefault();

    const emoji = evt.target.value;
    this.updateElement({
      commentEmoji: emoji
    });
  };

  #onScrollHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      scrollTop: evt.target.scrollTop
    });
  };

  #onCommentInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      newComment: evt.target.value
    });
  };
}
