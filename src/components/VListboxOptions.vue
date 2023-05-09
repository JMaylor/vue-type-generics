<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import type { BaseHeadlessUiProps } from '@/types/componentTypes';
import {
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { ref } from 'vue';

defineProps<Pick<BaseHeadlessUiProps<TValue, TItem>, 'items'> & {
  valueFn: (o: TItem) => TValue
  displayFn: (o: TItem) => string
}>()

const root = ref()
defineExpose({root})
</script>

<template>
  <ListboxOptions
    ref="root"
    class="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <ListboxOption
      v-for="item in items"
      v-slot="{ active, selected }"
      :key="String(valueFn(item))"
      :value="item"
      as="template"
    >
      <li
        :class="[
          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
          'relative cursor-default select-none py-2 pl-10 pr-4',
        ]"
      >
        <span class="inline-flex items-center space-x-2">
          <div
            v-if="$slots.icon"
            class="shrink-0 h-6 w-6 flex items-center justify-center"
          >
            <slot
              name="icon"
              :item="item"
            />
          </div>
          <span
            :class="[
              selected ? 'font-medium' : 'font-normal',
              'block truncate',
            ]"
          >
            {{ displayFn(item) }}
          </span>
        </span> 
        <span
          v-if="selected"
          class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
        >
          <CheckIcon
            class="h-5 w-5"
            aria-hidden="true"
          />
        </span>
      </li>
    </ListboxOption>
  </ListboxOptions>
</template>