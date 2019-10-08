// This uses `esm` to convert rollup.config.js in esm (ES modules) format to
// commonjs, because Nollup does not support esm (and esm is the preferred
// format that is used in Svelte's official templates).

require = require('esm')(module)

module.exports = require('./rollup.config.js').default
