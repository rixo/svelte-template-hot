import model from 'model.js'
import { all } from 'utils'

import tasks from './tasks/tasks'

export default (stateRouter, register) => {
  stateRouter.addState({
    name: 'app.topics',
    route: '/topics',
    defaultChild: 'no-task',
    template: () => import('./Topics.svelte'),
    resolve: all({ topics: model.getTopics, tasks: model.getTasks }),
    activate: function(context) {
      // const svelte = context.domApi
      //
      // function setFocusOnAddTopicEdit() {
      //   process.nextTick(function() {
      //     svelte.mountedToTarget.querySelector('.new-topic-name').focus()
      //   })
      // }
      //
      // function recalculateTasksLeftToDoInTopic(topicId) {
      //   model.getTasks(topicId, function(err, tasks) {
      //     const leftToDo = tasks.reduce(function(toDo, task) {
      //       return toDo + (task.done ? 0 : 1)
      //     }, 0)
      //
      //     svelte.set({
      //       tasksUndone: Object.assign({}, svelte.get().tasksUndone, {
      //         [topicId]: leftToDo,
      //       }),
      //     })
      //   })
      // }
      //
      // model.on('tasks saved', recalculateTasksLeftToDoInTopic)
      //
      // context.content.topics.forEach(function(topic) {
      //   recalculateTasksLeftToDoInTopic(topic.id)
      // })
      //
      // svelte.on('add-topic', function() {
      //   const addingTopic = svelte.get().addingTopic
      //   const newTopicName = svelte.get().newTopic
      //
      //   if (addingTopic && newTopicName) {
      //     const newTopic = model.addTopic(newTopicName)
      //
      //     svelte.set({
      //       topics: svelte.get().topics.concat(newTopic),
      //       newTopic: '',
      //     })
      //
      //     recalculateTasksLeftToDoInTopic(newTopic.id)
      //     stateRouter.go('app.topics.tasks', {
      //       topicId: newTopic.id,
      //     })
      //   } else if (!addingTopic) {
      //     setFocusOnAddTopicEdit()
      //   }
      //
      //   svelte.set({
      //     addingTopic: !addingTopic,
      //   })
      //
      //   return false
      // })
      //
      // context.on('destroy', function() {
      //   model.removeListener('tasks saved', recalculateTasksLeftToDoInTopic)
      // })
    },
  })

  register(tasks)
}
