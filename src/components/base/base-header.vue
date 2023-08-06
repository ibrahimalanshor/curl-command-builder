<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';
import BaseTitle from './base-title.vue';
import BaseSkeleton from './base-skeleton.vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  titleFromResource: {
    type: Boolean,
    default: false,
  },
  titleLoading: {
    type: Boolean,
    default: false,
  },
});

const title = computed(() => {
  return props.titleFromResource ? getString(props.title) : props.title;
});
</script>

<template>
  <header class="bg-white shadow">
    <div
      class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <slot name="title">
        <base-skeleton class="w-1/4 !h-10" v-if="props.titleLoading" />
        <base-title v-else :level="3">{{ title }}</base-title>
      </slot>
      <slot name="action" />
    </div>
  </header>
</template>
