<template>
  <div class="w-1/2">
    <component v-for="c in appStore.appJson" :is="COMPONENTS[c.type]"
      :id="c.properties ? c.properties.id || c.properties.function || c.properties.prompt : null" />
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { COMPONENTS } from '@/utils/components'

const appStore = useAppStore()
</script>
