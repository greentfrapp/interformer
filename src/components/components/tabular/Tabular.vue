<template>
  <div class="flex flex-col">
    <TextInputLabel>{{ props.properties.label || 'Tabular ' + props.properties.id }}</TextInputLabel>
    <table class="text-sm divide-y">
      <thead>
        <tr class="bg-neutral-50">
          <th scope="col" v-for="col in props.properties.columns"
            class="font-medium text-left px-2 text-neutral-500">
            {{ col.label }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row, i in props.state[props.properties.id]" class="group">
          <td v-for="col in props.properties.columns">
            <input type="text" v-model="row[col.id]" placeholder="Empty"
              class="w-full px-2 placeholder:text-neutral-200 placeholder:italic border-2 border-transparent focus:outline-none focus:border-blue-200 rounded text-neutral-800" />
          </td>
          <td class="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-red-500"
            @click="deleteRow(i)">
            <XCircleIcon class="w-4 h-4" />
          </td>
        </tr>
        <tr>
          <td :colspan="props.properties.columns.length"
            class="text-neutral-400 hover:bg-neutral-100 cursor-pointer px-2 rounded"
            @click="addRow">
            + New
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import TextInputLabel from '@/components/elements/TextInputLabel.vue'
import { TabularProperties } from './types'
import { XCircleIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  state: {
    type: Object as PropType<any>,
    required: true,
  },
  properties: {
    type: Object as PropType<TabularProperties>,
    required: true,
  },
})

function addRow() {
  props.state[props.properties.id].push(
    Object.fromEntries(props.properties.columns.map(c => [c, '']))
  )
}

function deleteRow(rowIdx: number) {
  props.state[props.properties.id].splice(rowIdx, 1)
}
</script>
