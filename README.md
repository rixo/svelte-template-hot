# Example: Svelte + Rollup + PostCSS

## Usage

```bash
npx degit rixo/svelte-template-hot#example-postcss svelte-app
cd svelte-app
npm install
```

Launch dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

NOTE: If you don't build before running the dev server, you'll get 404 on `bundle.css` and `global.css`.

On the other hand, if you run the dev server while the build files are available (i.e. run dev after run build), then it will break the very basic very ad hoc HMR support of `global.css` that is implemented in this template. The reason is that the browser will load the existing (built) `global.css` at startup, and will never unload it. Regular HMR support of CSS is still an item in a TODO for now.
