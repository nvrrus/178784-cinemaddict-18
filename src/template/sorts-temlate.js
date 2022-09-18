import { SortType } from '../constants/constants.module';

const getIsActiveClassOrEmpty = (sortType, buttonSortType) =>
  sortType === buttonSortType ? 'sort__button--active' : '';

export const getSortTemplate = (sortType) => `
<ul class="sort">
  <li><a href="#" class="sort__button ${getIsActiveClassOrEmpty(SortType.DEFAULT, sortType)}" data-id="${SortType.DEFAULT}" >Sort by default</a></li>
  <li><a href="#" class="sort__button ${getIsActiveClassOrEmpty(SortType.DATE, sortType)}" data-id="${SortType.DATE}">Sort by date</a></li>
  <li><a href="#" class="sort__button ${getIsActiveClassOrEmpty(SortType.RATING, sortType)}" data-id="${SortType.RATING}">Sort by rating</a></li>
</ul>`;
