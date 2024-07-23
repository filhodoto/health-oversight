// See https://nextjs.org/docs/basic-features/eslint#lint-staged for details

const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{css,scss,json,md}': ['prettier --write'], // Make sure we ran prettier in files ESLINT does not support
};
