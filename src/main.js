import FilmsApiService from './api/films-api-service.js';
import CommentsModel from './model/comments.js';
import FilmsModel from './model/films.js';
import FiltersModel from './model/filter.js';
import SortsModel from './model/sorts.js';
import MainPresenter from './presenter/main-presenter.js';

const filmsModel = new FilmsModel();
await filmsModel.initAsync();

const commentsModel = new CommentsModel();
const filtersModel = new FiltersModel();
const sortsModel = new SortsModel();


const mainPresenter = new MainPresenter(filmsModel, commentsModel, filtersModel, sortsModel);
mainPresenter.init();
