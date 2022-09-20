import { Constants, ControlType, EmojiType } from '../constants/constants.module';
import ControlTypeNotSupported from '../errors/control-type-not-supported';
import { formatStringToDate, formatMinutesToTime, compareCommentsByDate } from '../utils/film';
import PopupCommentView from '../view/popup-comment-view';

const getButtonTypeClass = (controlType) => {
  switch (controlType) {
    case ControlType.WATHCLIST:
      return Constants.TO_WATCH_LIST_POPUP_BTN_CLASS;
    case ControlType.WATCHED:
      return Constants.MARK_WATCHED_POPUP_BTN_CLASS;
    case ControlType.FAVORITE:
      return Constants.TO_FAVORITE_POPUP_BTN_CLASS;
    default:
      throw new ControlTypeNotSupported(controlType);
  }
};

const getButtonName = (buttonType, isActive) => {
  switch(buttonType) {
    case ControlType.WATHCLIST:
      return isActive ? Constants.ALREADY_IN_WATCH_LIST_BTN_NAME : Constants.ADD_TO_WATCH_LIST_BTN_NAME;
    case ControlType.WATCHED:
      return isActive ? Constants.ALREADY_WATCHED_BTN_NABE : Constants.MARK_AS_WATCHED_BTN_NAME;
    case ControlType.FAVORITE:
      return isActive ? Constants.ALREADY_FAVORITE_BTN_NABE : Constants.MARK_AS_FAVORITE_BTN_NAME;
    default:
      throw new ControlTypeNotSupported(buttonType);
  }
};

const getControlButton = (buttonType, isActive) => {
  const res = `<button type="button" class="film-details__control-button
    ${getButtonTypeClass(buttonType)}
    ${isActive ? 'film-details__control-button--active' : ''}"
    id="${buttonType}" name="${buttonType}">${getButtonName(buttonType, isActive)}</button>`;
  return res;
};

const getGenresTemplate = (genres) =>
  genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const getCommentsTemplate = (comments) => comments
  .slice()
  .sort(compareCommentsByDate)
  .map((comment) => new PopupCommentView(comment).template)
  .join('');


const getCommentEmojiTemplate = (emoji) => {
  if (!emoji) {
    return '';
  }
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}"></img>`;
};

const getRadioEmoji = (emojiType, checkedEmojiType) =>
  `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiType}" value="${emojiType}"
    ${emojiType === checkedEmojiType ? 'checked' : ''}>
  <label class="film-details__emoji-label" for="emoji-${emojiType}">
    <img src="./images/emoji/${emojiType}.png" width="30" height="30" alt="emoji" >
  </label>`;


export const getPopupTemplate = (data) => {
  const { poster, title, alternativeTitle, totalRating, director,
    writers, actors, release, runtime,
    ageRating, genre, description, watchlist,
    alreadyWatched, favorite, filmComments,
    commentEmoji, newComment } = data;
  return `
  <section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatStringToDate(release.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatMinutesToTime(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getGenresTemplate(genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${getControlButton(ControlType.WATHCLIST, watchlist)}
          ${getControlButton(ControlType.WATCHED, alreadyWatched)}
          ${getControlButton(ControlType.FAVORITE, favorite)}
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${filmComments.length ?? 0}</span></h3>

          <ul class="film-details__comments-list">
            ${getCommentsTemplate(filmComments)}
          </ul>
          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">
              ${getCommentEmojiTemplate(commentEmoji)}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input"
              placeholder="Select reaction below and write comment here" name="comment">${newComment ? newComment : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              ${getRadioEmoji(EmojiType.SMILE, commentEmoji)}
              ${getRadioEmoji(EmojiType.SLEEPING, commentEmoji)}
              ${getRadioEmoji(EmojiType.PUKE, commentEmoji)}
              ${getRadioEmoji(EmojiType.ANGRY, commentEmoji)}
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
  `;
};
