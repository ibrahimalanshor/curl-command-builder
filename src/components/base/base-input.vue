<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'string',
  },
  modelValue: {
    type: String,
    default: null,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  withLabel: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const attributes = computed(() => ({
  id: props.id,
  name: props.id,
  type: props.type,
  placeholder: props.placeholder,
  class:
    'block rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-50 w-full text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 px-2.5 py-1.5',
}));
</script>

<template>
  <div class="w-full">
    <div v-if="props.withLabel" class="mb-2 flex items-center justify-between">
      <label
        :for="props.id"
        class="block text-sm font-medium leading-6 text-gray-900"
        >{{ label }}</label
      >
      <slot name="action"></slot>
    </div>
    <slot>
      <textarea v-if="props.textarea" v-bind="attributes" v-model="value" />
      <input v-else v-bind="attributes" v-model="value" />
    </slot>
  </div>
</template>
