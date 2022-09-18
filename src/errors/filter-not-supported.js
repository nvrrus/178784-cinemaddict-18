export default class FilterNotSupported extends Error {
  constructor(filterType) {
    super(`Filter type (${filterType}) is not supported`);
  }
}
