// const pathConfig = require('./tsconfig.paths.json')
//
// const extractFolderName = (str) => {
//   const startIndex = str.indexOf('@') + 1
//   const endIndex = str.indexOf('/', startIndex)
//   return str.substring(startIndex, endIndex)
// }
//
// const importPatterns = Object.keys(pathConfig.compilerOptions.paths).map((name) => {
//   const folderName = extractFolderName(name)
//   return {
//     group: [`**/${folderName}`],
//     message: `Please use import from ${name}`,
//   }
// })

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'no-restricted-imports': 'off',
    // '@typescript-eslint/no-restricted-imports': [
    //   'error',
    //   {
    //     patterns: importPatterns,
    //   },
    // ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
