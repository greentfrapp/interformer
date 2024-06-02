<template>
  <div class="w-full bg-white rounded flex flex-col gap-1 overflow-hidden border border-lime-800/20">
    <button @click="collapse = !collapse"
      class="flex text-xs bg-lime-800/20 text-lime-800 px-1 justify-between">
      <span class="uppercase">{{ props.comp.type }}</span>
      <span>{{ props.comp.properties.id }}</span>
    </button>
    <div v-if="!collapse" class="p-2 space-y-1.5">
      <div v-for="prop in compProps" class="flex flex-col">
        <TextInputLabel>{{ prop }}</TextInputLabel>
        <div v-if="prop === 'columns'" class="space-y-0.5">
          <div v-for="o in props.comp.properties[prop]" class="text-sm border-2 px-2 py-1 flex rounded gap-2 w-full overflow-auto">
            <div class="shrink-0 w-20 truncate font-medium text-neutral-400">{{ o.label }}</div>
            <div class="break-all text-wrap grow">{{ o.id }}</div>
          </div>
        </div>
        <TextInput v-else v-model="props.comp.properties[prop]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import { TabularType, TabularProperties } from './types'
import TextInput from '@/components/elements/TextInput.vue'

const props = defineProps({
  comp: {
    type: Object as PropType<TabularType>,
    required: true,
  },
})

const compProps = computed(() => {
  return Object.keys(props.comp.properties) as Array<keyof TabularProperties>
})

const collapse = ref(true)

defineExpose({
  collapse,
})
</script>
