import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const resultArrayOfKeys = (obj1, obj2) => {
  const arr1 = Object.keys(obj1);
  const arr2 = Object.keys(obj2);
  const concatArray = [...arr1, ...arr2];
  const newArr = new Set(concatArray);
  const result = Array.from(newArr);
  return _.sortBy(result);
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFileSync(path.resolve(filepath1), 'utf-8'));
  const obj2 = JSON.parse(readFileSync(path.resolve(filepath2), 'utf-8'));
  const arr = resultArrayOfKeys(obj1, obj2);
  const result = arr.reduce((acc, key) => {
    let accumulate = acc;
    const hasPropertyObj1 = Object.hasOwn(obj1, key);
    console.log(hasPropertyObj1);
    const hasPropertyObj2 = Object.hasOwn(obj2, key);
    console.log(hasPropertyObj2);
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
