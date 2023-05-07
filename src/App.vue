<script setup lang="ts">
import { ref } from 'vue'
import VSelect from './components/VSelect.vue'

const people = ref([
  {
    id: 1,
    name: 'Frodo',
    age: 50
  },
  {
    id: 2,
    name: 'Gandalf',
    age: 24_000
  }
])

const person = ref<number>()
</script>

<template>
  <main>
    <VSelect
      v-model="person"
      :items="people"
      label="Character"
      value-key="id"
      display-key="name"
    />
  </main>
</template>
