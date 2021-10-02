module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'google', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'windows'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
  },
};
