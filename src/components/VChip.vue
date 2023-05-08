<script lang='ts' setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'

defineEmits<{
  (e: 'delete'): void
}>()
</script>
<template>
  <div class="rounded px-1 bg-blue-100 flex items-center">
    <slot />
    <button
      class="ml-1"
      type="button"
      @click.stop="$emit('delete')"
    >
      <XMarkIcon
        class="h-5 w-5"
      />
    </button>
  </div>
</template>