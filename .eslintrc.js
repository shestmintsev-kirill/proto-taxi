module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: [0, {
      properties: 'never'
    }],
    'one-var': ['error', {
      initialized: 'never',
      uninitialized: 'always'
    }],
    'no-var': 2,
    'object-shorthand': [2, 'always'],
    'quote-props': [2, 'as-needed'],
    'array-callback-return': [2, {
      allowImplicit: true
    }],
    'prefer-destructuring': [2, {
      VariableDeclarator: {
        array: false,
        object: true
      }
    }],
    'prefer-rest-params': 2,
    eqeqeq: [2, 'always'],
    'no-case-declarations': 2,
    'no-unneeded-ternary': 2,
    'no-else-return': ['error', {
      allowElseIf: true
    }],
    'newline-per-chained-call': [2, {
      ignoreChainWithDepth: 2
    }],
    'array-bracket-spacing': [2, 'never'],
    'object-curly-spacing': [2, 'always'],
    'arrow-parens': [2, 'as-needed'],
    'no-confusing-arrow': [2, {
      allowParens: true
    }],
    'no-dupe-class-members': 2,
    'no-duplicate-imports': 2,
    'no-restricted-syntax': [2, 'ForInStatement', 'ForOfStatement'],
    'prefer-arrow-callback': [2, {
      allowNamedFunctions: true
    }],
    indent: [2, 2, {
      SwitchCase: 1
    }],
    semi: [2, 'always'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': [2, {
      anonymous: 'never',
      named: 'never'
    }],
    quotes: [2, 'single'],
    'no-multi-assign': 2,
    'vue/html-indent': [2, 2, {
      attribute: 1,
      closeBracket: 0
    }],
    'vue/max-attributes-per-line': [2, {
      singleline: 5,
      multiline: {
        allowFirstLine: false
      }
    }],
    'vue/order-in-components': 2,
    'vue/attributes-order': [2, {
      order: [
        'GLOBAL',
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'UNIQUE',
        'OTHER_ATTR',
        'BINDING',
        'CONTENT',
        'EVENTS'
      ]
    }],
    'vue/html-self-closing': [2, {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/html-closing-bracket-newline': [2, {
      singleline: 'never',
      multiline: 'always'
    }],
    'vue/html-closing-bracket-spacing': [2, {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'always'
    }],
    'vue/valid-v-slot': 'off'
  }
};
