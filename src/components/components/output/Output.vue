<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.properties.label || 'Output ' + props.properties.id }}</TextInputLabel>
    <TextOutput :class="result === 'Invalid function' ? 'text-neutral-300' : ''">
      {{ result }}
    </TextOutput>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextOutput from '@/components/elements/TextOutput.vue'
import { OutputProperties } from './types'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<OutputProperties>,
    required: true,
  },
})

const result = computed(() => {
  try {
    let remappedFunction = props.properties.function
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
