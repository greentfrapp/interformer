<template>
  <div class="flex flex-col w-full gap-0.5">
    <div class="flex items-center gap-2">
      <TextInputLabel for="create-app">Describe an app</TextInputLabel>
      <button @click="appStore.reset"
        class="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 hover:bg-red-500 hover:text-white rounded">
        Clear all apps
      </button>
    </div>
    <div class="border-2 rounded flex items-center">
      <TextInput v-model="query" id="create-app" class="grow border-none focus:outline-none" @keyup.enter="generate" />
      <button @click="generate" class="bg-neutral-100 w-8 h-8 flex justify-center items-center mr-1 rounded hover:bg-neutral-200">
        <ArrowPathIcon v-if="loading" class="text-neutral-500 w-4 h-4 animate-spin" />
        <PaperAirplaneIcon v-else class="text-neutral-500 w-4 h-4" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { ref } from 'vue'
import TextInput from './elements/TextInput.vue'
import TextInputLabel from './elements/TextInputLabel.vue'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { PaperAirplaneIcon } from '@heroicons/vue/20/solid'

const loading = ref(false)
const query = ref('Translate English to French or Malay')

const appStore = useAppStore()

async function generate() {
  loading.value = true
  await appStore.createApp(query.value)
  loading.value = false
}
</script>
