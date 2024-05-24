<template>
  <div class="w-full bg-white rounded flex flex-col gap-1 overflow-hidden border border-purple-800/20">
    <button @click="collapse = !collapse"
      class="flex text-xs bg-purple-800/20 text-purple-800 px-1 justify-between">
      <span class="uppercase">{{ props.comp.type }}</span>
      <span>{{ props.comp.properties.id }}</span>
    </button>
    <div v-if="!collapse" class="p-2 space-y-1.5">
      <div v-for="prop in compProps" class="flex flex-col">
        <TextInputLabel>{{ prop }}</TextInputLabel>
        <TextArea v-if="prop === 'prompt'" v-model="props.comp.properties[prop]" rows="1" />
        <TextInput v-else v-model="props.comp.properties[prop]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextInput from '@/components/elements/TextInput.vue'
import TextArea from '@/components//elements/TextArea.vue'
import { OracleType, OracleProperties } from './types'

const props = defineProps({
  comp: {
    type: Object as PropType<OracleType>,
    required: true,
  },
})

const compProps = computed(() => {
  return Object.keys(props.comp.properties) as Array<keyof OracleProperties>
})

const collapse = ref(true)

defineExpose({
  collapse,
})
</script>
