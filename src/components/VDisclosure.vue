<script lang='ts' setup>
import type { VDisclosureItem } from '@/types/componentTypes';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

defineProps<{
  items: VDisclosureItem[]
}>()
</script>

<template>
  <div class="w-full">
    <div class="mx-auto w-full max-w-md rounded-lg bg-white p-2 shadow-md space-y-2">
      <Disclosure
        v-for="item in items"
        :key="JSON.stringify(item)"
        v-slot="{ open }"
      >
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-rose-100 px-4 py-2 text-left text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-75"
        >
          <span>{{ item.title }}</span>
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-rose-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 py-2 text-sm text-gray-500 space-y-2">
          <span v-if="typeof item.content === 'string'">
            {{ item.content }}
          </span>
          <template v-else>
            <p
              v-for="text in item.content"
              :key="text"
            >
              {{ text }}
            </p>
          </template>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>