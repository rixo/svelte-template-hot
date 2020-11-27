<script>
	import { onMount } from 'svelte'

  export let name

	let counter = 0 // @hmr:keep

	onMount(() => {
		const interval = setInterval(() => {
			counter++
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	})
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to
    learn how to build Svelte apps.
  </p>
	<p>
		This page has been open for {counter}s.
	</p>
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
