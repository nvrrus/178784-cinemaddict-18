import CommentsModel from './model/comments.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filter.js';
import MainPresenter from './presenter/main-presenter.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();

const filmsPresenter = new MainPresenter(filmsModel, commentsModel, filtersModel);
filmsPresenter.init();
