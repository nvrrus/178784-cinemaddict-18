import { Constants } from './constants.module.js';
import { render, RenderPosition } from './framework/render.js';
import CommentsModel from './model/comments.js';
import FilmsModel from './model/films.js';
import FilmPopupPresenter from './presenter/film-popup-presenter.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';

const headerContainer = document.querySelector(Constants.HEADER_SELECTOR);
const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const bodyElement = document.querySelector(Constants.BODY_SELECTOR);
const footerElement = document.querySelector(Constants.FOOTER_SELECTOR);
const filmsContainer = mainContainer.querySelector(Constants.FILMS_SELECTOR);

render(new ProfileView(), headerContainer);
render(new SortView(), mainContainer, RenderPosition.AFTERBEGIN);

const filtersPresenter = new FiltersPresenter(mainContainer);
const filmPopupPresenter = new FilmPopupPresenter(commentsModel, footerElement, bodyElement);
const filmsPresenter = new FilmsPresenter(filtersPresenter, filmPopupPresenter, filmsModel, filmsContainer);
filmsPresenter.init();
