<script>
  import { route } from 'svelte-filerouter'
</script>

<style>
  section {
    background-color: #faf;
    padding: .5em 1em;
  }
</style>

<pre>${JSON.stringify($route, false, 2)}</pre>

<section>
  <slot />
</section>
