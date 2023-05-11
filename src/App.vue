<script setup lang="ts">
import { ref } from 'vue'
import VListbox from './components/VListbox.vue'
import { AcademicCapIcon, UserGroupIcon, BuildingOffice2Icon, PhoneIcon, PresentationChartBarIcon, ComputerDesktopIcon, CodeBracketIcon, QuestionMarkCircleIcon, BoltIcon, CurrencyDollarIcon, CurrencyEuroIcon, CurrencyPoundIcon, CurrencyYenIcon, BriefcaseIcon, UserIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/vue/20/solid'
import VCombobox from './components/VCombobox.vue';
import VDisclosure from './components/VDisclosure.vue';
import VRadioGroup from './components/VRadioGroup.vue';
import VMultiListbox from './components/VMultiListbox.vue';
import VMenu from './components/VMenu.vue';

import menuItems from '@resources/menuItems'

const people = ref([
  {
    id: 1,
    name: 'Frodo',
    age: 50,
    iconBackground: 'bg-teal-500'
  },
  {
    id: 2,
    name: 'Gandalf',
    age: 24_000,
    icon: AcademicCapIcon
  },
  {
    id: 3,
    name: 'Samwise',
    age: 38,
    iconBackground: 'bg-rose-500'
  },
])
const person = ref<number>()

const currencies = ref([
  {
    iso_code: 'USD',
    name: 'US Dollar',
    icon: CurrencyDollarIcon
  },
  {
    iso_code: 'EUR',
    name: 'Euro',
    icon: CurrencyEuroIcon
  },
  {
    iso_code: 'GBP',
    name: 'British Pound',
    icon: CurrencyPoundIcon
  },
  {
    iso_code: 'JPY',
    name: 'Japanese Yen',
    icon: CurrencyYenIcon
  },
])
const currency = ref<string>()

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
    icon: UserIcon
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
    icon: BriefcaseIcon
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
    icon: CreditCardIcon
  },
]
const plan = ref<string>()

const availableRoles = [
  {
    role_id: 1,
    role_name: 'Finance',
    icon: CreditCardIcon
  },
  {
    role_id: 2,
    role_name: 'HR',
    icon: UserGroupIcon,
  },
  {
    role_id: 3,
    role_name: 'Office Management',
    icon: BuildingOffice2Icon,
  },
  {
    role_id: 4,
    role_name: 'Sales',
    icon: PhoneIcon,
  },
  {
    role_id: 5,
    role_name: 'Marketing',
    icon: PresentationChartBarIcon,
  },
  {
    role_id: 6,
    role_name: 'IT',
    icon: ComputerDesktopIcon,
  },
  {
    role_id: 7,
    role_name: 'Development',
    icon: CodeBracketIcon,
  },
  {
    role_id: 8,
    role_name: 'Support',
    icon: QuestionMarkCircleIcon,
  },
  {
    role_id: 9,
    role_name: 'Management',
    icon: BoltIcon,
  }
]
const roles = ref<number[]>([])

const disclosureItems = [
  {
    title: 'What is your favorite color?',
    content: 'I\'ve thought about it long and hard, and it\'s got to be green.'
  },
  {
    title: 'Can you show me some multi-paragraph content?',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.',
      'Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero.',
      'Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis.'
    ]
  },
]
</script>

<template>
  <header class="px-6 py-3 border-b border-rose-600 flex justify-between font-medium">
    <RouterView />
    <span class="font-normal">You can use the Menu to navigate between the Home and About page.</span>
  </header>
  <main class="p-4 gap-4 grid grid-cols-12">
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VListbox
        v-model="person"
        clearable
        :items="people"
        label="Listbox"
        value-key="id"
        :display-key="o => `${o.id} - ${o.name}`"
      >
        <template #icon="{item}">
          <div
            v-if="'iconBackground' in item"
            class="h-4 w-4 rounded-full"
            :class="item.iconBackground"
          />
          <component
            :is="item.icon"
            v-else
            class="h-5 w-5"
          />
        </template>
      </VListbox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VMultiListbox
        v-model="roles"
        :items="availableRoles"
        label="Multi Listbox"
        value-key="role_id"
        display-key="role_name"
      >
        <template #icon="{item}">
          <component
            :is="item.icon"
            class="h-5 w-5"
          />
        </template>
      </VMultiListbox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VCombobox
        v-model="currency"
        :items="currencies"
        label="Combobox"
        :value-key="o => `${o.iso_code} - ${o.name}`"
        display-key="name"
      >
        <template #icon="{item}">
          <component
            :is="item.icon"
            class="h-5 w-5"
          />
        </template>
      </VCombobox>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <VRadioGroup
        v-model="plan"
        :items="plans"
        value-key="name"
        label="Radio Group"
        label-key="name"
        :description-key="o => `${o.ram} / ${o.cpus} / ${o.disk}`"
      >
        <template #itemLabel="{item}">
          <span class="flex">
            <component
              :is="item.icon"
              class="h-5 w-5 mr-4"
            />
            {{ item.name }}
          </span>
        </template>
        <template #itemDescription="{item}">
          <span> {{ item.ram }}/{{ item.cpus }}</span>
          <span aria-hidden="true"> &middot; </span>
          <span>{{ item.disk }}</span>
        </template>
      </VRadioGroup>
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <p class="font-medium px-2">
        Disclosure
      </p>
      <VDisclosure :items="disclosureItems" />
    </div>
    <div class="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3">
      <p class="font-medium px-2">
        Menu
      </p>
      <VMenu
        :items="menuItems"
        title="Menu"
        :icon="Cog6ToothIcon"
      />
    </div>
  </main>
</template>
