<template>
  <div class="flex relative w-screen h-screen overflow-hidden">
    <AppInfo />
    <Settings :open="openSettings" @close="openSettings = false" />
    <button @click="openSettings = true" class="absolute top-2 right-2">
      <EllipsisHorizontalIcon class="w-4 h-4 text-neutral-500" />
    </button>
    <div class="flex flex-col w-full h-screen overflow-auto p-4 gap-4">
      <CreateApp />
      <Apps />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import AppInfo from '@/components/appInfo/AppInfo.vue'
import CreateApp from '@/components/CreateApp.vue'
import Apps from '@/components/Apps.vue'
import Settings from '@/components/Settings.vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'

const appStore = useAppStore()
appStore.init()

const openSettings = ref(false)
</script>
