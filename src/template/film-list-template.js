export const getFilmListTemplate = (isTitleHidden, isExtra) => `

  <section class="films-list ${isExtra ? 'films-list--extra' : ''}">
    <h2 class="films-list__title ${isTitleHidden ? 'visually-hidden' : ''}">All movies. Upcoming</h2>

    <div class="films-list__container">

    </div>
  </section>
`;
