<template>
  <div class="bg-neutral-100 h-screen transition-all overflow-auto flex flex-col justify-between items-end gap-10 border-r"
    :class="[appStore.editAppIndex >= 0 ? 'p-4 w-96 shrink-0' : 'w-0 p-0']">
    <div class="space-y-4 w-full">
      <div class="flex justify-between items-start">
        <h2 class="font-medium text-xl">{{ app.title }}</h2>
        <button @click="appStore.editApp(-1)">
          <ChevronDoubleLeftIcon class="w-6 h-6 text-neutral-300" />
        </button>
      </div>
      <div>
        <TextInputLabel>Description</TextInputLabel>
        <div class="flex flex-col gap-1">
          {{ app.description }}
        </div>
      </div>
      <div>
        <TextInputLabel>Components</TextInputLabel>
        <div class="flex flex-col gap-1">
          <ComponentCard v-for="comp in app.app" :comp="comp" />
        </div>
      </div>
    </div>
    <button @click="appStore.deleteApp(appStore.editAppIndex); appStore.editApp(-1)">
      <TrashIcon class="w-6 h-6 text-neutral-300" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDoubleLeftIcon, TrashIcon } from '@heroicons/vue/16/solid'
import TextInputLabel from '../elements/TextInputLabel.vue'
import ComponentCard from './ComponentCard.vue'
import { useAppStore } from '@/utils/appStore'

const appStore = useAppStore()

const app = computed(() => {
  return appStore.apps[appStore.editAppIndex] || { title: '', app: [] }
})
</script>
