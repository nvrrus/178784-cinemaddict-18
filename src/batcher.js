import BatchIsOver from './errors/batch-is-over';

export default class Batcher {
  #items;
  #batchSize;
  #batchesCount;
  #nextBatchIndex = 0;
  constructor(items, batchSize) {
    if (!items) {
      throw new Error('Items is undefined');
    }

    if (!(items instanceof Array)) {
      throw new Error('Items is not array');
    }

    this.#items = items.slice();
    this.#batchSize = batchSize;
    this.#batchesCount = Math.ceil(items.length / batchSize);
  }

  get batchesCount() {
    return this.#batchesCount;
  }

  get batchSize() {
    return this.#batchSize;
  }

  /** Есть ли еще доступные батчи */
  isAny() {
    return this.#nextBatchIndex < this.#batchesCount;
  }

  /** Возвращает следующий батч, если больше нет бросает исключение
   * @see BatchIsOver
   */
  nextBatch() {
    if (!this.isAny()) {
      throw new BatchIsOver();
    }
    const start = this.#nextBatchIndex * this.#batchSize;
    const end = start + this.#batchSize;
    this.#nextBatchIndex++;
    return this.#items.slice(start, end);
  }
}
