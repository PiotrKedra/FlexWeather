module.exports = {
  'env': {
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'babel',
  ],
  'rules': {
    'require-jsdoc': 'off',
    'react/prop-types': 0,
    'max-len': ['error', {'code': 120}],
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
  },
};
