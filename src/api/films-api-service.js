import { HttpMethods } from '../constants/constants.module';
import ApiService from '../framework/api-service';

import { ApiSettings } from './api-settings';

export default class FilmsApiService extends ApiService {
  constructor() {
    super(ApiSettings.ENDPOINT, ApiSettings.AUTHORIZATION);
  }

  getAllAsync() {
    return this._load({url: ApiSettings.FILMS_URL, method: HttpMethods.GET})
      .then(ApiService.parseResponse);
  }

  updateAsync(id, update) {
    return this._load({
      url: `${ApiSettings.FILMS_URL}/${id}`,
      method: HttpMethods.PUT,
      body: JSON.stringify(update),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(ApiService.parseResponse);
  }
}
