<template>
  <div class="w-full bg-white rounded flex flex-col gap-1 overflow-hidden border border-amber-200">
    <button @click="collapse = !collapse"
      class="flex text-xs uppercase bg-amber-200 text-amber-600 px-1 justify-between">
      <span>{{ props.comp.type }}</span>
      <span>{{ props.comp.properties.id }}</span>
    </button>
    <div v-if="!collapse" class="p-2 space-y-1.5">
      <div v-for="prop in compProps" class="flex flex-col">
        <TextInputLabel>{{ prop }}</TextInputLabel>
        <TextInput v-model="props.comp.properties[prop]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
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

const collapse = ref(true)

defineExpose({
  collapse,
})
</script>
