/** 
 * @param {Array} films
 */
const getWatchListCount = (films) => films.filter(film => film.isInWatchlist).length;

/** 
 * @param {Array} films
 */
 const getFavoritesCount = (films) => films.filter(film => film.isFavorite).length;

/** 
 * @param {Array} films
 */
 const getAlreadyWachedCount = (films) => films.filter(film => film.isAlreadyWatched).length;

export const getFiltersTemplate = (allFilms) => `
<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getWatchListCount(allFilms)}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getAlreadyWachedCount(allFilms)}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getFavoritesCount(allFilms)}</span></a>
</nav>`;
