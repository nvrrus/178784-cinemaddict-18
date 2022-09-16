import { FilterType } from '../constants/constants.module';

/**
 * @param {Array} films
 */
const getWatchListCount = (films) => films.filter((film) => film.isInWatchlist).length;

/**
 * @param {Array} films
 */
const getFavoritesCount = (films) => films.filter((film) => film.isFavorite).length;

/**
 * @param {Array} films
 */
const getAlreadyWachedCount = (films) => films.filter((film) => film.isAlreadyWatched).length;

const getActiveClassOrEmpty = (filterType, currentFilter) =>
  filterType === currentFilter ? 'main-navigation__item--active' : '';

export const getFiltersTemplate = (allFilms, filterType) => `

<nav class="main-navigation">
  <a href="#all" class="main-navigation__item ${getActiveClassOrEmpty(filterType, FilterType.ALL)}" data-type="all">All movies</a>
  <a href="#watchlist" class="main-navigation__item ${getActiveClassOrEmpty(filterType, FilterType.WATHCLIST)}" data-type="watchlist">Watchlist <span class="main-navigation__item-count">${getWatchListCount(allFilms)}</span></a>
  <a href="#history" class="main-navigation__item ${getActiveClassOrEmpty(filterType, FilterType.HISTORY)}" data-type="history">History <span class="main-navigation__item-count">${getAlreadyWachedCount(allFilms)}</span></a>
  <a href="#favorites" class="main-navigation__item ${getActiveClassOrEmpty(filterType, FilterType.FAVORITE)}" data-type="favorites">Favorites <span class="main-navigation__item-count">${getFavoritesCount(allFilms)}</span></a>
</nav>`;
