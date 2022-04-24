module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prittier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prittier/prittier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassing': 'off',
    'camelcase': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['error', {'argsIgnorePattern': 'next'}],
  },
};
