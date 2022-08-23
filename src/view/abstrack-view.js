import { createElement } from '../render';

export default class AbstractView {
  #element;
  get element() {
    if (this.#element) {
      return this.#element;
    }

    this.#element = createElement(this._innerGetTemlate());
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }

  _innerGetTemlate() {
    throw new Error('Method must be implemented in extend class');
  }
}
