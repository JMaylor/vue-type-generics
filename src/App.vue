<script setup lang="ts">
import { ref } from 'vue'
import VListbox from './components/VListbox.vue'
import { AcademicCapIcon, CurrencyDollarIcon, CurrencyEuroIcon, CurrencyPoundIcon, CurrencyYenIcon } from '@heroicons/vue/20/solid'
import VCombobox from './components/VCombobox.vue';

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
</script>

<template>
  <main class="p-4 gap-4 grid grid-cols-12">
    <div class="col-span-3">
      <VListbox
        v-model="person"
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
    <div class="col-span-3">
      <VCombobox
        v-model="currency"
        :items="currencies"
        label="Combobox"
        value-key="iso_code"
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
  </main>
</template>
