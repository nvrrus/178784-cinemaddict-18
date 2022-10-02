import { Settings } from '../constants/constants.module';
import AbstractView from '../framework/view/abstract-view';

export default class ProfileView extends AbstractView {
  #watchedCount;

  constructor(watchedCount) {
    super();
    this.#watchedCount = watchedCount;
  }

  get template() {
    return `<section class="header__profile profile">
      ${this.#getProfileName()}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }

  #getProfileName() {
    if (this.#watchedCount === 0) {
      return '';
    }
    let profileName;
    if (this.#watchedCount < Settings.FUN_FILMS_COUNT) {
      profileName = 'Novice';
    }
    else if (this.#watchedCount < Settings.MOVIE_BUFF_FILMS_COUNT) {
      profileName = 'Fan';
    }
    else {
      profileName = 'Movie Buff';
    }
    return `<p class="profile__rating">${profileName}</p>`;
  }
}
