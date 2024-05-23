<template>
  <div>
    Output
    {{ result }}
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

const appStore = useAppStore()

const result = computed(() => {
  let remappedFunction = props.id
  Object.keys(appStore.state).forEach(v => {
    remappedFunction = remappedFunction.replaceAll(
      v,
      `appStore.state.${v}`
    )
  })
  return Function('appStore', 'return ' + remappedFunction)(appStore)
})
</script>
