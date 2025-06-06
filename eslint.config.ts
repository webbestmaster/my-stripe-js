/* eslint-disable sort-keys, sonarjs/todo-tag */
import eslintJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import typescriptEslint from "typescript-eslint";

const files = ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"];

export default [
    eslintJs.configs.all,
    ...typescriptEslint.configs.all,
    jest.configs["flat/all"],
    sonarjs.configs.recommended,
    eslintConfigPrettier,
    {
        files,
        ...reactRecommended,
    },
    {
        files,
        ...jsxA11y.flatConfigs.strict,
    },
    {
        files,
        ...reactHooks.configs.recommended,
        plugins: {
            "react-hooks": reactHooks,
        },
    },
    {
        files,
        plugins: {
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "simple-import-sort/exports": "error",
            "simple-import-sort/imports": "error",
        },
    },
    {
        languageOptions: {
            globals: {
                JSX: true,
                console: true,
                module: true,
                require: true,
            },
            parserOptions: {
                ecmaFeatures: {jsx: true},
                ecmaVersion: 2020,
                project: ["./tsconfig.eslint.json"],
                sourceType: "module",
            },
        },
        settings: {react: {version: "detect"}},
        plugins: {unicorn: eslintPluginUnicorn},
        rules: {
            // Jest
            ...jest.configs["flat/all"].rules,
            "jest/require-hook": [2, {allowedFunctionCalls: ["innerInitialization"]}],

            // React
            "react/jsx-uses-react": 2,
            "react/react-in-jsx-scope": 0,
            "react/jsx-no-bind": 0,
            "react/jsx-newline": 0,
            "react/jsx-filename-extension": [2, {extensions: [".ts", ".tsx"]}],
            "react/no-unused-prop-types": 2,
            "react/sort-comp": 2,
            "react/jsx-sort-props": [
                2,
                {
                    reservedFirst: false,
                    shorthandLast: false,
                    ignoreCase: false,
                    callbacksLast: false,
                    noSortAlphabetically: false,
                },
            ],
            "react/jsx-closing-bracket-location": [2, "line-aligned"],
            "react/forbid-component-props": 0,
            "react/jsx-indent-props": [2, "first"],
            "react/jsx-no-literals": 0,
            "react/require-default-props": 0,
            "react/require-optimization": 2,
            "react/jsx-max-depth": [2, {max: 5}],
            "react/jsx-tag-spacing": [
                2,
                {
                    closingSlash: "never",
                    beforeSelfClosing: "always",
                    afterOpening: "never",
                    beforeClosing: "never",
                },
            ],
            "react/jsx-max-props-per-line": [2, {maximum: 5}],
            "react/jsx-one-expression-per-line": 0,
            "react/state-in-constructor": 0,
            "react/no-set-state": 2,

            // React-hooks, need to uncomment
            "react-hooks/rules-of-hooks": 2,
            "react-hooks/exhaustive-deps": 2,

            // Typescript
            "@typescript-eslint/array-type": [2, {"default": "generic"}],
            "@typescript-eslint/ban-ts-comment": 1,
            "@typescript-eslint/naming-convention": [
                2,
                {
                    selector: "typeAlias",
                    format: ["StrictPascalCase"],
                    suffix: ["Type"],
                },
                {
                    selector: "enum",
                    format: ["StrictPascalCase"],
                    suffix: ["Enum"],
                },
            ],
            "@typescript-eslint/no-shadow": [
                2,
                {
                    builtinGlobals: false,
                    hoist: "all",
                },
            ],
            "@typescript-eslint/no-unused-vars": [2, {varsIgnorePattern: "[iI]gnored"}],
            "@typescript-eslint/no-use-before-define": 2,
            "@typescript-eslint/no-misused-promises": [
                2,
                {
                    checksVoidReturn: {
                        arguments: true,
                        attributes: true,
                        properties: true,
                        returns: true,
                        variables: true,
                    },
                },
            ],
            "@typescript-eslint/no-floating-promises": [2, {ignoreIIFE: true}],
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": 0,
            // Typescript - defined by eslint
            "@typescript-eslint/space-before-function-paren": 0,
            "@typescript-eslint/indent": 0,
            "@typescript-eslint/comma-dangle": 0,
            "@typescript-eslint/no-magic-numbers": 0,
            "@typescript-eslint/no-extra-parens": 0,
            "@typescript-eslint/lines-around-comment": 0,
            "@typescript-eslint/lines-between-class-members": 0,
            "@typescript-eslint/block-spacing": 0,
            "@typescript-eslint/quotes": 0,
            "@typescript-eslint/use-unknown-in-catch-callback-variable": 0,
            "@typescript-eslint/require-array-sort-compare": [2, {ignoreStringArrays: false}],
            "@typescript-eslint/prefer-readonly-parameter-types": [
                0,
                /*
               {
                   "allow": [
                       {
                           "from": "package",
                           "name": "ReactNode",
                           "package": "react"
                       }
                   ]
               }
*/
            ],

            // Unicorn
            "unicorn/prefer-string-replace-all": 0,
            "unicorn/prefer-node-protocol": 2,
            "unicorn/no-array-callback-reference": 0,
            "unicorn/no-array-for-each": 0,
            "unicorn/filename-case": 2,
            "unicorn/no-array-reduce": 0,
            "unicorn/no-null": 0,
            "sonarjs/no-commented-code": 0,
            // "unicorn/no-fn-reference-in-iterator": 2,
            "unicorn/prevent-abbreviations": [
                2,
                {
                    replacements: {
                        attr: false,
                        attrs: false,
                        arg: false,
                        args: false,
                        env: false,
                        params: false,
                        prop: false,
                        props: false,
                        prev: false,
                        dev: false,
                        evt: false,
                        src: false,
                        ref: false,
                    },
                },
            ],

            // eslint
            "padded-blocks": [
                2,
                {
                    blocks: "never",
                    classes: "never",
                    switches: "never",
                },
            ],
            "func-style": [2, "declaration"],
            "function-call-argument-newline": [2, "consistent"],
            "max-len": [
                2,
                120,
                4,
                {
                    ignoreComments: true,
                    ignoreUrls: true,
                },
            ],
            "quote-props": [
                2,
                "as-needed",
                {
                    keywords: true,
                    unnecessary: true,
                    numbers: true,
                },
            ],
            quotes: 0,
            "sort-imports": 0,
            "array-element-newline": [2, "consistent"],
            "one-var": [
                2,
                {
                    "var": "always",
                    let: "never",
                    "const": "never",
                },
            ],
            "arrow-body-style": [2, "always"],
            "max-statements": [2, 20],
            "dot-location": [2, "property"],
            "max-lines-per-function": [2, 600],
            "object-property-newline": [2, {allowAllPropertiesOnSameLine: true}],
            "multiline-ternary": 0,
            "max-lines": [2, 1000],
            "newline-per-chained-call": [2, {ignoreChainWithDepth: 4}],
            "function-paren-newline": 0,
            "capitalized-comments": [
                0,
                "always",
                {
                    ignorePattern: "ignored|webpackChunkName",
                    ignoreInlineComments: true,
                },
            ],
            "prefer-named-capture-group": 0,
            "no-console": 0,
            "no-warning-comments": 0,
            "no-inline-comments": 0,
            "multiline-comment-style": 0,
            "no-ternary": 0,
            "wrap-regex": 0,
            "wrap-iife": [2, "inside"],
            "max-params": [2, 5],
            "id-length": [
                2,
                {
                    min: 3,
                    max: 34,
                    exceptions: ["id", "to", "x", "y"],
                },
            ],
        },
    },
    {
        ignores: [
            // Dist
            "dist/*",
            "dist-server/*",

            // NPM
            "node_modules/*",

            // Report
            "coverage-ts/*",
            "tsc-check/*",
            "coverage/*",

            // Style's d.ts
            // eslint-disable-next-line arrow-body-style, sonarjs/slow-regex
            (pathToFile: string): boolean => /\S+\.s?css\.d\.ts$/u.test(pathToFile),

            // Test
            "test-backstop/*",

            // Static site
            "static-site/*",

            // Storybook
            "storybook-static/*",

            // WASM
            "wasm/*",

            // Res
            "_res/*",

            // NextJS
            ".next",
            "out",
            "next-env.d.ts",
            "next.config.mjs",
            "app/image/**",
        ],
    },
];
