import AbstractView from '../framework/view/abstract-view';

export default class FilmsLoadingView extends AbstractView {
  get template() {
    return `<section class="films-list">
              <h2 class="films-list__title">Loading...</h2>
            </section>`;
  }
}
