<script lang='ts' setup>
import type { Component } from 'vue';

defineProps<{
  component: string | Component
}>()

</script>
<template>
  <component
    :is="component"
    class="p-2 font-medium"
  >
    <slot />
  </component>
</template>