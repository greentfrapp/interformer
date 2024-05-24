<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.properties.label || 'Input ' + props.properties.id }}</TextInputLabel>
    <TextInput v-model="props.state[props.properties.id]" :placeholder="props.properties.placeholder" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextInput from '@/components/elements/TextInput.vue'
import { InputProperties } from './types'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<InputProperties>,
    required: true,
  },
})
</script>
