<script setup>
import { computed } from 'vue';
import BaseTitle from './base-title.vue';

const props = defineProps({
  withHeader: {
    type: Boolean,
    default: false,
  },
  withFooter: {
    type: Boolean,
    default: false,
  },
  customContent: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  classes: {
    type: Object,
    default: () => ({
      base: '',
      header: '',
    }),
  },
});

const style = computed(() => {
  return {
    content: 'px-4 py-4 sm:px-6',
  };
});
</script>

<template>
  <div :class="['bg-white rounded-lg shadow', props.classes.base]">
    <div
      v-if="props.withHeader"
      :class="[
        'border-b rounded-t-lg border-gray-200 bg-white px-4 py-5 sm:px-6 flex items-center justify-between',
        props.classes.header,
      ]"
    >
      <slot name="title">
        <base-title :level="6" semibold>{{ title }}</base-title>
      </slot>
      <slot name="header-actions" />
    </div>
    <template v-if="props.customContent">
      <slot name="content" :classes="style" />
    </template>
    <div v-else :class="style.content">
      <slot />
    </div>
    <div
      v-if="props.withFooter"
      class="border-t rounded-b-lg border-gray-200 bg-white px-4 py-5 sm:px-6"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
