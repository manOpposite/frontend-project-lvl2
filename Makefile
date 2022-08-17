install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watch

lint:
	npx eslint .
