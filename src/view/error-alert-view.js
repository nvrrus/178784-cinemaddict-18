import AbstractView from '../framework/view/abstract-view';

export default class ErrorAlertView extends AbstractView {
  #message;
  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return `<div class="error-allert">${this.#message}</div>`;
  }
}

