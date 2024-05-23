<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex shrink overflow-auto">
      <AppBoard />
      <AppDescription />
    </div>
    <div class="h-24">
      <QueryInput />
    </div>
  </div>
</template>
<script setup lang="ts">
import AppBoard from '@/components/AppBoard.vue'
import AppDescription from '@/components/AppDescription.vue'
import QueryInput from '@/components/QueryInput.vue'
import { useAppStore } from '@/utils/appStore'

const appStore = useAppStore()
appStore.init()
</script>
