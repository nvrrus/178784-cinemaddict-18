import { Constants, ControlType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import { formatMinutesToTime } from '../utils/film';

const getButtonTypeClass = (controlType) => {
  switch(controlType) {
    case ControlType.WATHCLIST:
      return Constants.TO_WATCH_LIST_CARD_BTN_CLASS;
    case ControlType.WATCHED:
      return Constants.MARK_WATCHED_CARD_BTN_CLASS;
    case ControlType.FAVORITE:
      return Constants.TO_FAVORITE_CARD_BTN_CLASS;
    default:
      throw new ControlTypeNotSupported(controlType);
  }
};

const getControlButton = (buttonType, isActive) => `<button class="film-card__controls-item ${getButtonTypeClass(buttonType)}
    ${isActive ? 'film-card__controls-item--active' : ''}" type="button"></button>`;

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
      ${getControlButton(ControlType.WATHCLIST, isInWatchlist)}
      ${getControlButton(ControlType.WATCHED, isAlreadyWatched)}
      ${getControlButton(ControlType.FAVORITE, isFavorite)}
    </div>
  </article>`;
};
