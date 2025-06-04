import reactHooks from 'eslint-plugin-react-hooks';
import babelParser from '@babel/eslint-parser';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import i18next from 'eslint-plugin-i18next';
import { FlatCompat } from '@eslint/eslintrc';

import noDynamicTranslationKeys from './eslintRules/no-dynamic-translation-keys.js';

const compat = new FlatCompat();

const files = {
  js: ['**/*.js'],
  ts: ['**/!(*.d).ts'],
  tsx: ['**/*.tsx'],
  all: []
}

files.all = Object.values(files).flat();

export default tseslint.config(
  // Global settings
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
    },
    ignores: ['**/node_modules/*', '**/build/*', '**/*.cjs'],
  },

  // @eslint/js
  {
    files: files.all,
    extends: [eslint.configs.recommended],
    rules: {
      'no-console': 'error',
      eqeqeq: 'error',
      yoda: 'error',
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'no-restricted-imports': [
        'error',
        {
          name: 'react',
          importNames: ['default'],
          message: 'Use named imports instead',
        }
      ]
    },
    ignores: ['**/node_modules/*', '**/build/*'],
  },

  // eslint-plugin-react-hooks
  {
    files: files.all,
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  {
    files: files.all,
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': 'error',
    }
  },

  // eslint-plugin-react
  {
    files: files.tsx,
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      compat.extends('plugin:react/recommended'),
      compat.extends('plugin:react/jsx-runtime'),
    ],
    rules: {
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'always', children: 'ignore', propElementValues: 'always' },
      ],
      'react/jsx-boolean-value': ['error', 'always'],
      'react/no-multi-comp': 'error',
      'react/no-unused-prop-types': 'error',
    }
  },

  // typescript-eslint
  {
    files: [...files.ts, ...files.tsx],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // eslint-plugin-i18next
  {
    files: [...files.tsx, ...files.ts],
    extends: [i18next.configs['flat/recommended']]
  },

  {
  files: files.all,
  rules: {
    'custom/no-dynamic-translation-keys': 'error',
  },
  plugins: {
    custom: {
      rules: {
        'no-dynamic-translation-keys': noDynamicTranslationKeys,
      },
    },
  },
  ignores: ['**/node_modules/*', '**/build/*'],
}
);