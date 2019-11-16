import model from 'model.js'

// import about from './about/about'
import topics from './topics/topics'

export default async (stateRouter, register) => {
  stateRouter.addState({
    name: 'app',
    route: '/app',
    defaultChild: 'topics',
    template: () => import('./App.svelte'),
    resolve(data, parameters, cb) {
      const currentUser = model.getCurrentUser()
      if (currentUser.name) {
        cb(null, {
          currentUser,
          otherShit: true
        })
      } else {
        cb.redirect('login')
      }
    },
    activate({ domApi }) {
      domApi.$on('logout', function() {
        model.saveCurrentUser(null)
        stateRouter.go('login')
      })
    },
  })
  register(topics)
}
