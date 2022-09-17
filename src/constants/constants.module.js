export const Constants = {
  HEADER_SELECTOR: '.header',
  MAIN_SELECTOR: '.main',
  FOOTER_SELECTOR: '.footer',
  FILMS_SELECTOR: '.films',
  FILM_CARDS_CONTAINER_SELECTOR: '.films-list__container',
  FILM_POSTER_SELECTOR: '.film-card__poster',
  FILM_POPUP_CLOSE_BTN_SELECTOR: '.film-details__close-btn',
  FILM_LIST_EMPTY_TITLE: 'There are no movies in our database',
  BODY_SELECTOR: 'body',
  POPUP_CONTROLS_CONTAINER_SELECTOR: '.film-details__controls',
  POPUP_EMOJI_CONTAINER_SELECTOR: '.film-details__emoji-list',
  COMMENT_INPUT_SELECTOR: '.film-details__comment-input',
  COMMENTS_CONTAINER_SELECTOR: '.film-details__bottom-container',
  COMMENTS_LIST_SELECTOR: '.film-details__comments-list',
  COMMENT_SELECTOR: '.film-details__comment',
  FILTER_LINK_SELECTOR: '.main-navigation__item',
  POPUP_EMOJI_RADIO_NAME: 'comment-emoji',
  TO_FAVORITE_CARD_BTN_CLASS: 'film-card__controls-item--favorite',
  TO_WATCH_LIST_CARD_BTN_CLASS: 'film-card__controls-item--add-to-watchlist',
  MARK_WATCHED_CARD_BTN_CLASS: 'film-card__controls-item--mark-as-watched',
  TO_FAVORITE_POPUP_BTN_CLASS: 'film-details__control-button--favorite',
  TO_WATCH_LIST_POPUP_BTN_CLASS: 'film-details__control-button--watchlist',
  MARK_WATCHED_POPUP_BTN_CLASS: 'film-details__control-button--watched',
  DELETE_COMMENT_BTN_CLASS: 'film-details__comment-delete',
  ALREADY_IN_WATCH_LIST_BTN_NAME: 'Already in watchlist',
  ADD_TO_WATCH_LIST_BTN_NAME: 'Add to watchlist',
  ALREADY_WATCHED_BTN_NABE: 'Already watched',
  MARK_AS_WATCHED_BTN_NAME: 'Mark as watched',
  ALREADY_FAVORITE_BTN_NABE: 'Already favorite',
  MARK_AS_FAVORITE_BTN_NAME: 'Mark as favorite',
  MAIN_LIST_EMPTY_TITLE: 'There are no movies in our database',
  FAVORITE_LIST_EMPTY_TITLE: 'There are no favorite movies now',
  WATCH_LIST_EMPTY_TITLE: 'There are no movies in watchlist now',
  HISTORY_LIST_EMPTY_TITLE: 'There are no movies in history now',
  HIDE_OVERFLOW_CLASS: 'hide-overflow',
  LINK_TAG: 'A',
  IMG_TAG: 'IMG',
  BUTTON_TAG: 'BUTTON',
  CLICK_EVENT_TYPE: 'click',
  CHANGE_EVENT_TYPE: 'change',
  SCROLL_EVENT_TYPE: 'scroll',
  INPUT_EVENT_TYPE: 'input',
  KEYDOWN_EVENT_TYPE: 'keydown',
  KEYUP_EVENT_TYPE: 'keyup',
  TOP_RATED_FILM_LIST_TITLE: 'Top rated',
  TOP_RATED_FILMS_COUNT: 2,
  MOST_COMMENTED_FILM_LIST_TITLE: 'Most commented',
  MOST_COMMENTED_FILMS_COUNT: 2,
  FILMS_BATCH_SIZE: 5,
  FILM_ID_DATA_ATTRIBUTE: 'id'
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
  FILTER_UPDATE: 3,
  SORT_UPDATE: 4
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
