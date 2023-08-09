<script setup>
import { computed, ref } from 'vue';

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
  modelValue: {
    type: null,
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  fullwidth: {
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
  class: [
    'block pl-3 pr-10 py-1.5 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-50',
    props.fullwidth ? 'w-full' : '',
  ],
}));
</script>

<template>
  <div :class="props.fullwidth ? 'w-full' : ''">
    <div v-if="props.withLabel" class="mb-2">
      <label
        :for="props.id"
        class="block text-sm font-medium leading-6 text-gray-900"
        >{{ label }}</label
      >
    </div>
    <select v-bind="attributes" v-model="value">
      <option
        v-for="option in props.options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
