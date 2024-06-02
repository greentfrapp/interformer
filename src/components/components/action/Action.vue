<template>
  <div class="flex flex-col">
    <button @click="runAction"
      class="rounded bg-neutral-100 py-1 hover:bg-neutral-200">
      {{ props.properties.label }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ActionProperties } from './types'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<ActionProperties>,
    required: true,
  },
})

function runAction() {
  try {
    let remappedFunction = props.properties.function
    Object.keys(props.state).forEach(v => {
      remappedFunction = remappedFunction.replaceAll(
        v,
        `state.${v}`
      )
    })
    console.log(remappedFunction)
    return Function('state', 'return ' + remappedFunction)(props.state)
  } catch {
    return 'Invalid function'
  }
}
</script>
