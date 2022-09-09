import { render, RenderPosition } from '../framework/render';
import FiltersView from '../view/fliters-view';

export default class FiltersPresenter {
  /** @type {FiltersView} */
  #filtersView;
  #mainContainer;
  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init(allFilms) {
    if (this.#filtersView) {
      this.#destroy();
    }
    this.#filtersView = new FiltersView(allFilms);
    render(this.#filtersView, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #destroy() {
    this.#filtersView.element.remove();
    this.#filtersView.removeElement();
  }
}
