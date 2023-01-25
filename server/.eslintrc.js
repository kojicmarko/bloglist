module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: 'error',
    'no-console': 0,
    // disables airbnb guidelines which I don't understand
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
  },
};
