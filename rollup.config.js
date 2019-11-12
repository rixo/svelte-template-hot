import svelte from 'rollup-plugin-svelte-hot'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser'
import hmr from 'rollup-plugin-hot'
import { fileRouter } from 'svelte-filerouter'

import rollup_start_dev from './rollup_start_dev'

const noHot = !!process.env.LIVERELOAD
const nollup = !noHot && !!process.env.NOLLUP
const dev = nollup || process.env.ROLLUP_WATCH
const production = !dev
const hot = dev && !noHot
const legacy = !!process.env.LEGACY;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    dir: nollup ? 'bundle' : 'public/bundle',
  },
  plugins: [
    fileRouter({
      unknownPropWarnings: false,
      dynamicImports: true,
    }),

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
        nollup,
        // optimistic will try to recover from runtime
        // errors during component init
        optimistic: true,
        // turn on to disable preservation of local component
        // state -- i.e. non exported `let` variables
        noPreserveState: false,
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

    // NOTE this does not work with hot plugin currently
    legacy && babel({
      extensions: ['.js', '.mjs', '.html', '.svelte'],
      runtimeHelpers: true,
      exclude: ['node_modules/@babel/**'],
      presets: [
        ['@babel/preset-env', {
          targets: '> 0.25%, not dead'
        }]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-syntax-import-meta',
        ['@babel/plugin-transform-runtime', {
          useESModules: true
        }]
      ]
    }),

    // In dev mode, call `npm run start:dev` once
    // the bundle has been generated
    !production && !nollup && rollup_start_dev,

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
      public: `public`,
      inMemory: true,
      autocreate: !nollup && {
        include: 'src/**/*',
      },
      loaderFile: 'main.js',
    }),
  ],
  watch: {
    clearScreen: false,
  },
}
