import { Constants } from '../constants/constants.module';
import { remove, render } from '../framework/render';
import ErrorAlertView from '../view/error-alert-view';

class ErrorAlertPresenter {
  /** @type {ErrorAlertView} */
  #view;

  /** @type {HTMLElement} */
  #container;

  static #instance;

  constructor() {
    if (ErrorAlertPresenter.#instance) {
      return ErrorAlertPresenter.#instance;
    }
    ErrorAlertPresenter.#instance = this;
    this.#container = document.querySelector(Constants.BODY_SELECTOR);
  }

  /**
   * @returns {ErrorAlertPresenter}
   */
  static getInstance() {
    return ErrorAlertPresenter.#instance;
  }

  showError(message) {
    if (this.#view) {
      return;
    }

    this.#view = new ErrorAlertView(message);
    render(this.#view, this.#container);
    setTimeout(() => {
      remove(this.#view);
      this.#view = null;
    }, Constants.ERROR_ALERT_TIMEOUT);
  }
}

// eslint-disable-next-line no-unused-vars -- Init singletone
const errorAlertPresenter = new ErrorAlertPresenter();
export default ErrorAlertPresenter;

