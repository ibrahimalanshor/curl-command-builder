<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';

const props = defineProps({
  text: {
    type: String,
    default: null,
  },
  textFromResource: {
    type: Boolean,
    default: false,
  },
  semibold: {
    type: Boolean,
    default: false,
  },
  tight: {
    type: Boolean,
    default: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  classes: {
    type: Object,
    default: () => ({
      base: '',
    }),
  },
});

const text = computed(() => {
  return props.textFromResource ? getString(props.text) : props.text;
});
const style = computed(() => {
  const levels = {
    1: 'text-3xl',
    2: 'text-2xl',
    3: 'text-3xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base',
  };
  return {
    base: [
      'text-gray-900',
      props.tight ? 'tracking-tight' : '',
      props.semibold ? 'font-semibold' : 'font-bold',
      props.classes.base,
    ],
    level: levels[props.level],
  };
});
</script>

<template>
  <component :is="`h${props.level}`" :class="[style.base, style.level]">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
