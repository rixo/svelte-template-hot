import svelte from 'rollup-plugin-svelte-hot';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import staticFiles from 'rollup-plugin-static-files';

const nollup = !!process.env.NOLLUP
const production = !nollup && !process.env.ROLLUP_WATCH;
const hot = nollup

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
    dir: 'dist',
    entryFileNames: '[name].[hash].js',
    assetFileNames: '[name].[hash][extname]',
	},
	plugins: [
    // NOTE needs to be before svelte(...) because we intend to overwrite
    // public/bundle.css stub -- my guess is there is a better way to handle
    // css, any suggestion welcome
    !nollup &&
      staticFiles({
        include: ['./public'],
      }),

		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
      ...(!nollup && !hot && {
        css: css => css.write('dist/bundle.css'),
      }),
			hot: hot && {
        // `optimistic` will try to recover from runtime errors during component
        // init (i.e. constructor). This kind of error can be more safely
        // recovered from when your components are more pure. Otherwise, it can
        // get really funky.
        //
        // Compile error are _always_ recovered from with Nollup.
        //
        optimistic: true,
      },
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
    !production && !hot && livereload('dist'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
