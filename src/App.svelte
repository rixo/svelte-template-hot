<script>
  import Button from '@smui/button'
  import Fab from '@smui/fab'
  import Textfield from '@smui/textfield'
  import HelperText from '@smui/textfield/helper-text'
  import { Label, Icon } from '@smui/common'

  let superText = ''
</script>

<div>
  <Button on:click={() => alert('Clicked!')}>Just a Button</Button>
</div>

<div>
  <Button variant="raised">
    <Label>Raised Button, Using a Label</Label>
  </Button>
</div>

<div>
  <Button some-arbitrary-prop="placed on the actual button">Button</Button>
</div>

<div>
  <Textfield
    bind:value={superText}
    label="Super Text"
    input$aria-controls="super-helper"
    input$aria-describedby="super-helper" />
</div>

<div>
  <HelperText id="super-helper">
    What you put in this box will become super!
  </HelperText>
</div>
