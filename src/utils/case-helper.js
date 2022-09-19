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

  static toSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static stringToCamel = (str) => str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
}
