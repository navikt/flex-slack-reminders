const tseslint = require('typescript-eslint')
const { defineConfig } = require('eslint/config')
const prettier = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig(tseslint.configs.recommended, prettier, {
    rules: {
        'no-console': 'off',
    },
})
