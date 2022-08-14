import { Constants } from '../constants.module';
import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  init = (mainContainer) => {

    const filmsContainer = mainContainer.querySelector(Constants.FILMS_SELECTOR);
    const allFilmsView = new FilmListView(true, false);
    const allFilmsConainer = allFilmsView.getElement().querySelector(Constants.FILMS_CONTAINER_SELECTOR);

    const topRatedFilmsView = new FilmListView(false, true);
    const topRatedFilmsContainer = topRatedFilmsView.getElement().querySelector(Constants.FILMS_CONTAINER_SELECTOR);

    const mostCommentedFilmsView = new FilmListView(false, true);
    const mostCommentedFilmsContainer = mostCommentedFilmsView.getElement().querySelector(Constants.FILMS_CONTAINER_SELECTOR);

    render(allFilmsView, filmsContainer);
    for (let i = 0; i < 4; i++) {
      render(new FilmCardView(), allFilmsConainer);
    }
    render(new ShowMoreButtonView(), allFilmsView.element);

    render(topRatedFilmsView, filmsContainer);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), topRatedFilmsContainer);
    }

    render(mostCommentedFilmsView, filmsContainer);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), mostCommentedFilmsContainer);
    }
  };
}
