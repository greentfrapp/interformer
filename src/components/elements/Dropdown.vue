<template>
  <Listbox as="div" v-model="innerValue">
    <div class="relative">
      <ListboxButton class="border-2 relative w-full cursor-pointer rounded bg-white py-1.5 pl-3 pr-10 text-left focus:outline-none">
        <span class="flex items-center">
          {{ innerValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-neutral-400" aria-hidden="true" />
        </span>
      </ListboxButton>
      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 focus:outline-none border shadow">
          <ListboxOption as="template" v-for="o in props.options" :key="o" :value="o" v-slot="{ active, selected }">
            <li :class="[active ? 'bg-neutral-200' : '', 'relative cursor-pointer select-none py-1.5 pl-3 pr-9']">
              <div class="flex items-center">
                <span :class="[selected ? 'font-medium' : 'font-normal', 'ml-3 block truncate']">{{ o }}</span>
              </div>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue: string) {
    emit('update:modelValue', newValue)
  },
})
</script>
