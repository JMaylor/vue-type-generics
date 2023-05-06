<script setup lang="ts" generic="TItem">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { computed } from 'vue';

const props = defineProps<{
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: any

  /**
   * label for the input
   */
  label: string

  /**
   * list of available items
   */
  items: TItem[]

  /**
   * key to use to get the underlying value from a provided object
   * see valueFn
   */
  valueKey: keyof TItem

  /**
   * key to use to get the display text from a provided object
   * see displayFn
   */
  displayKey: keyof TItem
}>()

defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const valueFn = (o: any) => o[props.valueKey]
const displayFn = (o: any) => o[props.displayKey]

/**
 * gets the full selected item, based on the selected value.
 */
const selectedItem = computed(() => props.items.find(i => valueFn(i) === props.modelValue))
</script>

<template>
  <div class="w-72">
    <Listbox @update:model-value="$emit('update:model-value', $event)">
      <ListboxLabel>{{ label }}</ListboxLabel>
      <div class="relative">
        <ListboxButton class="relative w-full border text-left">
          <span class="block truncate">{{ selectedItem ? displayFn(selectedItem) : 'Please Select...' }}</span>
        </ListboxButton>
        <ListboxOptions class="absolute max-h-60 z-10 bg-white w-full overflow-auto py-1 border">
          <ListboxOption v-slot="{ active, selected }" v-for="item in items" :key="String(valueFn(item))"
            :value="valueFn(item)" as="template">
            <li class="relative select-none" :class="{
              'bg-blue-100': active,
              'bg-blue-50': selected && !active
            }">
              <span>{{ displayFn(item) }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
