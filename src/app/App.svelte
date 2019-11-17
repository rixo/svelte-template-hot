<script context="module">
  import model from 'model.js'

  export const resolve = async (data, params, cb) => {
    const currentUser = model.getCurrentUser()
    if (currentUser.name) {
      return {
        currentUser,
      }
    } else {
      cb.redirect('login')
    }
  }
</script>

<script>
  import { getRouterContext } from 'svelte-state-renderer'

  const { asr } = getRouterContext()

  export let currentUser

  const onLogout = () => {
    model.saveCurrentUser(null)
    asr.go('login')
  }
</script>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <ul class="nav navbar-nav">
        <li class={asr.stateIsActive('app.topics') ? 'active' : ''}>
          <a href={asr.makePath('app.topics')}>Basic todo app!</a>
        </li>
        <li class={asr.stateIsActive('app.about') ? 'active' : ''}>
          <a href={asr.makePath('app.about')}>About the state router</a>
        </li>
        <li>
          <a href={asr.makePath('login')} on:click={onLogout}>"Log out"</a>
        </li>
      </ul>
    </div>
    <div class="nav navbar-right">
      <p class="navbar-text">Logged in as {currentUser.name}</p>
    </div>
  </div>
</nav>

<slot />
