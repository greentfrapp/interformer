<template>
  <div class="w-full h-full">
    <textarea v-model="appJsonString" rows="100"
      spellcheck="false"
      class="font-mono w-full h-full border focus:outline-none">
    </textarea>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { computed } from '@vue/reactivity'

const appStore = useAppStore()

const appJsonString = computed({
  get() {
    return JSON.stringify(appStore.appJson, null, 2)
  },
  set(newValue) {
    appStore.appJson = JSON.parse(newValue)
  }
})
</script>
