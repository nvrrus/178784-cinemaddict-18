export default class ControlTypeNotSupported extends Error {
  constructor(controlType) {
    super(`Control type (${controlType}) is not supported`);
  }
}
