import { Constants } from './constants.module.js';
import FilmsModel from './model/films.js';
import FilmPopupPresenter from './presenter/film-popup-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render, RenderPosition } from './render.js';
import { getRandomInteger } from './utils.js';
import FiltersView from './view/fliters-view.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';

const headerContainer = document.querySelector(Constants.HEADER_SELECTOR);
const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
const filmsModel = new FilmsModel();
const allFilms = filmsModel.getFilms();
const randomFilm = allFilms[getRandomInteger(0, allFilms.length - 1)];

render(new ProfileView(), headerContainer);
render(new FiltersView(), mainContainer, RenderPosition.AFTERBEGIN);
render(new SortView(), mainContainer, RenderPosition.AFTERBEGIN);

new FilmsPresenter().init(filmsModel);
new FilmPopupPresenter().init(randomFilm, filmsModel.getAllCommentByIds());
