
export const Settings = {
  TOP_RATED_FILMS_COUNT: 2,
  MOST_COMMENTED_FILMS_COUNT: 2,
  FILMS_BATCH_SIZE: 5,
  ERROR_ALERT_TIMEOUT: 3000,
  MAX_FILM_CARD_DESCRIPTION_LENGTH: 139,
  FUN_FILMS_COUNT: 11,
  MOVIE_BUFF_FILMS_COUNT: 21,

};

export const CssSelectors = {
  HEADER: '.header',
  MAIN: '.main',
  FOOTER: '.footer',
  FILMS: '.films',
  FILM_POSTER: '.film-card__poster',
  FILM_POPUP_CLOSE_BTN: '.film-details__close-btn',
  BODY: 'body',
  POPUP_CONTROLS_CONTAINER: '.film-details__controls',
  POPUP_EMOJI_CONTAINER: '.film-details__emoji-list',
  COMMENT_INPUT: '.film-details__comment-input',
  COMMENTS_LIST: '.film-details__comments-list',
  COMMENT: '.film-details__comment',
  FILTER_LINK: '.main-navigation__item',
};

export const CssClasses = {
  TO_FAVORITE_CARD_BTN: 'film-card__controls-item--favorite',
  TO_WATCH_LIST_CARD_BTN: 'film-card__controls-item--add-to-watchlist',
  MARK_WATCHED_CARD_BTN: 'film-card__controls-item--mark-as-watched',
  TO_FAVORITE_POPUP_BTN: 'film-details__control-button--favorite',
  TO_WATCH_LIST_POPUP_BTN: 'film-details__control-button--watchlist',
  MARK_WATCHED_POPUP_BTN: 'film-details__control-button--watched',
  DELETE_COMMENT_BTN: 'film-details__comment-delete',
  HIDE_OVERFLOW: 'hide-overflow',
};

export const Tags = {
  LINK: 'A',
  IMG: 'IMG',
  BUTTON: 'BUTTON',
};

export const EventTypes = {
  CLICK: 'click',
  CHANGE: 'change',
  SCROLL: 'scroll',
  INPUT: 'input',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
};

export const Constants = {
  FILM_LIST_EMPTY_TITLE: 'There are no movies in our database',
  MAIN_LIST_EMPTY_TITLE: 'There are no movies in our database',
  FAVORITE_LIST_EMPTY_TITLE: 'There are no favorite movies now',
  WATCH_LIST_EMPTY_TITLE: 'There are no movies in watchlist now',
  HISTORY_LIST_EMPTY_TITLE: 'There are no movies in history now',
  TOP_RATED_FILM_LIST_TITLE: 'Top rated',
  MOST_COMMENTED_FILM_LIST_TITLE: 'Most commented',

  POPUP_EMOJI_RADIO_NAME: 'comment-emoji',
  ALREADY_IN_WATCH_LIST_BTN_NAME: 'Already in watchlist',
  ADD_TO_WATCH_LIST_BTN_NAME: 'Add to watchlist',
  ALREADY_WATCHED_BTN_NABE: 'Already watched',
  MARK_AS_WATCHED_BTN_NAME: 'Mark as watched',
  ALREADY_FAVORITE_BTN_NABE: 'Already favorite',
  MARK_AS_FAVORITE_BTN_NAME: 'Mark as favorite',

  FILM_ID_DATASET_KEY: 'id',
  ID_DATA_ATTRIBUTE: 'data-id',
  NOW: 'now'
};

export const ControlType = {
  WATHCLIST: 'watchlist',
  FAVORITE: 'favorite',
  WATCHED: 'watched'
};

export const EmojiType = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry'
};

export const FilterType = {
  ALL: 'all',
  WATHCLIST: 'watchlist',
  FAVORITE: 'favorites',
  HISTORY: 'history'
};

export const UpdateType = {
  FILM_UPDATE: 1,
  COMMENT_DELETE: 2,
  COMMENT_ADD: 3,
  FILTER_UPDATE: 4,
  SORT_UPDATE: 5
};

export const KeyType = {
  ESCAPE: 'Escape',
  CONTROL: 'Control',
  ENTER: 'Enter',
};

export const KeysPressType = {
  ESCAPE: 'Escape',
  CONTROL_ENTER: 'Control_Enter'
};

export const SortType = {
  DEFAULT: 'Default',
  DATE: 'Date',
  RATING: 'Rating'
};

export const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATHC: 'PATCH',
  DELETE: 'DELETE',
};

export const UiBlockerTimeLimit = {
  LOWER_TIME: 350,
  UPPER_TIME: 1000
};
