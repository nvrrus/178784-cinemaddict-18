import he from 'he';
import { formatStringToDateAndTime, getEmojiUrl } from '../utils/film';

export const getCommentTemplate = (commentObj, isDeleting) => {
  const { emotion, comment, author, date, id } = commentObj;
  return ` <li class="film-details__comment" data-id="${id}">
  <span class="film-details__comment-emoji">
    <img src="${getEmojiUrl(emotion)}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment ? he.encode(comment) : ''}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatStringToDateAndTime(date)}</span>
      <button class="film-details__comment-delete" ${isDeleting ? 'disabled' : ''}>${isDeleting ? 'Deleting' : 'Delete'}</button>
    </p>
  </div>
</li>`;
};
