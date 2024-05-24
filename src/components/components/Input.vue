<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.label || 'Input ' + props.id }}</TextInputLabel>
    <TextInput v-model="props.state[props.id]" :placeholder="props.placeholder" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import TextInputLabel from '../elements/TextInputLabel.vue'
import TextInput from '../elements/TextInput.vue'

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
  placeholder: {
    type: String,
    default: '',
  },
})
</script>
