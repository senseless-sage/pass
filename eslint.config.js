import js from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc"

export default [
    js.configs.recommended,
    {
        ignores: ["eslint.config.js", "test/app/eslint.config.js"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        plugins: {
            jsdoc,
        },
        /**
         * Thanks and credits to the chromium devs for this set of rules!
         * I ve made just some small changes and updated it to the new eslint config format.
         */
        rules: {
            // plugins
            "jsdoc/no-undefined-types": ['error', { disableReporting: true, markVariablesAsUsed: true, },],
            // Possible Errors
            "no-await-in-loop": "warn",
            "no-extra-parens": ["error", "all", { conditionalAssign: false, allowParensAfterCommentPattern: "@type" }],
            "no-prototype-builtins": "error",
            "no-template-curly-in-string": "error",
            // Best Practices
            "accessor-pairs": "error",
            "array-callback-return": "error",
            "block-scoped-var": "error",
            "class-methods-use-this": "off",
            "complexity": "warn",
            "default-case": "error",
            "dot-location": ["error", "property"],
            "dot-notation": "warn",
            "eqeqeq": "error",
            "guard-for-in": "error",
            "no-alert": "warn",
            "no-caller": "error",
            "no-div-regex": "error",
            "no-empty-function": "error",
            "no-eq-null": "error",
            "no-eval": "warn",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-label": "error",
            "no-fallthrough": "error",
            "no-floating-decimal": "error",
            "no-implicit-coercion": "error",
            "no-implicit-globals": "error",
            "no-implied-eval": "error",
            "no-invalid-this": "off",
            "no-iterator": "error",
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-loop-func": "warn",
            "no-magic-numbers": ["off", {
                "ignore": [-1, 0, 1],
                "ignoreArrayIndexes": true
            }
            ],
            "no-multi-spaces": ["error", {
                "ignoreEOLComments": true,
                "exceptions": {
                    "AssignmentExpression": true,
                    "ArrowFunctionExpression": true,
                    "CallExpression": true,
                    "VariableDeclarator": true
                }
            }
            ],
            "no-multi-str": "error",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-octal-escape": "error",
            "no-param-reassign": "off",
            "no-proto": "error",
            "no-restricted-properties": "error",
            "no-return-await": "error",
            "no-script-url": "error",
            "no-self-compare": "error",
            "no-sequences": "error",
            "no-throw-literal": "error",
            "no-unmodified-loop-condition": "error",
            "no-unused-expressions": "error",
            "no-useless-call": "error",
            "no-useless-concat": "error",
            "no-useless-return": "error",
            "no-void": "error",
            "no-warning-comments": "off",
            "no-with": "error",
            "prefer-promise-reject-errors": "error",
            "radix": "error",
            "require-await": "error",
            "vars-on-top": "error",
            "wrap-iife": "error",
            "yoda": "error",
            // Strict Mode
            "strict": "error",
            // Variables
            "init-declarations": "off",
            "no-catch-shadow": "error",
            "no-label-var": "error",
            "no-restricted-globals": "error",
            "no-shadow": "off",
            "no-shadow-restricted-names": "error",
            "no-undef-init": "error",
            "no-use-before-define": "off",
            // Stylistic Issues
            "array-bracket-spacing": "error",
            "block-spacing": "error",
            "camelcase": "error",
            "capitalized-comments": "off",
            "comma-spacing": "error",
            "comma-style": "error",
            "computed-property-spacing": "error",
            "consistent-this": "error",
            "func-call-spacing": "error",
            "func-name-matching": "error",
            "func-names": "off",
            "id-blacklist": "error",
            "id-length": "off",
            "id-match": "error",
            "jsx-quotes": "error",
            "key-spacing": "off",
            "keyword-spacing": "error",
            "linebreak-style": ["error", "unix"],
            "line-comment-position": "off",
            "lines-around-comment": "off",
            "lines-around-directive": "error",
            "max-depth": ["error", 10],
            "max-len": "off",
            "max-lines": "off",
            "max-nested-callbacks": "error",
            "max-params": "off",
            "max-statements": "off",
            "max-statements-per-line": "error",
            "multiline-ternary": "off",
            "new-cap": ["error", { "capIsNewExceptionPattern": "$.*" }],
            "newline-after-var": "off",
            "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 5 }],
            "new-parens": "error",
            "no-array-constructor": "error",
            "no-bitwise": "error",
            "no-continue": "off",
            "no-inline-comments": "off",
            "no-mixed-operators": "off",
            "no-multi-assign": "warn",
            "no-multiple-empty-lines": "error",
            "nonblock-statement-body-position": "warn",
            "no-negated-condition": "off",
            "no-new-object": "error",
            "no-plusplus": "off",
            "no-restricted-syntax": "error",
            "no-tabs": "error",
            "no-ternary": "off",
            "no-underscore-dangle": "off",
            "no-unneeded-ternary": "error",
            "no-whitespace-before-property": "error",
            "object-curly-spacing": ["error", "always"],
            "one-var": ["error", "never"],
            "one-var-declaration-per-line": "error",
            "operator-assignment": "error",
            "operator-linebreak": "error",
            "padded-blocks": ["error", "never"],
            "padding-line-between-statements": "off",
            "quote-props": ["error", "as-needed"],
            "quotes": ["error", "double"],
            "require-jsdoc": "off",
            "semi": ["error"],
            "semi-spacing": "error",
            "sort-keys": "off",
            "sort-vars": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", {
                "anonymous": "always",
                "named": "never"
            }],
            "space-in-parens": "error",
            "space-infix-ops": "error",
            "space-unary-ops": "error",
            "template-tag-spacing": "error",
            "unicode-bom": "error",
            "wrap-regex": "off",
            // ECMAScript 6
            "arrow-body-style": ["error", "as-needed"],
            "arrow-spacing": "error",
            "no-duplicate-imports": "error",
            "no-restricted-imports": "error",
            "no-useless-computed-key": "error",
            "no-useless-constructor": "error",
            "no-useless-rename": "error",
            "no-var": "error",
            "object-shorthand": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            "prefer-destructuring": "off",
            "prefer-numeric-literals": "error",
            "prefer-rest-params": "error",
            "rest-spread-spacing": "error",
            "symbol-description": "error",
            "template-curly-spacing": "error",
            "yield-star-spacing": "error"
        }
    }
]