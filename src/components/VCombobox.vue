<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import type { ComboboxProps } from '@/types/listboxTypes';
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
import { useValueAndDisplayFns } from '@/composables/useValueAndDisplayFns'

const props = defineProps<ComboboxProps<TValue, TItem>>()

defineEmits<{
  (e: 'update:modelValue', value: TValue): void
}>()

const { valueFn, displayFn } = useValueAndDisplayFns(props)

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

const selectedItem = computed(() => props.items.find(i => valueFn(i) === props.modelValue))
</script>

<template>
  <div class="w-full">
    <Combobox
      :model-value="selectedItem"
      @update:model-value="$emit('update:modelValue', valueFn($event))"
    >
      <ComboboxLabel class="p-2 font-medium">
        {{ label }}
      </ComboboxLabel>
      <div class="relative">
        <div
          class="inline-flex py-2 pl-3 items-center space-x-2 relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
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
          <ComboboxInput
            class="border-none pr-10 text-gray-900 focus:ring-0 outline-none select-all"
            :display-value="(v: unknown) => displayFn(v as TItem)"
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
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
              :value="item"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-amber-100 text-amber-900': active,
                  'text-gray-900': !active,
                }"
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
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>