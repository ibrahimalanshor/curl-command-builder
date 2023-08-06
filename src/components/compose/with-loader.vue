<script setup>
import BaseSpinner from 'src/components/base/base-spinner.vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      loader: '',
    }),
  },
});
</script>

<template>
  <div class="relative">
    <div
      v-if="props.loading"
      class="absolute top-0 left-0 bg-gray-50 w-full h-full opacity-50 flex items-center justify-center"
      :class="props.classes.loader"
    >
      <div class="relative">
        <base-spinner />
      </div>
    </div>
    <slot />
  </div>
</template>
