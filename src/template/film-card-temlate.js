import { ControlType, CssClasses, Settings } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import { truncate } from '../utils/common';
import { formatMinutesToTime, formatStringToYear } from '../utils/film';

const getButtonTypeClass = (controlType) => {
  switch(controlType) {
    case ControlType.WATHCLIST:
      return CssClasses.TO_WATCH_LIST_CARD_BTN;
    case ControlType.WATCHED:
      return CssClasses.MARK_WATCHED_CARD_BTN;
    case ControlType.FAVORITE:
      return CssClasses.TO_FAVORITE_CARD_BTN;
    default:
      throw new ControlTypeNotSupported(controlType);
  }
};

const getControlButton = (buttonType, isActive, isDisabled) => `<button class="film-card__controls-item ${getButtonTypeClass(buttonType)}
    ${isActive ? 'film-card__controls-item--active' : ''}" type="button" ${isDisabled ? 'disabled' : ''}></button>`;

export const getFilmCardTemlate = (film, isDisabled) => {
  const { id, title, totalRating, release, runtime, genre, poster, description, comments,
    watchlist, alreadyWatched, favorite } = film;
  return `<article class="film-card"  data-id="${id}">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formatStringToYear(release.date)}</span>
        <span class="film-card__duration">${formatMinutesToTime(runtime)}</span>
        <span class="film-card__genre">${genre[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncate(description, Settings.MAX_FILM_CARD_DESCRIPTION_LENGTH)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      ${getControlButton(ControlType.WATHCLIST, watchlist, isDisabled)}
      ${getControlButton(ControlType.WATCHED, alreadyWatched, isDisabled)}
      ${getControlButton(ControlType.FAVORITE, favorite, isDisabled)}
    </div>
  </article>`;
};
