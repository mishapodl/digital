module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react-hooks'],

  // ignore some dir/files from lint checks
  ignorePatterns: ['*.test.tsx', 'graphql.tsx'], // ! Remove *.test.tsx pattern, when Tests will be write

  // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty-pattern': 'error',
    'object-shorthand': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn', //! ENABLE AFTER MAIN REFACTOR
    '@typescript-eslint/interface-name-prefix': 'off', //! Make required 'I' and set error after refactor
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-unresolved': 0,
    'import/default': 'off', //? weird issue related with this rule. Disable for now
    'import/newline-after-import': ['warn', { count: 1 }],
    'import/no-named-as-default-member': 'error',
    'import/order': [
      'error',
      { groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'], 'newlines-between': 'always' },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
}

/*
TODO think about this rules

react/jsx-sort-props
react/style-prop-object 
react/void-dom-elements-no-children
react/no-this-in-sfc
react/self-closing-comp
react/no-multi-comp 
react/no-deprecated 
react/no-unknown-property
react/no-array-index-key  (warn)
react/no-children-prop
react/boolean-prop-naming 
react/jsx-handler-names 
react/function-component-definition 
react/jsx-pascal-case
react/jsx-props-no-multi-spaces
react/jsx-space-before-closing
react/jsx-tag-spacing
react/jsx-uses-vars
react/jsx-wrap-multilines 
react/jsx-no-script-url 
react/jsx-no-bind 
react/jsx-no-target-blank 
react/jsx-no-duplicate-props
react/jsx-no-literals 
react/jsx-no-undef 
react/jsx-no-useless-fragment 
react/prefer-stateless-function
react/state-in-constructor 
react/jsx-props-no-spreading
react/destructuring-assignment
*/
