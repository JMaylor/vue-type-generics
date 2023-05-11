<script lang='ts' setup generic="VItem">
import type { VDisclosureProps } from '@/types/componentTypes';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue';

const props = defineProps<VDisclosureProps<VItem>>()

const title = computed(() => (!props.titleKey || !props.item ) ? undefined : typeof props.titleKey === 'function' ? props.titleKey(props.item) : props.item[props.titleKey])
const content = computed(() => (!props.contentKey || !props.item ) ? undefined : typeof props.contentKey === 'function' ? props.contentKey(props.item) : props.item[props.contentKey])
</script>

<template>
  <Disclosure
    v-slot="{ open }"
  >
    <DisclosureButton
      class="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75"
    >
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
      <ChevronUpIcon
        :class="open ? 'rotate-180 transform' : ''"
        class="h-5 w-5 text-rose-500"
      />
    </DisclosureButton>
    <DisclosurePanel class="px-4 py-2 text-sm text-gray-500">
      <slot>
        <span>
          {{ content }}
        </span>
      </slot>
    </DisclosurePanel>
  </Disclosure>
</template>