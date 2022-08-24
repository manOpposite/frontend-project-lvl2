import path from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parsers = (filepath) => {
  const format = path.extname(path.resolve(filepath));
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  }
  if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(readFileSync(path.resolve(filepath), 'utf-8'));
};
export default parsers;
