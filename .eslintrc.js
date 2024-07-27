module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["check-file", "jsdoc", "react", "prettier"],
    ignorePatterns: [
        "front-end-app/**/*.js",
        "node_modules/",
        "dist/",
        "build/",
        "icons/",
        "images/",
        "styles/",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    rules: {
        'accessor-pairs': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'camelcase': 'error',
        'check-file/filename-naming-convention': [
            'error',
            {
                '**/*.{js,ts}': 'KEBAB_CASE',
                'src/components/*.js': 'PASCAL_CASE',
                'src/pages/*.js': 'PASCAL_CASE',
                'src/sub-pages/*.js': 'PASCAL_CASE',
            }
        ],
        'check-file/folder-naming-convention': [
            'error',
            {
                '**/**/*': 'KEBAB_CASE',
                'src/*': 'KEBAB_CASE',
            }
        ],
        'curly': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'func-name-matching': 'error',
        'id-denylist': [
            'error',
            'err', 'e',
            'cb', 'values',
            'number', 'string',
            'boolean', 'bool',
            'callback', 'value'
        ],
        'id-length': ['error', { 'min': 3 }],
        'indent': ['error', 4],
        'jsdoc/require-jsdoc': [
            'error',
            {
                'require': {
                    'FunctionExpression': true,
                    'ArrowFunctionExpression': true,
                    'FunctionDeclaration': true,
                    'MethodDefinition': true
                }
            }
        ],
        'linebreak-style': ['error', 'unix'],
        'max-depth': ['error', 6],
        'max-lines': ['error',{'skipBlankLines': true, 'skipComments': true} ],
        'max-lines-per-function': ['error', { 'max': 100, 'skipBlankLines': true, 'skipComments': true }],
        'max-params': ['error', 4],
        'new-cap': 'error',
        'no-array-constructor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-const-assign': 'error',
        'no-constant-condition': 'error',
        'no-constructor-return': 'error',
        'no-delete-var': 'error',
        'no-dupe-args': 'error',
        'no-dupe-class-members': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty': 'error',
        'no-empty-function': 'error',
        'no-eval': 'error',
        'no-ex-assign': 'error',
        'no-extra-boolean-cast': 'error',
        'no-fallthrough': 'error',
        'no-import-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-lonely-if': 'error',
        'no-loss-of-precision': 'error',
        'no-multi-str': 'error',
        'no-negated-condition': 'error',
        'no-nested-ternary': 'error',
        'no-new-func': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-new-wrappers': 'error',
        'no-obj-calls': 'error',
        'no-octal': 'error',
        'no-param-reassign': 'error',
        'no-promise-executor-return': 'error',
        'no-prototype-builtins': 'error',
        'no-redeclare': 'error',
        'no-return-assign': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-setter-return': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-undef': 'error',
        'no-undefined': 'error',
        'no-unneeded-ternary': 'error',
        'no-unreachable': 'error',
        'no-unreachable-loop': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': 'error',
        'no-unsafe-optional-chaining': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-template': 'error',
        'quotes': ['error', 'single'],
        'require-await': 'error',
        'sort-imports': 'error',
        'sort-keys': 'error',
        'sort-vars': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'prettier/prettier': 'error'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
