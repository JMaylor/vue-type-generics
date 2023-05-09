<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import type { SingleListboxProps } from '@/types/componentTypes';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
} from '@headlessui/vue'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue';
import { useValueAndDisplayFns } from '@/composables/useValueAndDisplayFns'
import VLabel from './VLabel.vue';
import VListboxOptions from './VListboxOptions.vue';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/vue';

const props = defineProps<SingleListboxProps<TValue, TItem>>()

defineEmits<{
  (e: 'update:modelValue', value: TValue): void
}>()

const { valueFn, displayFn } = useValueAndDisplayFns(props)

const selectedItem = computed(() => props.items.find(i => valueFn(i) === props.modelValue))

const trigger = ref()
const triggerEl = computed(() => trigger.value?.$el)
const floating = ref()
const floatingEl = computed(() => floating.value?.root.$el)
const { floatingStyles } = useFloating(triggerEl, floatingEl, {
  middleware: [offset(4), flip(), shift()],
  whileElementsMounted: autoUpdate,
});
</script>

<template>
  <div class="w-full">
    <Listbox
      :model-value="selectedItem"
      @update:model-value="$emit('update:modelValue', valueFn($event))"
    >
      <VLabel
        :component="ListboxLabel"
      >
        {{ label }}
      </VLabel>
      <div class="relative">
        <ListboxButton
          ref="trigger"
          class="inline-flex items-center space-x-2 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
          :class="{
            'pr-10': !clearable,
            'pr-[3.5rem]': clearable
          }"
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
        
        <button
          v-if="clearable && modelValue"
          type="button"
          class="absolute inset-y-2 z-10 h-6 right-8 flex items-center"
          @click.stop="$emit('update:modelValue', null)"
        >
          <XMarkIcon
            class="h-5 w-5 text-gray-400"
          />
        </button>

        <transition 
          leave-active-class="transition duration-100 ease-in" 
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <VListboxOptions
            ref="floating"
            :style="floatingStyles"
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
