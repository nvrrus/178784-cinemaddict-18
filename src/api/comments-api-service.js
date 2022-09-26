import { HttpMethods } from '../constants/constants.module';
import ApiService from '../framework/api-service';
import { ApiSettings } from './api-settings';

export default class CommentsApiService extends ApiService {
  constructor() {
    super(ApiSettings.ENDPOINT, ApiSettings.AUTHORIZATION);
  }

  getByFilmId(filmId) {
    return this._load({url: `${ApiSettings.COMMENTS_URL}/${filmId}`, method: HttpMethods.GET} )
      .then(ApiService.parseResponse);
  }

  add(filmId, comment) {
    return this._load({
      url: `${ApiSettings.COMMENTS_URL}/${filmId}`,
      method: HttpMethods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(ApiService.parseResponse);
  }

  delete(commentId) {
    return this._load({
      url: `${ApiSettings.COMMENTS_URL}/${commentId}`,
      method: HttpMethods.DELETE
    });
  }
}
