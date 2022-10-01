import Batcher from '../utils/batcher';
import { Constants, EventTypes, FilterType, Settings } from '../constants/constants.module';
import { remove, render, RenderPosition } from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';
import AbstractFilmListPresenter from './abstract-film-list-presenter';
import FilterNotSupported from '../errors/filter-not-supported';
import SortsModel from '../model/sorts';

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
    this.#sortsModel = sortsModel;
    this.#sortsModel.addObserver(this.#onSortsModelUpdate);
    this._filtersModel.addObserver(this.#onFiltersModelUpdate);
    this._filmsModel.addObserver(this.#onFilmsModelUpdate);
  }

  #onFilmsModelUpdate = (updateType, filmId) => {
    if (this._filtersModel.getFilterType() === FilterType.ALL) {
      this._updateFilmCard(filmId);
    }
    else {
      this.init();
    }
  };

  _getFilms() {
    const filterType = this._filtersModel.getFilterType();
    const sortType = this.#sortsModel.getSortType();
    this.#batcher = new Batcher(this._filmsModel.getFilms(filterType, sortType), Settings.FILMS_BATCH_SIZE);
    return this.#batcher.isAny() ? this.#batcher.nextBatch() : [];
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
    this.#showMoreButtonView.element.removeEventListener(EventTypes.CLICK, this.#onShowMoreClick);
  }

  #onFiltersModelUpdate = () => {
    this.init();
  };

  #onSortsModelUpdate = () => {
    this.init();
  };
}
