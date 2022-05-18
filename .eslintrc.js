module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': ['error', { variables: false }],
    'vue/no-parsing-error': 'off',
    'no-multi-str': 0,
    'no-mixed-operators': 0,
    'no-unused-vars': 'warn',
    camelcase: 0,
    'max-len': 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
    'import/no-mutable-exports': 0,
    semi: 'warn',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'vue/no-v-model-argument': 'off',
    'linebreak-style': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/multi-word-component-names': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};