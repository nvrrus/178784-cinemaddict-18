import { Constants } from '../constants.module';
import { formatStringToDate, formatMinutesToTime } from '../utils/film';

const getButtonTypeClass = (buttonType) => {
  switch (buttonType) {
    case Constants.CONTROL_BTN_TYPE.watchlist:
      return 'film-details__control-button--watchlist';
    case Constants.CONTROL_BTN_TYPE.watched:
      return 'film-details__control-button--watched';
    case Constants.CONTROL_BTN_TYPE.favorite:
      return 'film-details__control-button--favorite';
    default:
      throw new Error(`Control type: ${buttonType} not supported`);
  }
};

const getButtonName = (buttonType, isActive) => {
  switch (buttonType) {
    case 'watchlist':
      return isActive ? 'Already watchlist' : 'Add to watchlist';
    case 'watched':
      return isActive ? 'Already watched' : 'Mark as watched';
    case 'favorite':
      return isActive ? 'Already favorite' : 'Mark as favorite';
    default:
      throw new Error(`Control type: ${buttonType} not supported`);
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

export const getFilterPopupTemplate = (film, commentsTemplate) => {
  const { poster, title, alternativeTitle, rating, director, writers, actors, release, runtime,
    age, genres, description, comments, isInWatchlist, isAlreadyWatched, isFavorite } = film;
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

            <p class="film-details__age">${age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
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
                <td class="film-details__cell">${release.country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getGenresTemplate(genres)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${getControlButton(Constants.CONTROL_BTN_TYPE.watchlist, isInWatchlist)}
          ${getControlButton(Constants.CONTROL_BTN_TYPE.watched, isAlreadyWatched)}
          ${getControlButton(Constants.CONTROL_BTN_TYPE.favorite, isFavorite)}
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsTemplate}
          </ul>

          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
  `;
};
