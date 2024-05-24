<template>
  <div>
    Input {{ id }}
    <input class="border" v-model="appStore.state[props.id]" />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

const appStore = useAppStore()
</script>
