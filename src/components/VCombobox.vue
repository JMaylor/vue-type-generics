<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem">
import type { KeyOfType } from '@/utils/typeUtils';
import {
  Combobox,
  ComboboxLabel,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { ref, computed } from 'vue';

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
  displayKey: keyof TItem
}>()

defineEmits<{
  (e: 'update:modelValue', value: TValue): void
}>()

const valueFn = (o: TItem) => o[props.valueKey] as TValue
const displayFn = (o: TItem) => String(o[props.displayKey])

/**
 * gets the full selected item, based on the selected value.
 */
const getItemFromValue = (value: TValue) => props.items.find(i => valueFn(i) === value )
const selectedItem = computed(() => getItemFromValue(props.modelValue))

const query = ref('')

const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        displayFn(item)
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
</script>
<template>
  <div class="w-72">
    <Combobox @update:model-value="$emit('update:modelValue', $event)">
      <ComboboxLabel class="p-2 font-medium">
        {{ label }}
      </ComboboxLabel>
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 leading-5 text-gray-900 focus:ring-0 outline-none"
            :display-value="(item: unknown) => displayFn(getItemFromValue(item as TValue)!)"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="item in filteredItems"
              :key="String(valueFn(item))"
              v-slot="{ selected, active }"
              as="template"
              :value="valueFn(item)"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ displayFn(item) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>