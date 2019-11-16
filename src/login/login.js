import model from 'model.js'

export default stateRouter => {
  stateRouter.addState({
    name: 'login',
    route: '/login',
    template: () => import('./Login.svelte'),
    activate: function({ domApi }) {
      domApi.$on('login', ({ detail: { username } }) => {
        if (username) {
          model.saveCurrentUser(username)
          stateRouter.go('app')
        }
      })
    },
  })
}
