import { remove, render } from '../framework/render';
import FilmsModel from '../model/films';
import FilmsLoadingView from '../view/films-loading-view';
import ErrorAlertPresenter from './error-alert-presenter';

export default class FilmsLoadingPresenter {
  /** @type {FilmsModel} */
  #filmsModel;

  #filmsContainer;

  /**
   * @param {FilmsModel} filmsModel
   */
  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  async init() {
    const filmsLoadingView = new FilmsLoadingView();
    render(filmsLoadingView, this.#filmsContainer);
    try {
      await this.#filmsModel.init();
    }
    catch {
      ErrorAlertPresenter.getInstance().showError('Не удалось получить фильмы');
    }
    finally {
      remove(filmsLoadingView);
    }
  }
}
