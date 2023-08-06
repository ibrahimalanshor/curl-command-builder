<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
    <dt class="truncate text-sm font-medium text-gray-500">{{ props.name }}</dt>
    <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
      {{ props.value }}
    </dd>
  </div>
</template>
