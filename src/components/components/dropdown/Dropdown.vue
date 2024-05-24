<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.properties.label || 'Dropdown ' + props.properties.id }}</TextInputLabel>
    <Dropdown v-model="innerValue" :options="props.properties.options.map(o => o.label)" />
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import Dropdown from '@/components/elements/Dropdown.vue'
import { DropdownProperties } from './types'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<DropdownProperties>,
    required: true,
  },
})

function getOptionLabel(optionValue: any) {
  const strValue = JSON.stringify(optionValue)
  const option = props.properties.options.find(o => JSON.stringify(o.value) === strValue)
  if (option) return option.label
}

function getOptionValue(optionLabel: string) {
  const option = props.properties.options.find(o => o.label === optionLabel)
  if (option) return option.value
}

const innerValue = ref(getOptionLabel(props.state[props.properties.id]) || props.properties.options[0].label)

watch(innerValue, opt => {
  props.state[props.properties.id] = getOptionValue(opt)
})
</script>
