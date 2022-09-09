import CommentsModel from './model/comments.js';
import FilmsModel from './model/films.js';
import MainPresenter from './presenter/main-presenter.js';

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const filmsPresenter = new MainPresenter(filmsModel, commentsModel);
filmsPresenter.init();
