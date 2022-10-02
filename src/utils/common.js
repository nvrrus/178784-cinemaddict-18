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

const truncate = (input, maxLength) => {
  if (!input || maxLength <= 0) {
    return input;
  }
  if (input.length <= maxLength) {
    return input;
  }
  return `${input.slice(0, maxLength)}...`;
};

export { getUpdateItem, truncate };
