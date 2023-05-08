<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue';
import VChip from './VChip.vue';
import type { MultiListboxProps } from '@/types/listboxTypes';
import { useValueAndDisplayFns } from '@/composables/useValueAndDisplayFns'
import VLabel from './VLabel.vue';
import VListboxOptions from './VListboxOptions.vue';

const props = defineProps<MultiListboxProps<TValue, TItem>>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: TValue[]): void
}>()

const { valueFn, displayFn } = useValueAndDisplayFns(props)

/**
 * gets the full selected item, based on the selected value.
 */
const selectedItems = computed(() => props.items.filter(i => props.modelValue.includes(valueFn(i))))

function onUpdate(e: TItem[]) {
  emit('update:modelValue', e.map(valueFn))
}
</script>

<template>
  <div class="w-full">
    <Listbox
      multiple
      :model-value="selectedItems"
      @update:model-value="onUpdate"
    >
      <VLabel
        :component="ListboxLabel"
      >
        {{ label }}
      </VLabel>
      <div class="relative">
        <ListboxButton
          class="inline-flex items-center space-x-2 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
        >
          <span
            v-if="selectedItems.length === 0"
            class="block truncate"
          >
            Please Select...
          </span>
          <div
            v-else
            class="flex flex-wrap gap-1"
          >
            <VChip
              v-for="(item, i) in selectedItems"
              :key="String(valueFn(item))"
              :model-value="item"
              @delete="onUpdate(selectedItems.filter((_item, j) => i !== j))"
            >
              <div
                v-if="$slots.icon"
                class="shrink-0 h-6 w-6 flex items-center justify-center mr-1"
              >
                <slot
                  name="icon"
                  :item="item"
                />
              </div>
              <span>{{ displayFn(item) }}</span>
            </VChip>
          </div>
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
          <VListboxOptions
            :items="items"
            :value-fn="valueFn"
            :display-fn="displayFn"
          >
            <template
              v-if="$slots.icon"
              #icon="{ item }"
            >
              <slot
                name="icon"
                :item="item"
              />
            </template>
          </VListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
