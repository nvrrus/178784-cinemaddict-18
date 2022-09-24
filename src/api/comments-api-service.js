import { HttpMethods } from '../constants/constants.module';
import ApiService from '../framework/api-service';
import { ApiSettings } from './api-settings';

export default class CommentsApiService extends ApiService {
  constructor() {
    super(ApiSettings.ENDPOINT, ApiSettings.AUTHORIZATION);
  }

  getByFilmIdAsync(filmId) {
    return this._load({url: `${ApiSettings.COMMENTS_URL}/${filmId}`, method: HttpMethods.GET} )
      .then(ApiService.parseResponse);
  }

  addAsync(filmId, comment) {
    return this._load({
      url: `${ApiSettings.COMMENTS_URL}/${filmId}`,
      method: HttpMethods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(ApiService.parseResponse);
  }

  deleteAsync(commentId) {
    return this._load({
      url: `${ApiSettings.COMMENTS_URL}/${commentId}`,
      method: HttpMethods.DELETE
    });
  }
}
