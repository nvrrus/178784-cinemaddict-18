import { Constants } from '../constants/constants.module';

const getTitleTemplate = (title) => {
  if (title) {
    return `<h2 class="films-list__title">${title}</h2>`;
  }
  return '';
};

export const getFilmListTemplate = (title, isExtra, listId) => `
  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    ${getTitleTemplate(title)}

    <div class="films-list__container" ${Constants.ID_DATA_ATTRIBUTE}='${listId}'>

    </div>
  </section>
`;
