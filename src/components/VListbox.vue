<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import type { KeyOfType } from '@/utils/typeUtils';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue';

const props = defineProps<{
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: TValue

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
  valueKey: KeyOfType<TItem, TValue>

  /**
   * key to use to get the display text from a provided object
   * see displayFn
   */
  displayKey: keyof TItem | ((item: TItem) => string)
}>()

defineEmits<{
  (e: 'update:modelValue', value: TValue): void
}>()

const valueFn = (o: TItem) => o[props.valueKey] as TValue
const displayFn = (o: TItem) => typeof props.displayKey === 'function' ? props.displayKey(o) : o[props.displayKey]

/**
 * gets the full selected item, based on the selected value.
 */
const selectedItem = computed(() => props.items.find(i => valueFn(i) === props.modelValue))
</script>

<template>
  <div class="w-full">
    <Listbox @update:model-value="$emit('update:modelValue', valueFn($event))">
      <ListboxLabel class="p-2 font-medium">
        {{ label }}
      </ListboxLabel>
      <div class="relative">
        <ListboxButton
          class="inline-flex items-center space-x-2 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
        >
          <div
            v-if="selectedItem && $slots.icon"
            class="shrink-0 h-6 w-6 flex items-center justify-center"
          >
            <slot
              name="icon"
              :item="selectedItem"
            />
          </div>
          <span class="block truncate">
            {{ selectedItem ? displayFn(selectedItem) : 'Please Select...' }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition 
          leave-active-class="transition duration-100 ease-in" 
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
        </transition>
      </div>
    </Listbox>
  </div>
</template>
