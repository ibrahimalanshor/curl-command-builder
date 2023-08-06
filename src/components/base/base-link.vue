<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  native: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: null,
  },
  textFromResource: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['click']);

const text = computed(() => {
  return props.textFromResource ? getString(props.text) : props.text;
});
const style = computed(() => {
  return {
    base: 'font-semibold leading-6 text-sm text-indigo-600 hover:text-indigo-500',
  };
});

function handleClick(e) {
  emit('click', e);
}
</script>

<template>
  <p>
    <a
      v-if="props.native"
      :href="props.to"
      :class="style.base"
      v-on:click="handleClick"
    >
      {{ text }}
    </a>
    <router-link v-else :to="props.to" :class="style.base">{{
      text
    }}</router-link>
  </p>
</template>
