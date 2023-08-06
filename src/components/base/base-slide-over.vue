<script setup>
import { computed, watch } from 'vue';
import { getString } from 'src/utils/resource.js';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseTitle from './base-title.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleFromResource: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'visible']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const title = computed(() =>
  props.titleFromResource ? getString(props.title) : props.title
);

function handleClose() {
  visible.value = false;
}

watch(visible, (value) => {
  if (value) {
    emit('visible');
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
    v-click-outside="handleClose"
  >
    <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
    <div class="pointer-events-auto w-screen max-w-md">
      <div
        class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl"
      >
        <div class="px-4 sm:px-6">
          <div class="flex items-start justify-between">
            <slot name="title">
              <base-title
                :level="6"
                :tight="false"
                :classes="{
                  base: 'leading-6',
                }"
                semibold
              >
                {{ title }}
              </base-title>
            </slot>
            <slot name="action">
              <div class="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  v-on:click="handleClose"
                >
                  <span class="absolute -inset-2.5"></span>
                  <span class="sr-only">Close panel</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </slot>
          </div>
        </div>
        <div class="relative mt-6 flex-1 px-4 sm:px-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
