import { Constants } from './constants.module.js';
import CommentsModel from './model/comments.js';
import FilmsModel from './model/films.js';
import FilmsPresenter from './presenter/films-presenter.js';
import { render, RenderPosition } from './render.js';
import FiltersView from './view/fliters-view.js';
import ProfileView from './view/profile-view.js';
import SortView from './view/sort-view.js';

const headerContainer = document.querySelector(Constants.HEADER_SELECTOR);
const mainContainer = document.querySelector(Constants.MAIN_SELECTOR);
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

render(new ProfileView(), headerContainer);
render(new FiltersView(), mainContainer, RenderPosition.AFTERBEGIN);
render(new SortView(), mainContainer, RenderPosition.AFTERBEGIN);

new FilmsPresenter(filmsModel, commentsModel).init();
