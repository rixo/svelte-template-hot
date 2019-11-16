import StateRouter from 'abstract-state-router'
import domready from 'domready'
import SvelteRenderer from 'svelte-state-renderer'

import login from './login/login.js'
import app from './app/app.js'

domready(function() {
  const stateRouter = StateRouter(
    SvelteRenderer(),
    document.querySelector('body')
  )

  const register = (...handlers) =>
    handlers.forEach(handler => handler(stateRouter, register))

  register(login, app)

  stateRouter.evaluateCurrentRoute('login')

  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      document.querySelectorAll('body *').forEach(el => el.remove())
    })
  }
})
