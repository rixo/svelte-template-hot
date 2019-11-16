<script>
  import { createEventDispatcher } from 'svelte'
  import { UiView, getRouterContext } from 'svelte-state-renderer'

  const { asr } = getRouterContext()

  export let topics = []

  const hiddenIfNot = bool => (bool ? '' : 'hidden')

  const tasksUndone = {}
  const addingTopic = false
  let newTopic = ''

  const fire = createEventDispatcher()

  const onSubmit = () => fire('login', {})
</script>

<div class="container">
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
            <span class="badge">{tasksUndone[topic.id]}</span>
          </a>
        {/each}
      </div>
      <form action="" on:submit|preventDefault={onSubmit}>
        <div class="table">
          <div class="table-row-group">
            <div class="table-row">
              <div class="table-cell">
                <input
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
      <UiView />
    </div>
  </div>
</div>
