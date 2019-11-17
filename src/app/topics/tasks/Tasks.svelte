<script context="module">
  import model from 'model.js'
  import { callAsync } from 'utils'

  export const resolve = async (data, { topicId }) => ({
    topic: await callAsync(model.getTopic, topicId),
    tasks: await callAsync(model.getTasks, topicId),
    topicId,
  })
</script>

<script>
  export let topicId
  export let topic
  export let tasks = []

  let newTaskName = ''

  const ifThenStr = (test, result) => (test ? result : '')

  const createNewTask = taskName => {
    const task = model.saveTask(topicId, taskName)
    tasks = [...tasks, task]
  }

  const setTaskDone = (index, done) => {
    tasks[index].done = done
    model.saveTasks(topicId, tasks)
  }

  const complete = taskIndex => {
    setTaskDone(taskIndex, true)
  }

  const restore = taskIndex => {
    setTaskDone(taskIndex, false)
  }

  const remove = taskIndex => {
    const tasksWithIndexElementRemoved = tasks.slice()
    tasksWithIndexElementRemoved.splice(taskIndex, 1)
    tasks = tasksWithIndexElementRemoved
    model.saveTasks(topicId, tasksWithIndexElementRemoved)
  }

  const onNewTaskKeyup = e => {
    if (e.keyCode === 13 && newTaskName) {
      createNewTask(newTaskName)
      newTaskName = ''
    }
  }
</script>

<style>
  .done-checkbox::before {
    margin-left: 0.2em;
  }
</style>

<h1>{topic.name}</h1>

<table class="table table-striped">
  <thead>
    <tr>
      <th>Task name</th>
      <th style="width: 100px">Complete</th>
      <th style="width: 87px">Remove</th>
    </tr>
  </thead>
  <tbody>
    {#each tasks as task, i}
      <tr>
        <td class="{ifThenStr(task.done, 'text-muted')} center-y">
          <span class="center-y">
            {task.name}
            {#if task.done}
              <span class="glyphicon glyphicon-ok text-success done-checkbox" />
            {/if}
          </span>

        </td>
        <td>
          {#if task.done}
            <button
              class="btn btn-primary full-width"
              on:click={() => restore(i)}>
              Restore
            </button>
          {:else}
            <button
              class="btn btn-success full-width"
              on:click={() => complete(i)}>
              Complete
            </button>
          {/if}
        </td>
        <td>
          <button class="btn btn-danger full-width" on:click={() => remove(i)}>
            Remove
          </button>
        </td>
      </tr>
    {/each}
    <tr>
      <td>
        <input
          type="text"
          class="form-control add-new-task"
          placeholder="New task"
          bind:value={newTaskName}
          on:keyup={onNewTaskKeyup} />
      </td>
    </tr>
  </tbody>
</table>

<slot />
