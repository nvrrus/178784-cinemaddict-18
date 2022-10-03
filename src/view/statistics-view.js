import AbstractView from '../framework/view/abstract-view';

export default class StatisticsView extends AbstractView {
  #moviesCount;

  constructor(moviesCount) {
    super();
    this.#moviesCount = moviesCount;
  }

  get template() {
    const formated = new Intl.NumberFormat().format(this.#moviesCount);
    return `<section class="footer__statistics">
      <p>${formated} movies inside</p>
    </section>`;
  }
}
