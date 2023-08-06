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
  modelValue: {
    type: [Boolean, Array],
    default: null,
  },
  value: {
    type: null,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const checked = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const text = computed(() => {
  return props.textFromResource ? getString(props.text) : props.text;
});

function handleChange() {
  emit('change');
}
</script>

<template>
  <label class="relative flex items-start">
    <div class="flex h-6 items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        :value="props.value"
        v-model="checked"
        v-on:change="handleChange"
      />
    </div>
    <div class="ml-3 text-sm leading-6">
      <span
        for="candidates"
        class="font-medium text-gray-900 whitespace-nowrap"
        >{{ text }}</span
      >
    </div>
  </label>
</template>
