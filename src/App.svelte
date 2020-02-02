<script>
	export let name;

	let cmp

	const setComponent = module => {
		cmp = module.default
	}

	const logError = err => {
		console.error(err && err.stack || err)
	}

	const loadFoo = e => {
		e.preventDefault()
		import('./Foo.svelte').then(setComponent).catch(logError)
	}

	const loadBar = e => {
		e.preventDefault()
		import('./Bar.svelte').then(setComponent).catch(logError)
	}
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>
		<a href on:click={loadFoo}>Foo</a>
		<a href on:click={loadBar}>Bar</a>
	</p>
	{#if cmp}
		<svelte:component this={cmp} />
	{:else}
		<p>
			Click one of the link to dynamically load a component (watch the Network
			tab in dev tools).
		</p>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
