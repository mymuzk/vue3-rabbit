import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
// import someConfig from "some-other-config-you-use"
import eslintConfigPrettier from "eslint-config-prettier"

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },


  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  // someConfig,
  eslintConfigPrettier
]
