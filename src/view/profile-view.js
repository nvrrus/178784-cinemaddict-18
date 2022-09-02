import AbstractView from '../framework/view/abstract-view';
import { getProfileTemplate } from '../template/profile-template';

export default class ProfileView extends AbstractView {
  get template() {
    return getProfileTemplate();
  }
}
