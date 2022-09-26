const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

const getRandomElement = (source) => source[getRandomInteger(0, source.length - 1)];

const getRandomArray = (sourceArray) => {
  const count = getRandomInteger(1, sourceArray.length);
  const resultSet = new Set();
  for (let i = 0; i < count; i++) {
    resultSet.add(sourceArray[getRandomInteger(0, sourceArray.length - 1)]);
  }
  return Array.from(resultSet);
};

/** Обновляет элемент в массиве по идентификатору, при этом создается копия
 * @param {Array} items Массив элементов, в котором нужно обновить элемент
 * @param {string} itemId Идентификатор обновляемого элемента
 * @param {Object} update Объект с обновленной частью состояния
 * @return обновленная копия
 */
const getUpdateItem = (items, itemId, update) => {
  const index = items.findIndex((item) => item.id === itemId);
  if (index === -1) {
    return;
  }

  const updatedItem = {...items[index], ...update};
  return updatedItem;
};

export { getRandomInteger, getRandomFloat, getRandomElement,
  getRandomArray, getUpdateItem };
