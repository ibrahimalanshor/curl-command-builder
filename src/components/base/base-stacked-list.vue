<script setup>
import { computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const style = computed(() => {
  return {
    name: 'text-sm font-semibold leading-6 text-gray-900',
    description: 'whitespace-nowrap',
  };
});
</script>

<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="item in props.data"
      :key="item.id"
      class="flex items-center justify-between gap-x-6 py-5 px-4 sm:px-6"
    >
      <div class="min-w-0">
        <div class="flex items-start gap-x-3">
          <slot name="name" :item="item" :classes="style">
            <p :class="style.name">{{ item.name }}</p>
          </slot>
        </div>
        <div
          class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
        >
          <slot name="description" :item="item" :classes="style">
            <p :class="style.description">{{ item.description }}</p>
          </slot>
        </div>
      </div>
      <div>
        <slot name="action" :item="item" />
      </div>
    </li>
  </ul>
</template>
