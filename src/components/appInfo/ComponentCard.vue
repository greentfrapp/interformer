<template>
  <div class="w-full bg-white rounded p-2 flex flex-col gap-1">
    <h3 class="text-sm">{{ props.comp.type }}</h3>
    <div v-for="prop in compProps" class="flex flex-col">
      <TextInputLabel>{{ prop }}</TextInputLabel>
      <TextInput v-if="prop === 'id' || prop === 'label' || prop === 'placeholder'" v-model="props.comp.properties[prop]" />
      <TextArea v-else-if="['function', 'prompt'].includes(prop)" v-model="props.comp.properties[prop]" rows="1" />
      <div v-else-if="prop === 'options'" class="space-y-0.5">
        <div v-for="o in props.comp.properties[prop]" class="text-sm border-2 px-2 py-1 flex rounded gap-2 w-full overflow-auto">
          <div class="shrink-0 w-20 truncate font-medium text-neutral-400">{{ o.label }}</div>
          <div class="break-all text-wrap grow">{{ JSON.stringify(o.value) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import TextInputLabel from '../elements/TextInputLabel.vue'
import TextInput from '../elements/TextInput.vue'
import TextArea from '../elements/TextArea.vue'

const props = defineProps({
  comp: {
    type: Object as PropType<any>,
    required: true,
  },
})

const compProps = computed(() => {
  return Object.keys(props.comp.properties)
})
</script>
