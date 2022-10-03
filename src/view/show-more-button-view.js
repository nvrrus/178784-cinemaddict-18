import { EventTypes } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return '<button class="films-list__show-more">Show more</button>';
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(EventTypes.CLICK, this.#onClickHandler);
  }

  #onClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click(evt);
  };
}
