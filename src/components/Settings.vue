<template>
  <div class="bg-neutral-100 h-screen transition-all overflow-auto flex flex-col justify-between items-end gap-10"
    :class="[props.open ? 'p-4 w-64 shrink-0 border-r' : 'w-0 p-0']">
    <div class="space-y-4 w-full">
      <div class="flex justify-between items-start">
        <h2 class="font-medium text-xl">Settings</h2>
        <button @click="emit('close')">
          <ChevronDoubleLeftIcon class="w-6 h-6 text-neutral-300" />
        </button>
      </div>
      <div>
        <TextInputLabel>OpenAI API Key</TextInputLabel>
        <TextInput class="w-full" type="password" v-model="appStore.apiKey" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronDoubleLeftIcon } from '@heroicons/vue/16/solid'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextInput from './elements/TextInput.vue'
import { useAppStore } from '@/utils/appStore'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['close'])

const appStore = useAppStore()
</script>
