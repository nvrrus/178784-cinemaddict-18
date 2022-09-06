const getTitleTemplate = (title) => {
  if (title) {
    return `<h2 class="films-list__title">${title}</h2>`;
  }
  return '';
};

export const getFilmListTemplate = (title) => `
  <section class="films-list ${title ? 'films-list--extra' : ''}">
    ${getTitleTemplate(title)} 

    <div class="films-list__container">

    </div>
  </section>
`;
