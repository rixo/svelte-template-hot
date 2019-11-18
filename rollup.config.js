import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import hmr, { autoCreate } from 'rollup-plugin-hot'
import rollup_start_dev from './rollup_start_dev'
import * as fs from 'fs'
import * as path from 'path'

const test = process.env.NODE_ENV === 'test'
const watch = !!process.env.ROLLUP_WATCH
// NOTE The NOLLUP env variable is picked by various HMR plugins to switch
// in compat mode. You should not change its name (and set the env variable
// yourself if you launch nollup with custom comands).
const nollup = !!process.env.NOLLUP
const useLiveReload = !!process.env.LIVERELOAD

const dev = watch || nollup || useLiveReload
const production = !dev

const hot = nollup || (watch && !useLiveReload)

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
        // optimistic will try to recover from runtime
        // errors during component init
        optimistic: true,
        // turn on to disable preservation of local component
        // state -- i.e. non exported `let` variables
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
      // rollup-plugin-svelte-hot automatically resolves & dedup svelte
    }),
    commonjs(),

    // In dev mode, call `npm run start:dev` once
    // the bundle has been generated
    !production && !test && !nollup && rollup_start_dev,

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    useLiveReload && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),

    // Automatically create missing imported files. This helps keeping
    // the HMR server alive, because Rollup watch tends to crash and
    // hang indefinitely after you've tried to import a missing file.
    hot && autoCreate({
      include: 'src/**/*',
      // Set false to prevent recreating a file that has just been
      // deleted (Rollup watch will crash when you do that though).
      recreate: true,
    }),

    hot && hmr({
      public: abs`public`,
      inMemory: true,
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
