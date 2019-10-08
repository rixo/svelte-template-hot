const path = require('path')

module.exports = {
  // NOTE Nollup does not support ES6 imports in config. You can use the `esm`
  //      package if your rollup config is ES6.
  config: path.resolve(__dirname, 'rollup.config.cjs'),
  hot: true,
  contentBase: './public',
  port: 5000,
  verbose: true,
}
