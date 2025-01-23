import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: { ...eslintPluginReactHooks.configs.recommended.rules },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      'import/no-unused-modules': [
        'error',
        {
          // missingExports: true,
          unusedExports: true
        }
      ],
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
    },
    settings: {
      'import/extensions': [
        '.ts',
        '.tsx'
      ],
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          project: './'
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }
];
