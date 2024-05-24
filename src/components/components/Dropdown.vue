<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.label || 'Dropdown ' + props.id }}</TextInputLabel>
    <Dropdown v-model="innerValue" :options="props.options.map(o => o.label)" />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { PropType, ref, watch, toRaw } from 'vue'
import TextInputLabel from '../elements/TextInputLabel.vue'
import Dropdown from '../elements/Dropdown.vue'

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
  options: {
    type: Array as PropType<any[]>,
    required: true,
  }
})

const innerValue = ref(props.options.find(o => JSON.stringify(o.value) === JSON.stringify(props.state[props.id])) && props.options.find(o => JSON.stringify(o.value) === JSON.stringify(props.state[props.id])).label || props.options[0].label)

watch(innerValue, opt => {
  props.state[props.id] = props.options.find(o => o.label === opt).value
})
</script>
