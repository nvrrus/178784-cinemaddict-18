import AbstractView from '../../framework/view/abstract-view';
import './wrapped-abstract-view.css';

/** @const {string} Класс, реализующий эффект "покачивания головой" */
const SHAKE_CLASS_NAME = 'shake-absolute';

/** @const {number} Время анимации в миллисекундах */
const SHAKE_ANIMATION_TIMEOUT = 600;

export default class WrappedAbstractView extends AbstractView {
  constructor() {
    super();
    if (new.target === WrappedAbstractView) {
      throw new Error('Can\'t instantiate WrappedAbstractView, only concrete one.');
    }
  }

  shake(callback) {
    this.element.classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
