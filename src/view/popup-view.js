import { Constants, ControlType, KeysPressType } from '../constants/constants.module';
import WrappedAbstractStatefulView from '../framework-wrapper/view/wrapped-abstract-stateful-view';
import { getPopupTemplate } from '../template/popup-template';
import KeysPressObserver from '../utils/keys-press-observer';

export default class PopupView extends WrappedAbstractStatefulView {
  static parseFilmDataToState(film, filmComments) {
    return { ...film, filmComments: filmComments };
  }

  static parseNewCommentFromState(state) {
    if (!state.newComment || !state.commentEmoji) {
      return null;
    }
    return {
      comment: state.newComment,
      emotion: state.commentEmoji
    };
  }

  #bodyElement = document.querySelector(Constants.BODY_SELECTOR);

  constructor(film, filmComments) {
    super();
    this._setState(PopupView.parseFilmDataToState(film, filmComments));
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);
    this.#setInnerHandlers();
    KeysPressObserver.getInstance().addObserver(this.#onKeyPressed);
  }

  get template() {
    return getPopupTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setControlButtonClickHandler(this._callback.controlButtonClick);
    this.setDeleteCommentClick(this._callback.deleteCommentClick);
    this.setAddNewCommentHandler(this._callback.addNewComment);

    this.element.scrollTop = this._state.scrollTop;
    this.#bodyElement.classList.add(Constants.HIDE_OVERFLOW_CLASS);
  };

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
    this.element.addEventListener(Constants.SCROLL_EVENT_TYPE, this.#onScrollHandler);
  }

  removeElement() {
    super.removeElement();
    this.#bodyElement.classList.remove(Constants.HIDE_OVERFLOW_CLASS);
  }

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
      this._callback.controlButtonClick(ControlType.FAVORITE, this._state.id);
      return;
    }

    if (evt.target.classList.contains(Constants.TO_WATCH_LIST_POPUP_BTN_CLASS)) {
      this._callback.controlButtonClick(ControlType.WATHCLIST, this._state.id);
      return;
    }

    if (evt.target.classList.contains(Constants.MARK_WATCHED_POPUP_BTN_CLASS)) {
      this._callback.controlButtonClick(ControlType.WATCHED, this._state.id);
    }
  };

  setDeleteCommentClick(callback) {
    this._callback.deleteCommentClick = callback;
    this.element
      .querySelector(Constants.COMMENTS_LIST_SELECTOR)
      .addEventListener(Constants.CLICK_EVENT_TYPE, this.#onDeleteCommentClickHandler);
  }

  #onDeleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains(Constants.DELETE_COMMENT_BTN_CLASS)) {
      const commentElement = evt.target.closest(Constants.COMMENT_SELECTOR);
      this._callback.deleteCommentClick(commentElement.dataset?.id);
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

  setAddNewCommentHandler(callback) {
    this._callback.addNewComment = callback;
  }

  #onKeyPressed = (keyPressType) => {
    if (keyPressType === KeysPressType.CONTROL_ENTER) {
      const newComment = PopupView.parseNewCommentFromState(this._state);
      if (newComment) {
        this._callback.addNewComment(newComment);
      }
    }
  };
}
