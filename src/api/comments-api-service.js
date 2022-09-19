import { HttpMethods } from '../constants/constants.module';
import ApiService from '../framework/api-service';
import { ApiSettings } from './api-settings';

export default class CommentsApiService extends ApiService {
  constructor() {
    super(ApiSettings.ENDPOINT, ApiSettings.AUTHORIZATION);
  }

  getCommentsAsync(filmId) {
    return this._load({url: `${ApiSettings.COMMENTS_URL}/${filmId}`, method: HttpMethods.GET} )
      .then(ApiService.parseResponse);
  }
}
