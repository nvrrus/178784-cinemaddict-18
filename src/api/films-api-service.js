import { HttpMethods } from '../constants/constants.module';
import ApiService from '../framework/api-service';

import { ApiSettings } from './api-settings';

export default class FilmsApiService extends ApiService {
  constructor() {
    super(ApiSettings.ENDPOINT, ApiSettings.AUTHORIZATION);
  }

  async getAllAsync() {
    return this._load({url: ApiSettings.FILMS_URL, method: HttpMethods.GET})
      .then(ApiService.parseResponse);
  }
}
