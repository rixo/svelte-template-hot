<script>
  export let name = 'Cmp'
  export let color = '#000'
</script>

<div style={`color: ${color};`}>
  I am {name}
</div>

<style>
  div {
    font-weight: bold;
    border: 2px solid;
    display: inline-block;
    padding: .5em 1em;
    min-width: 100px;
  }
</style>
