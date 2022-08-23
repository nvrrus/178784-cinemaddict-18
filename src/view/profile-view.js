import { getProfileTemplate } from '../template/profile-template';
import AbstractView from './abstrack-view';

export default class ProfileView extends AbstractView {
  _innerGetTemlate() {
    return getProfileTemplate();
  }
}
