<script context="module">
  import { tick } from 'svelte'
  import model from 'model.js'
  import { resolveAll } from 'utils'

  export const resolve = resolveAll({
    topics: model.getTopics,
    tasks: model.getTasks,
  })
</script>

<script>
  export let asr
  export let topics = []

  const hiddenIfNot = bool => (bool ? '' : 'hidden')

  let error = null
  let tasksUndone = {}
  let addingTopic = false
  let newTopic = ''

  let addTopicInput

  const recalculateTasksLeftToDoInTopic = topicId => {
    model.getTasks(topicId, (err, tasks) => {
      error = err
      if (err) return
      const leftToDo = tasks.reduce(function(toDo, task) {
        return toDo + (task.done ? 0 : 1)
      }, 0)
      tasksUndone = { ...tasksUndone, [topicId]: leftToDo }
    })
  }

  const setFocusOnAddTopicEdit = async () => {
    await tick()
    addTopicInput.focus()
  }

  const onSubmit = () => {
    const newTopicName = newTopic

    if (addingTopic && newTopicName) {
      const newTopic = model.addTopic(newTopicName)

      topics = [...topics, newTopic]

      recalculateTasksLeftToDoInTopic(newTopic.id)
      asr.go('app.topics.tasks', {
        topicId: newTopic.id,
      })
    } else if (!addingTopic) {
      setFocusOnAddTopicEdit()
    }

    addingTopic = !addingTopic
  }
</script>

<style>
  .error.row .alert {
    white-space: pre;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
</style>

<div class="container">
  {#if error}
    <div class="row error">
      <div class="alert alert-danger">{String(error)}</div>
    </div>
  {/if}
  <div class="row">
    <div class="col-sm-4">
      <div class="list-group">
        {#each topics as topic}
          <a
            href={asr.makePath('app.topics.tasks', { topicId: topic.id })}
            class="list-group-item {asr.stateIsActive('app.topics.tasks', {
              topicId: topic.id,
            }) ? 'active' : ''}">
            {topic.name}
            <span class="badge">{tasksUndone[topic.id] || 0}</span>
          </a>
        {/each}
      </div>
      <form on:submit|preventDefault={onSubmit}>
        <div class="table">
          <div class="table-row-group">
            <div class="table-row">
              <div class="table-cell">
                <input
                  bind:this={addTopicInput}
                  type="text"
                  class="new-topic-name form-control {hiddenIfNot(addingTopic)}"
                  placeholder="Topic name"
                  bind:value={newTopic} />
              </div>
              <div class="table-cell" style="width: 60px; vertical-align: top">
                <button type="submit" class="btn btn-default pull-right">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col-sm-8">
      <slot />
    </div>
  </div>
</div>
