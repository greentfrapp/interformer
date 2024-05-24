<template>
  <div class="w-full bg-white rounded p-2 flex flex-col gap-1">
    <h3 class="text-sm">{{ props.comp.type }}</h3>
    <div v-for="prop in compProps" class="flex flex-col">
      <TextInputLabel>{{ prop }}</TextInputLabel>
      <TextInput v-model="props.comp.properties[prop]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextInput from '@/components/elements/TextInput.vue'
import { InputType, InputProperties } from './types'

const props = defineProps({
  comp: {
    type: Object as PropType<InputType>,
    required: true,
  },
})

const compProps = computed(() => {
  return Object.keys(props.comp.properties) as Array<keyof InputProperties>
})
</script>
