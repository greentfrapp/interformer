<template>
  <div>
    <h4 class="text-xs text-neutral-300">{{ app.title }}</h4>
    <div class="w-64 h-max border rounded-md p-2 flex flex-col gap-2 relative">
      <button @click="appStore.editApp(props.appIndex)"
        class="flex justify-end absolute top-1.5 right-2">
        <EllipsisHorizontalIcon class="w-4 h-4 text-neutral-300" />
      </button>
      <component v-for="c in app.app" :is="COMPONENTS[c.type]"
        :label="c.properties.label"
        :id="c.properties ? c.properties.id || c.properties.function || c.properties.prompt : null"
        :prompt="c.properties ? c.properties.prompt : null"
        :options="c.properties.options"
        :state="props.state"
        :placeholder="c.properties.placeholder" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, PropType } from 'vue'
import { COMPONENTS } from '@/utils/components'
import { EllipsisHorizontalIcon } from '@heroicons/vue/16/solid'
import { useAppStore } from '@/utils/appStore';

const props = defineProps({
  appIndex: {
    type: Number,
    required: true,
  },
  state: {
    type: Object as PropType<any>,
    required: true,
  },
})

const appStore = useAppStore()

const app = computed(() => {
  return appStore.apps[props.appIndex]
})
</script>
