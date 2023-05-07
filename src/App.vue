<script setup lang="ts">
import { ref } from 'vue'
import VListbox from './components/VListbox.vue'
import { AcademicCapIcon } from '@heroicons/vue/20/solid'
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
</script>

<template>
  <main class="p-4">
    <VListbox
      v-model="person"
      :items="people"
      label="Listbox"
      value-key="id"
      display-key="name"
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
          class="h-4 w-4"
        />
      </template>
    </VListbox>
    <VCombobox
      v-model="person"
      :items="people"
      label="Combobox"
      value-key="id"
      display-key="name"
    />
  </main>
</template>
