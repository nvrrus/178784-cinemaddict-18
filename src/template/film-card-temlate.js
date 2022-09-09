import { Constants } from '../constants.module';
import { formatMinutesToTime } from '../utils/film';

const getButtonTypeClass = (buttonType) => {
  switch(buttonType) {
    case Constants.CONTROL_BTN_TYPE.watchlist:
      return 'film-card__controls-item--add-to-watchlist';
    case Constants.CONTROL_BTN_TYPE.watched:
      return 'film-card__controls-item--mark-as-watched';
    case Constants.CONTROL_BTN_TYPE.favorite:
      return 'film-card__controls-item--favorite';
    default:
      throw new Error(`Control type: ${buttonType} not supported`);
  }
};

const getButtonName = (buttonType, isActive) => {
  switch(buttonType) {
    case 'watchlist':
      return isActive ? 'Already in watchlist' : 'Add to watchlist';
    case 'watched':
      return isActive ? 'Already watched' : 'Mark as watched';
    case 'favorite':
      return isActive ? 'Already favorite' : 'Mark as favorite';
    default:
      throw new Error(`Control type: ${buttonType} not supported`);
  }
};

const getControlButton = (buttonType, isActive) => `<button class="film-card__controls-item ${getButtonTypeClass(buttonType)}
    ${isActive ? 'film-card__controls-item--active' : ''}" type="button">
    ${getButtonName(buttonType, isActive)}</button>`;

export const getFilmCardTemlate = (film) => {
  const { id, title, rating, year, runtime, genres, poster, description, comments,
    isInWatchlist, isAlreadyWatched, isFavorite } = film;
  return `<article class="film-card"  data-id="${id}">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${formatMinutesToTime(runtime)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      ${getControlButton(Constants.CONTROL_BTN_TYPE.watchlist, isInWatchlist)}
      ${getControlButton(Constants.CONTROL_BTN_TYPE.watched, isAlreadyWatched)}
      ${getControlButton(Constants.CONTROL_BTN_TYPE.favorite, isFavorite)}
    </div>
  </article>`;
};
