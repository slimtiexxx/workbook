const CracoAlias = require('craco-alias')
const { compilerOptions } = require('./tsconfig.paths.json')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: compilerOptions.baseUrl,
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
}
