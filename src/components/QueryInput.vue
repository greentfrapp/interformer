<template>
  <input type="text" class="border" v-model="query" />
  <button @click="generate">
    {{ loading ? 'Loading' : 'Generate' }}
  </button>
</template>
<script setup lang="ts">
import { useAppStore } from '@/utils/appStore'
import { ref } from 'vue'

const loading = ref(false)
const query = ref('Create an app that sums three inputs')

const appStore = useAppStore()

async function generate() {
  loading.value = true
  await appStore.createApp(query.value)
  loading.value = false
}
</script>
