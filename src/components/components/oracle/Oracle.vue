<template>
  <div>
    <TextInputLabel>{{ props.properties.label || 'Oracle' }}</TextInputLabel>
    <TextOutput class="flex flex-col items-end gap-1">
      <pre v-if="props.state[props.properties.id]" class="font-sans text-wrap w-full max-h-[20rem] overflow-auto">{{ props.state[props.properties.id] }}</pre>
      <button class="bg-white w-6 h-6 flex items-center justify-center rounded -mr-1" @click="queryOracle">
        <ArrowPathIcon class="text-neutral-500 w-4 h-4"
          :class="[loading ? 'animate-spin' : '']" />
      </button>
    </TextOutput>
  </div>
</template>
<script setup lang="ts">
import { generateAPI } from '@/utils/openai'
import { PropType, ref } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import TextOutput from '@/components/elements/TextOutput.vue'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { useAppStore } from '@/utils/appStore'
import { OracleProperties } from './types'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<OracleProperties>,
    required: true,
  },
})

const loading = ref(false)

async function queryOracle() {
  loading.value = true
  let prompt = props.properties.prompt
  Object.keys(props.state).forEach(v => {
    prompt = prompt.replaceAll(
      `{{${v}}}`,
      props.state[v]
    )
    const keys = Object.keys(props.state[v])
    if (keys.length) {
      keys.forEach(k => {
        prompt = prompt.replaceAll(
          `{{${v}.${k}}}`,
          props.state[v][k]
        )
      })
    }
  })
  const appStore = useAppStore()
  const response = await generateAPI(prompt, 0.9, appStore.apiKey)
  if (response.result) {
    console.log(response.result)
    if (response.result.includes('<answer>')) {
      const rgx = /<answer>(?<answer>(.|\n)*?)(<\/answer>|$)/
      const found = response.result.match(rgx)
      if (found && found.groups) props.state[props.properties.id] = found.groups.answer.trim()
      else props.state[props.properties.id] = response.result
    } else {
      props.state[props.properties.id] = response.result
    }
  }
  loading.value = false
}
</script>
