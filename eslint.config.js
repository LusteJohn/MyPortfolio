import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

const globals = {
  window: 'readonly',
  document: 'readonly',
  navigator: 'readonly',
  localStorage: 'readonly',
  fetch: 'readonly',
  IntersectionObserver: 'readonly',
  CustomEvent: 'readonly',
  console: 'readonly',
  process: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  setInterval: 'readonly',
  clearInterval: 'readonly'
}

export default [
  {
    ignores: ['dist/**', 'design-source/**', 'node_modules/**', 'public/**']
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/attributes-order': 'off',
      'vue/require-default-prop': 'off'
    }
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['scripts/**/*.mjs', 'vite.config.js', 'vitest.config.js'],
    languageOptions: {
      globals: { ...globals, Buffer: 'readonly', URL: 'readonly' }
    }
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: { ...globals, describe: 'readonly', it: 'readonly', expect: 'readonly' }
    }
  }
]