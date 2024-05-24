<template>
  <div class="w-full bg-white rounded flex flex-col gap-1 overflow-hidden border border-purple-200">
    <h3 class="text-xs uppercase bg-purple-200 text-purple-600 px-1">{{ props.comp.type }}</h3>
    <div v-for="prop in compProps" class="flex flex-col p-2">
      <TextInputLabel>{{ prop }}</TextInputLabel>
      <TextArea v-if="prop === 'prompt'" v-model="props.comp.properties[prop]" rows="1" />
      <TextInput v-else v-model="props.comp.properties[prop]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
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
</script>
