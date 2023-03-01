module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off',
    'no-loop-func': 'off',
    'no-useless-return': 'off',
    'default-param-last': 'off',
    'react/jsx-key': 'off',
    'no-else-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'off',
    'array-callback-return': 'off',
    'consistent-return': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'react/function-component-definition': 'off',
    'import/order': 'off',
    'react/no-array-index-key': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'dot-notation': 'off',
    'no-undef': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-await-in-loop': 'off',
    'default-case': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'react/jsx-filename-extension': [
      2, {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'
        ]
      }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
};
