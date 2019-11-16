<script>
  import { createEventDispatcher } from 'svelte'

  export let topic
  export let tasks = []

  let newTaskName = ''

  const ifThenStr = (test, result) => (test ? result : '')

  export function complete(taskIndex) {
    this.setTaskDone(taskIndex, true)
  }

  export function restore(taskIndex) {
    this.setTaskDone(taskIndex, false)
  }

  const fire = createEventDispatcher()
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
          <button
            class="btn btn-danger full-width"
            on:click={() => fire('remove', i)}>
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
          on:keyup={() => fire('newTaskKeyup')} />
      </td>
    </tr>
  </tbody>
</table>
