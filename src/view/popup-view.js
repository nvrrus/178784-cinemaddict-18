import { Constants, ControlType, CssClasses, CssSelectors, EventTypes, KeysPressType, Tags } from '../constants/constants.module';
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

  #bodyElement = document.querySelector(CssSelectors.BODY);

  constructor(film, filmComments) {
    super();
    this._setState(PopupView.parseFilmDataToState(film, filmComments));
    this.#bodyElement.classList.add(CssClasses.HIDE_OVERFLOW);
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
    this.#bodyElement.classList.add(CssClasses.HIDE_OVERFLOW);
  };

  #setInnerHandlers() {
    this.element.querySelector(CssSelectors.POPUP_EMOJI_CONTAINER)
      .querySelectorAll(`input[type=radio][name=${Constants.POPUP_EMOJI_RADIO_NAME}]`)
      .forEach((radio) => {
        radio.addEventListener(EventTypes.CHANGE, this.#onEmojiClickHandler);
      });

    this.element.addEventListener(EventTypes.SCROLL, this.#onScrollHandler);
    this.element
      .querySelector(CssSelectors.COMMENT_INPUT)
      .addEventListener(EventTypes.INPUT, this.#onCommentInputHandler);
    this.element.addEventListener(EventTypes.SCROLL, this.#onScrollHandler);
  }

  removeElement() {
    super.removeElement();
    this.#bodyElement.classList.remove(CssClasses.HIDE_OVERFLOW);
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.element.querySelector(CssSelectors.FILM_POPUP_CLOSE_BTN)
      .addEventListener(EventTypes.CLICK, this.#onCloseClickHandler);
  }

  #onCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick(evt);
  };

  setControlButtonClickHandler(callback) {
    this._callback.controlButtonClick = callback;
    this.element.querySelector(CssSelectors.POPUP_CONTROLS_CONTAINER)
      .addEventListener(EventTypes.CLICK, this.#onControlButtonClickHandler);
  }

  #onControlButtonClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== Tags.BUTTON) {
      return;
    }

    if (evt.target.classList.contains(CssClasses.TO_FAVORITE_POPUP_BTN)) {
      this._callback.controlButtonClick(ControlType.FAVORITE, this._state.id);
      return;
    }

    if (evt.target.classList.contains(CssClasses.TO_WATCH_LIST_POPUP_BTN)) {
      this._callback.controlButtonClick(ControlType.WATHCLIST, this._state.id);
      return;
    }

    if (evt.target.classList.contains(CssClasses.MARK_WATCHED_POPUP_BTN)) {
      this._callback.controlButtonClick(ControlType.WATCHED, this._state.id);
    }
  };

  setDeleteCommentClick(callback) {
    this._callback.deleteCommentClick = callback;
    this.element
      .querySelector(CssSelectors.COMMENTS_LIST)
      .addEventListener(EventTypes.CLICK, this.#onDeleteCommentClickHandler);
  }

  #onDeleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.classList.contains(CssClasses.DELETE_COMMENT_BTN)) {
      const commentElement = evt.target.closest(CssSelectors.COMMENT);
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
