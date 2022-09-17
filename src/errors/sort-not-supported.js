export default class SortNotSupported extends Error {
  constructor(sortType) {
    super(`Sort type (${sortType}) is not supported`);
  }
}
