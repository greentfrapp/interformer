<template>
  <input type="text" v-model="innerValue" spellcheck="false" class="border-2 rounded px-3 py-2" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  },
})
</script>
