import Batcher from '../utils/batcher';
import { Constants, FilterType } from '../constants/constants.module';
import { remove, render, RenderPosition } from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';
import AbstractFilmListPresenter from './abstract-film-list-presenter';
import FilterNotSupported from '../errors/filter-not-supported';

export default class FilmListAllPresenter extends AbstractFilmListPresenter {
  _renderPlace = RenderPosition.AFTERBEGIN;

  /** @type {Batcher} */
  #batcher;

  /** @type {ShowMoreButtonView} */
  #showMoreButtonView;

  /** @type {SortsModel} */
  #sortsModel;

  constructor(filmsModel, filtersModel, sortsModel, filtersPresenter, filmPopupPresenter, filmsContainer) {
    super(filmsModel, filtersModel, filtersPresenter, filmPopupPresenter, filmsContainer);
    this._filtersModel.addObserver(this.#onFiltersModelUpdate);
    this.#sortsModel = sortsModel;
    this.#sortsModel.addObserver(this.#onSortsModelUpdate);
  }

  _getFilms() {
    const filterType = this._filtersModel.getFilterType();
    const sortType = this.#sortsModel.getSortType();
    this.#batcher = new Batcher(this._filmsModel.getFilms(filterType, sortType), Constants.FILMS_BATCH_SIZE);
    return this.#batcher.isAny() ? this.#batcher.nextBatch() : [];
  }

  _getListTitle() {
    return null;
  }

  _getEmptyListTitle() {
    const filterType = this._filtersModel.getFilterType();
    switch(filterType) {
      case FilterType.ALL:
        return Constants.MAIN_LIST_EMPTY_TITLE;
      case FilterType.FAVORITE:
        return Constants.FAVORITE_LIST_EMPTY_TITLE;
      case FilterType.WATHCLIST:
        return Constants.WATCH_LIST_EMPTY_TITLE;
      case FilterType.HISTORY:
        return Constants.HISTORY_LIST_EMPTY_TITLE;

      default:
        throw new FilterNotSupported(filterType);
    }
  }

  _renderNotEmptyFilmList(films) {
    super._renderNotEmptyFilmList(films);
    if (this.#batcher.isAny()) {
      this.#showMoreButtonView = new ShowMoreButtonView();
      render(this.#showMoreButtonView, this._filmListView.element);
      this.#showMoreButtonView.setClickHandler(this.#onShowMoreClick);
    }
  }

  _renderEmptyFilmList() {
    super._renderEmptyFilmList(RenderPosition.AFTERBEGIN);
  }

  #onShowMoreClick = () => {
    const batch = this.#batcher.nextBatch();
    this._renderFilmCards(batch);
    if (!this.#batcher.isAny()) {
      this.#hideShowMoreButton();
    }
  };

  #hideShowMoreButton() {
    remove(this.#showMoreButtonView);
    this.#showMoreButtonView.element.removeEventListener(Constants.CLICK_EVENT_TYPE, this.#onShowMoreClick);
  }

  #onFiltersModelUpdate = () => {
    this.init();
  };

  #onSortsModelUpdate = () => {
    this.init();
  };
}
