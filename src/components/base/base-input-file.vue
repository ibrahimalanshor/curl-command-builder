<script setup>
import { PhotoIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: null,
    value: null,
  },
  actionText: {
    type: String,
    default: 'Upload a file',
  },
  messageText: {
    type: String,
    default: 'or drag and drop',
  },
  helpText: {
    type: String,
    default: 'PNG, JPG, GIF up to 10MB',
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const file = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

function handleChange(e) {
  file.value = e.target.files[0];

  emit('change');
}
</script>

<template>
  <div
    class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
  >
    <div class="text-center">
      <photo-icon class="mx-auto h-12 w-12 text-gray-300" />
      <div class="mt-4 flex text-sm leading-6 text-gray-600">
        <label
          for="file-upload"
          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <span>{{ props.actionText }}</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            v-on:change="handleChange"
          />
        </label>
        <p class="pl-1">{{ props.messageText }}</p>
      </div>
      <p class="text-xs leading-5 text-gray-600">{{ props.helpText }}</p>
    </div>
  </div>
</template>
