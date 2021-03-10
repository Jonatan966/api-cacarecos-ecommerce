module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@entities': './src/entities',
        '@middlewares': './src/middlewares',
        '@connectors': './src/connectors',
        '@repositories': './src/repositories',
        '@utils': './src/utils'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
