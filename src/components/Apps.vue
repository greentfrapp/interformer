<template>
  <div class="w-full h-max flex flex-wrap gap-2">
    <AppCard v-for="app, i in appStore.apps" :appIndex="i" :state="appStore.states[i]" :key="app.id" />
  </div>
</template>
<script setup lang="ts">
import AppCard from './appCard/AppCard.vue'
import { useAppStore } from '@/utils/appStore'

const appStore = useAppStore()
</script>
