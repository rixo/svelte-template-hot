<script>
  export let url
  export let routes
</script>

<style>
  h1 {
    color: red;
  }
</style>

<h1>Welcome!</h1>

<pre>
  {JSON.stringify(routes, false, 2)}
</pre>

<p>
  <a href={url('/about')}>About</a>
</p>

<p>
  <a href={url('/about')}>About</a>
</p>
