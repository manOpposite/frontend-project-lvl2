import fs from 'fs';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const firstFile = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const secondFile = fs.readFileSync(getFixturePath('file2.json'), 'utf-8');

test('genDiff', () => {
  const expected = fs.readFileSync(getFixturePath('expected_file.txt'), 'utf-8');
  const actual = genDiff(firstFile, secondFile);
  expect(actual).toEqual(expected);
});
