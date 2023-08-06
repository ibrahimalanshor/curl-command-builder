<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import BaseClose from './base-close.vue';

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    default: null,
  },
  titleFromResource: {
    type: Boolean,
    default: false,
  },
  messageFromResource: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success',
  },
});
const emit = defineEmits(['close']);

const icon = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
  };

  return icons[props.type];
});
const title = computed(() => {
  return props.titleFromResource ? getString(props.title) : props.title;
});
const message = computed(() => {
  return props.messageFromResource ? getString(props.message) : props.message;
});
const style = computed(() => {
  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
  };
  return {
    icon: {
      base: 'h-6 w-6',
      color: iconColors[props.type],
    },
  };
});

function handleClose() {
  emit('close');
}
</script>

<template>
  <!-- Global notification live region, render this permanently at the end of the document -->
  <div class="flex w-full justify-center space-y-4 sm:justify-end">
    <!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
    <div
      class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <component
              :is="icon"
              :class="[style.icon.base, style.icon.color]"
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{{ title }}</p>
            <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <base-close v-on:close="handleClose" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
