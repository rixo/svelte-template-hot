import model from 'model.js'
import { all } from 'utils'

const UUID_V4_REGEX =
  '[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}'

export default function(stateRouter, register) {
  // stateRouter.addState({
  //   name: 'app.topics.tasks',
  //   route: '/:topicId(' + UUID_V4_REGEX + ')',
  //   template: {
  //     component: () => import('./Tasks.svelte'),
  //     options: {
  //       methods: {
  //         setTaskDone(index, done) {
  //           const { topicId, tasks } = this.get()
  //           tasks[index].done = done
  //           this.$set({ tasks })
  //           model.saveTasks(topicId, tasks)
  //         },
  //       },
  //     },
  //   },
  //   resolve: function(data, parameters) {
  //     return all({
  //       topic: model.getTopic.bind(null, parameters.topicId),
  //       tasks: model.getTasks.bind(null, parameters.topicId),
  //       topicId: parameters.topicId,
  //     })
  //   },
  //   activate: function(context) {
  //     const svelte = context.domApi
  //     const topicId = context.parameters.topicId
  //
  //     svelte.on('newTaskKeyup', function(e) {
  //       const { newTaskName } = svelte.get()
  //       if (e.keyCode === 13 && newTaskName) {
  //         createNewTask(newTaskName)
  //         svelte.set({
  //           newTaskName: '',
  //         })
  //       }
  //     })
  //
  //     svelte.on('remove', function(taskIndex) {
  //       const topicId = this.get().topicId
  //       const tasksWithIndexElementRemoved = this.get().tasks.slice()
  //
  //       tasksWithIndexElementRemoved.splice(taskIndex, 1)
  //
  //       this.set({
  //         tasks: tasksWithIndexElementRemoved,
  //       })
  //
  //       model.saveTasks(topicId, tasksWithIndexElementRemoved)
  //     })
  //
  //     function createNewTask(taskName) {
  //       const task = model.saveTask(topicId, taskName)
  //       const newTasks = svelte.get().tasks.concat(task)
  //       svelte.set({
  //         tasks: newTasks,
  //       })
  //     }
  //
  //     svelte.mountedToTarget.querySelector('.add-new-task').focus()
  //   },
  // })

  stateRouter.addState({
    name: 'app.topics.no-task',
    route: '',
    template: () => import('./NoTaskSelected.svelte'),
  })
}
