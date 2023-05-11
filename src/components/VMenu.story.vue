<script lang='ts' setup>
import { Cog6ToothIcon } from '@heroicons/vue/20/solid';
import VMenu from './VMenu.vue';
import menuItems from '@/resources/menuItems';


</script>
<template>
  <Story>
    <div class="p-2">
      <VMenu
        :items="menuItems"
        title="Menu"
        :icon="Cog6ToothIcon"
      />
    </div>
  </Story>
</template>