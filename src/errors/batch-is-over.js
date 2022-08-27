export default class BatchIsOver extends Error {
  constructor() {
    super('The batches are over');
  }
}
