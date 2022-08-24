import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each(['json', 'yaml'])('genDiff', (extension) => {
  const filePath1 = getFixturePath(`file1.${extension}`);
  const filePath2 = getFixturePath(`file2.${extension}`);
  const expected = readFile('expected_file.txt');
  const actual = genDiff(filePath1, filePath2);
  expect(actual).toEqual(expected);
});
