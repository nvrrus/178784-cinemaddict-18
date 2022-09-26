export default class CaseHelper {
  static objectToCamel(input) {
    if (typeof input !== 'object' || input === undefined || input === null) {
      return input;
    }
    if (Array.isArray(input)) {
      return input.map((item) => CaseHelper.objectToCamel(item));
    }

    const output = {};
    Object.entries(input).forEach(([key, value]) => {
      output[CaseHelper.stringToCamel(key)] = CaseHelper.objectToCamel(value);
    });
    return output;
  }

  static objectToSnake(input) {
    if (typeof input !== 'object' || input === undefined || input === null) {
      return input;
    }
    if (Array.isArray(input)) {
      return input.map((item) => CaseHelper.objectToSnake(item));
    }

    const output = {};
    Object.entries(input).forEach(([key, value]) => {
      output[CaseHelper.stringToSnake(key)] = CaseHelper.objectToSnake(value);
    });
    return output;
  }

  static stringToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static stringToCamel(str) {
    return str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
      .replace('-', '')
      .replace('_', ''));
  }
}
