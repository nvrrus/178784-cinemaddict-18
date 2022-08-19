import { Constants } from '../constants.module';
import FilmsModel from '../model/films';
import { render } from '../render';
import FilmCardView from '../view/film-card-view';
import FilmListView from '../view/film-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class FilmsPresenter {
  init = (filmsModel) => {
    const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
    const allFilms = filmsModel.get();
    const allFilmsView = new FilmListView(allFilms, null, false);

    const topRatedFilms = allFilms.sort(FilmsModel.compareByRatingDesc).slice(0, Constants.TOP_RATED_FILMS_COUNT);
    const topRatedFilmsView = new FilmListView(topRatedFilms, 'Top rated', true);

    const mostCommentedFilms = allFilms.sort(FilmsModel.compareByCommentsCountDesc).slice(0, Constants.MOST_COMMENTED_FILMS_COUNT);
    const mostCommentedFilmsView = new FilmListView(mostCommentedFilms, 'Most commented', true);

    this.filmsContainer = mainContainer.querySelector(Constants.FILMS_SELECTOR);

    this.renderFilms(allFilmsView, allFilms);
    render(new ShowMoreButtonView(), allFilmsView.element);

    this.renderFilms(topRatedFilmsView, topRatedFilms);
    this.renderFilms(mostCommentedFilmsView, mostCommentedFilms);
  };

  renderFilms(filmsView, films) {
    render(filmsView, this.filmsContainer);

    const allFilmsConainer = filmsView.getElement().querySelector(Constants.FILMS_CONTAINER_SELECTOR);
    for (const film of films) {
      render(new FilmCardView(film), allFilmsConainer);
    }
  }
}
