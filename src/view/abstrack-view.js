import { createElement } from '../render';

export default class AbstractView {
  getElement() {
    if (this.element) {
      return this.element;
    }

    this.element = createElement(this.innerGetTemlate());
    return this.element;
  }

  innerGetTemlate() {
    throw new Error('Method must be implemented in extend class');
  }
}
