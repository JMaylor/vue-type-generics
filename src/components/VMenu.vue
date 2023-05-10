<script lang='ts' setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ArrowTopRightOnSquareIcon, ChevronDownIcon, Cog6ToothIcon } from '@heroicons/vue/20/solid'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from '@floating-ui/vue';
import { computed, ref, type FunctionalComponent, type HTMLAttributes, type VNodeProps } from 'vue';
import type { VMenuItemProp } from '@/types/componentTypes';

const props = defineProps<{
  items: Array<VMenuItemProp> | Array<Array<VMenuItemProp>>
  title: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps>
}>()

const trigger = ref()
const triggerEl = computed(() => trigger.value?.$el)
const floating = ref()
const floatingEl = computed(() => floating.value?.$el)
const { floatingStyles } = useFloating(triggerEl, floatingEl, {
  middleware: [offset(4), flip(), shift()],
  whileElementsMounted: autoUpdate,
  placement: 'bottom-start'
});

const packedMenuItems = computed(() => {
  if (Array.isArray(props.items[0])) {
    return props.items as Array<Array<VMenuItemProp>>
  } else {
    return [props.items as Array<VMenuItemProp>]
  }
})
</script>

<template>
  <Menu
    as="div"
    class="relative inline-block text-left"
  >
    <div>
      <MenuButton
        ref="trigger"
        class="text-sm shadow-md inline-flex w-full justify-center items-center rounded-md bg-white pl-3 pr-2 py-2 hover:bg-amber-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
      >
        <Cog6ToothIcon
          class="mr-2 h-5 w-5 text-violet-400"
          aria-hidden="true"
        />
        {{ title }}
        <component
          :is="icon"
          class="ml-2 h-5 w-5"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <MenuItems
        ref="floating"
        :style="floatingStyles"
        class="absolute right-0 w-fit divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div
          v-for="(group, index) in packedMenuItems"
          :key="index"
          class="px-1 py-1"
        >
          <template
            v-for="menuItem in group"
            :key="menuItem.text"
          >
            <template v-if="menuItem.action">
              <MenuItem
                v-slot="{ active }"
                :disabled="menuItem.disabled"
              >
                <button
                  type="button"
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  :class="{
                    'bg-violet-500 text-white': active,
                    'text-gray-900': !active && !menuItem.disabled,
                    'text-gray-400 cursor-not-allowed': menuItem.disabled,
                  }"
                  @click="menuItem.action"
                >
                  <component
                    :is="menuItem.icon"
                    class="mr-2 h-5 w-5"
                    :class="{
                      'text-violet-200': active,
                      'text-violet-400': !active && !menuItem.disabled,
                      'text-gray-300': menuItem.disabled,
                    }"
                    aria-hidden="true"
                  />
                  {{ menuItem.text }}
                </button>
              </MenuItem>
            </template>
 
            <template v-else-if="menuItem.to">
              <MenuItem
                v-slot="{ active, close }"
                :disabled="menuItem.disabled"
              >
                <a
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  :class="{
                    'bg-violet-500 text-white cursor-pointer': active,
                    'text-gray-900 cursor-pointer': !active && !menuItem.disabled,
                    'text-gray-400 cursor-not-allowed': menuItem.disabled,
                  }"
                  @click="() => { $router.push(menuItem.to!); close() }"
                >
                  <component
                    :is="menuItem.icon"
                    class="mr-2 h-5 w-5"
                    :class="{
                      'text-violet-200': active,
                      'text-violet-400': !active && !menuItem.disabled,
                      'text-gray-300': menuItem.disabled,
                    }"
                    aria-hidden="true"
                  />
                  {{ menuItem.text }}
                </a>
              </MenuItem>
            </template>

            <template v-else-if="menuItem.href">
              <MenuItem
                v-slot="{ active, close }"
                :disabled="menuItem.disabled"
              >
                <a
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  :class="{
                    'bg-violet-500 text-white cursor-pointer': active,
                    'text-gray-900 cursor-pointer': !active && !menuItem.disabled,
                    'text-gray-400 cursor-not-allowed': menuItem.disabled,
                  }"
                  :href="menuItem.href"
                  :target="menuItem.newTab ? '_target' : '_self'"
                  @click="close"
                >
                  <component
                    :is="menuItem.icon"
                    class="mr-2 h-5 w-5"
                    :class="{
                      'text-violet-200': active,
                      'text-violet-400': !active && !menuItem.disabled,
                      'text-gray-300': menuItem.disabled,
                    }"
                    aria-hidden="true"
                  />
                  {{ menuItem.text }}
                  <ArrowTopRightOnSquareIcon
                    v-if="!menuItem.disabled"
                    class="ml-2 h-5 w-5"
                    :class="{
                      'text-blue-200': active,
                      'text-blue-400': !active,
                    }"
                  />
                </a>
              </MenuItem>
            </template>
          </template>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>