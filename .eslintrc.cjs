module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['prettier.config.cjs', '.eslintrc.cjs'],
  rules: {
    'prettier/prettier': 'error',
    'no-restricted-syntax': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    "@typescript-eslint/no-this-alias": 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
