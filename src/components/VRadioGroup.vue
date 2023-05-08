<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TItem extends object">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from '@headlessui/vue'
import { computed } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import type { RadioGroupProps } from '@/types/listboxTypes';
import VLabel from './VLabel.vue';

const props = defineProps<RadioGroupProps<TValue, TItem>>()

defineEmits<{
  (e: 'update:modelValue', value: TValue): void
}>()

const valueFn = (o: TItem) => o[props.valueKey] as TValue
const labelFn = (o: TItem) => String(o[props.labelKey])
const descriptionFn = (o: TItem) => typeof props.descriptionKey === 'function' ? props.descriptionKey(o) : String(o[props.descriptionKey])

const selectedItem = computed(() => props.items.find(i => valueFn(i) === props.modelValue))
</script>
<template>
  <RadioGroup
    :model-value="selectedItem"
    @update:model-value="$emit('update:modelValue', valueFn($event))"
  >
    <VLabel
      :component="RadioGroupLabel"
    >
      {{ label }}
    </VLabel>
    <div class="space-y-2">
      <RadioGroupOption
        v-for="item in items"
        v-slot="{ active, checked }"
        :key="String(valueFn(item))"
        :value="item"
        as="template"
      >
        <div
          :class="[
            active
              ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
              : '',
            checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
          ]"
          class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-white' : 'text-gray-900'"
                  class="font-medium"
                >
                  <template v-if="!$slots.itemLabel">
                    {{ labelFn(item) }}
                  </template>
                  <slot
                    v-else
                    name="itemLabel"
                    :item="item"
                  />
                </RadioGroupLabel>
                <RadioGroupDescription
                  as="span"
                  :class="checked ? 'text-sky-100' : 'text-gray-500'"
                  class="inline"
                >
                  <template v-if="!$slots.itemDescription">
                    {{ descriptionFn(item) }}
                  </template>
                  <slot
                    v-else
                    name="itemDescription"
                    :item="item"
                  />
                </RadioGroupDescription>
              </div>
            </div>
            <div
              v-show="checked"
              class="shrink-0 text-white h-6 w-6"
            >
              <CheckCircleIcon />
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>