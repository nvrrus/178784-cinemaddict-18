import { EventTypes, KeysPressType, KeyType } from '../constants/constants.module';
import Observable from '../framework/observable';

class KeysPressObserver extends Observable{
  static #instance;
  #keyPressed = {};

  constructor() {
    super();
    if (KeysPressObserver.#instance) {
      return KeysPressObserver.#instance;
    }
    KeysPressObserver.#instance = this;
    document.addEventListener(EventTypes.KEYDOWN, this.#onKeyDownHandler);
    document.addEventListener(EventTypes.KEYUP, this.#onKeyUpHandler);
  }

  #onKeyDownHandler = (evt) => {
    this.#keyPressed[evt.key] = true;
    if (this.#keyPressed[KeyType.ESCAPE]) {
      this._notify(KeysPressType.ESCAPE);
    }
    if (this.#keyPressed[KeyType.CONTROL] && this.#keyPressed[KeyType.ENTER]) {
      this._notify(KeysPressType.CONTROL_ENTER);
    }
  };

  #onKeyUpHandler = (evt) => {
    delete this.#keyPressed[evt.key];
  };

  /**
   * @returns {KeysPressObserver}
   */
  static getInstance() {
    return KeysPressObserver.#instance;
  }
}

new KeysPressObserver();
export default KeysPressObserver;
