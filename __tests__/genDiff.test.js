import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const firstFile = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const secondFile = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');

test('genDiff', () => {
  const expected = fs.readFileSync(getFixturePath('expected_file.txt'), 'utf-8');
  const actual = genDiff(firstFile, secondFile);
  expect(actual).toEqual(expected);
});
