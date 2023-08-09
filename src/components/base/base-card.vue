<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
});

const style = computed(() => {
  return {
    content: 'px-4 py-4 sm:px-6',
  };
});
</script>

<template>
  <div class="bg-white rounded-lg shadow">
    <div
      class="border-b rounded-t-lg border-gray-200 bg-white px-4 py-5 sm:px-6 flex items-center justify-between"
    >
      <h1 class="text-gray-900 tracking-tight font-semibold text-base">
        {{ title }}
      </h1>
      <slot name="action" />
    </div>
    <slot name="content" :classes="style" />
  </div>
</template>
