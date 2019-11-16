<script>
  import { createEventDispatcher } from 'svelte'
  import { UiView, getRouterContext } from 'svelte-state-renderer'

  const { asr } = getRouterContext()

  export let currentUser

  const fire = createEventDispatcher()
</script>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <ul class="nav navbar-nav">
        <li class={asr.stateIsActive('app.topics') ? 'active' : ''}>
          <a href={asr.makePath('app.topics')}>Basic todo app!</a>
        </li>
        <!-- <li class={asr.stateIsActive('app.about') ? 'active' : ''}>
          <a href={asr.makePath('app.about')}>About the state router</a>
        </li> -->
        <li>
          <a href={asr.makePath('login')} on:click={e => fire('logout', e)}>
            "Log out"
          </a>
        </li>
      </ul>
    </div>
    <div class="nav navbar-right">
      <p class="navbar-text">Logged in as {currentUser.name}</p>
    </div>
  </div>
</nav>

<UiView />
