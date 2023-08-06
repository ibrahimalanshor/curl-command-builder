<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';

const props = defineProps({
  color: {
    type: String,
    default: 'gray',
  },
  text: {
    type: String,
    default: null,
  },
  textFromResource: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
});

const style = computed(() => {
  const colors = {
    white: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    red: 'bg-red-50 px-2 py-1 text-red-700 ring-red-600/10',
    yellow: 'bg-yellow-50 px-2 py-1 text-yellow-800 ring-yellow-600/20',
    green: 'bg-green-50 px-2 py-1 text-green-700 ring-green-600/20',
    blue: 'bg-blue-50 px-2 py-1 text-blue-700 ring-blue-700/10',
    indigo: 'bg-indigo-50 px-2 py-1 text-indigo-700 ring-indigo-700/10',
    purple: 'bg-purple-50 px-2 py-1 text-purple-700 ring-purple-700/10',
    pink: 'bg-pink-50 px-2 py-1 text-pink-700 ring-pink-700/10',
  };
  const sizes = {
    sm: 'rounded-md px-1.5 py-0.5 text-xs',
    md: 'rounded-md px-2 py-1 text-xs',
  };

  return [
    'inline-flex items-center font-medium ring-1 ring-inset',
    colors[props.color],
    sizes[props.size],
  ];
});
const text = computed(() =>
  props.textFromResource ? getString(props.text) : props.text
);
</script>

<template>
  <span :class="style">{{ text }}</span>
</template>
