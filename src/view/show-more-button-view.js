import AbstractView from './abstrack-view';

export default class ShowMoreButtonView extends AbstractView {
  innerGetTemlate() {
    return '<button class="films-list__show-more">Show more</button>';
  }
}
