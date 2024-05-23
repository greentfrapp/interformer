<template>
  <div>
    Oracle
    <pre class="font-sans">{{ result }}</pre>
    <button class="border" @click="queryOracle">
      {{ loading ? 'Loading' : 'Enter' }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { generateAPI } from '@/utils/api'
import { useAppStore } from '@/utils/appStore'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

const appStore = useAppStore()

const loading = ref(false)
const result = ref('')

async function queryOracle() {
  loading.value = true
  let prompt = props.id
  Object.keys(appStore.state).forEach(v => {
    prompt = prompt.replaceAll(
      `{{${v}}}`,
      appStore.state[v]
    )
  })
  const response = await generateAPI(prompt, 0.9)
  if (response.result) {
    console.log(response.result)
    if (response.result.includes('<answer>')) {
      const rgx = /<answer>(?<answer>(.|\n)*?)(<\/answer>|$)/
      const found = response.result.match(rgx)
      if (found.groups) result.value = found.groups.answer.trim()
      else result.value = response.result
    } else {
      result.value = response.result
    }
  }
  loading.value = false
}
</script>
