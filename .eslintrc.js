module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['prettier', '@callstack'],
  rules: {
    'prettier/prettier': 'error',
  },
};
