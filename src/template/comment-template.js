import { formatStringToDateAndTime, getEmojiUrl } from '../utils/film';

export const getCommentTemplate = (commentObj) => {
  const { emotion, comment, author, date } = commentObj;
  return ` <li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${getEmojiUrl(emotion)}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${formatStringToDateAndTime(date)}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};
