import { getProfileTemplate } from '../template/profile-template';
import AbstractView from './abstrack-view';

export default class ProfileView extends AbstractView {
  innerGetTemlate() {
    return getProfileTemplate();
  }
}
