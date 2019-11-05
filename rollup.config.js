import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import hmr from 'rollup-plugin-hot'
import rollup_start_dev from './rollup_start_dev'
import * as fs from 'fs'
import * as path from 'path'

const test = process.env.NODE_ENV === 'test'
const noHot = !!process.env.LIVERELOAD
const nollup = !noHot && !!process.env.NOLLUP
const dev = nollup || process.env.ROLLUP_WATCH
const production = !dev && !test
const hot = dev && !noHot

const noPreserveState = !!process.env.NO_PRESERVE_STATE
const optimistic = !!process.env.OPTIMISTIC
const inMemory = !!process.env.IN_MEMORY

const root = fs.realpathSync(__dirname)

const abs = p => root + '/' + p

export default {
  input: abs`src/main.js`,
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: nollup ? 'bundle.js' : abs`public/bundle.js`,
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      ...(!hot && {
        css: css => {
          css.write('public/bundle.css')
        },
      }),
      hot: hot && {
        // expose test hooks from the plugin
        test,
        nollup,
        // optimistic will try to recover from runtime
        // errors during component init
        optimistic: true,
        noPreserveState,
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),

    // In dev mode, call `npm run start:dev` once
    // the bundle has been generated
    !production && !test && !nollup && rollup_start_dev,

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && !hot && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    hmr({
      enabled: hot,
      // Nollup compat: rewrites `import.meta.hot` to `module.hot`
      // in bundle sources
      nollup,
      public: abs`public`,
      inMemory,
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
