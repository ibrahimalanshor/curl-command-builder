<script setup>
const emit = defineEmits(['close']);

function handleClick() {
  emit('close');
}
</script>

<template>
  <button
    type="button"
    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    v-on:click="handleClick"
  >
    <slot />
  </button>
</template>
