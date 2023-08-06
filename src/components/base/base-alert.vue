<script setup>
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/20/solid';
import { computed } from 'vue';
import { getString } from 'src/utils/resource';

const props = defineProps({
  forceVisible: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success',
  },
  text: {
    type: String,
    default: null,
  },
  textFromResource: {
    type: Boolean,
    default: false,
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['close']);

const text = computed(() => {
  return props.textFromResource ? getString(props.text) : props.text;
});
const icon = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
  };

  return icons[props.type];
});
const style = computed(() => {
  const bgColors = {
    success: 'bg-green-50',
    error: 'bg-red-50',
    info: 'bg-blue-50',
    warning: 'bg-yellow-50',
  };
  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
  };
  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-700',
    warning: 'text-yellow-700',
  };
  const closeColors = {
    success:
      'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
    error:
      'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
    info: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50',
    warning:
      'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
  };

  return {
    bg: [bgColors[props.type]],
    icon: [iconColors[props.type]],
    text: [textColors[props.type], 'text-sm font-medium'],
    close: [closeColors[props.type]],
  };
});

function handleClose() {
  emit('close');
}
</script>

<template>
  <div v-if="props.forceVisible" class="rounded-md p-4" :class="style.bg">
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icon"
          class="h-5 w-5"
          :class="style.icon"
          aria-hidden="true"
        />
      </div>
      <div class="ml-3">
        <slot name="text" :classes="style"
          ><p :class="style.text">{{ text }}</p></slot
        >
      </div>
      <div class="ml-auto pl-3" v-if="props.dismissable">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            :class="style.close"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            v-on:click="handleClose"
          >
            <span class="sr-only">Dismiss</span>
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
