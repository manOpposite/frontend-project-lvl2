import _ from 'lodash';
import parsers from './parsers.js';

const resultArrayOfKeys = (obj1, obj2) => {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  const concatArray = [...arr1, ...arr2];
  const newArr = new Set(concatArray);
  const result = Array.from(newArr);
  return _.sortBy(result);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parsers(filepath1);
  const obj2 = parsers(filepath2);
  const arr = resultArrayOfKeys(obj1, obj2);
  const result = arr.reduce((acc, key) => {
    let accumulate = acc;
    const hasPropertyObj1 = Object.hasOwn(obj1, key);
    const hasPropertyObj2 = Object.hasOwn(obj2, key);
    if (hasPropertyObj1 && hasPropertyObj2) {
      if (obj1[key] === obj2[key]) {
        accumulate += `\n    ${key} : ${obj1[key]}`;
      } else {
        accumulate += `\n  - ${key} : ${obj1[key]}`;
        accumulate += `\n  + ${key} : ${obj2[key]}`;
      }
    }
    if (!hasPropertyObj1) {
      accumulate += `\n  + ${key} : ${obj2[key]}`;
    }
    if (!hasPropertyObj2) {
      accumulate += `\n  - ${key} : ${obj1[key]}`;
    }
    return accumulate;
  }, '');
  return `{${result}\n}`;
};

export default genDiff;
