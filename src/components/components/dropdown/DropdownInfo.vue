<template>
  <div class="w-full bg-white rounded flex flex-col gap-1 overflow-hidden border border-blue-200">
    <h3 class="text-xs uppercase bg-blue-200 text-blue-600 px-1">{{ props.comp.type }}</h3>
    <div v-for="prop in compProps" class="flex flex-col p-2">
      <TextInputLabel>{{ prop }}</TextInputLabel>
      <div v-if="prop === 'options'" class="space-y-0.5">
        <div v-for="o in props.comp.properties[prop]" class="text-sm border-2 px-2 py-1 flex rounded gap-2 w-full overflow-auto">
          <div class="shrink-0 w-20 truncate font-medium text-neutral-400">{{ o.label }}</div>
          <div class="break-all text-wrap grow">{{ JSON.stringify(o.value) }}</div>
        </div>
      </div>
      <TextInput v-else v-model="props.comp.properties[prop]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextInput from '@/components/elements/TextInput.vue'
import { DropdownType, DropdownProperties } from './types'

const props = defineProps({
  comp: {
    type: Object as PropType<DropdownType>,
    required: true,
  },
})

const compProps = computed(() => {
  return Object.keys(props.comp.properties) as Array<keyof DropdownProperties>
})
</script>
