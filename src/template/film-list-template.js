const getTitleTemplate = (title) => {
  if (title) {
    return `<h2 class="films-list__title">${title}</h2>`;
  }
  return '';
};

export const getFilmListTemplate = (title, listId) => `
  <section class="films-list ${title ? 'films-list--extra' : ''}">
    ${getTitleTemplate(title)} 

    <div class="films-list__container films-list__container--${listId}">

    </div>
  </section>
`;
