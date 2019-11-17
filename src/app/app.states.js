const UUID_V4_REGEX =
  '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

export default [
  {
    name: 'app',
    route: '/app',
    defaultChild: 'topics',
    template: () => import('./App.svelte'),
  },
  // --- About ---
  {
    name: 'app.about',
    route: '/about',
    template: () => import('./about/About.svelte'),
  },
  // --- Topics ---
  {
    name: 'app.topics',
    route: '/topics',
    defaultChild: 'no-task',
    template: () => import('./topics/Topics.svelte'),
  },
  {
    name: 'app.topics.no-task',
    route: '',
    template: () => import('./topics/tasks/NoTaskSelected.svelte'),
  },
  {
    name: 'app.topics.tasks',
    route: '/:topicId(' + UUID_V4_REGEX + ')',
    template: {
      component: () => import('./topics/tasks/Tasks.svelte'),
    },
  },
]
