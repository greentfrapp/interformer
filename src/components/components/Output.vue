<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.label || 'Output ' + props.id }}</TextInputLabel>
    <TextOutput :class="result === 'Invalid function' ? 'text-neutral-300' : ''">
      {{ result }}
    </TextOutput>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import TextInputLabel from '../elements/TextInputLabel.vue'
import TextOutput from '../elements/TextOutput.vue'

const props = defineProps({
  label: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  state: {
    type: Object as PropType<any>,
    required: true,
  },
})

const result = computed(() => {
  try {
    let remappedFunction = props.id
    Object.keys(props.state).forEach(v => {
      remappedFunction = remappedFunction.replaceAll(
        v,
        `state.${v}`
      )
    })
    return Function('state', 'return ' + remappedFunction)(props.state)
  } catch {
    return 'Invalid function'
  }
})
</script>
