<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { computed } from 'vue';
import { getString } from 'src/utils/resource';

const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const parsedMeta = computed(() => {
  const offset = (props.meta.current_page - 1) * props.meta.per_page;

  return {
    from: offset + 1,
    to: offset + props.meta.per_page,
    ...props.meta,
  };
});

function handleClickPage(page) {
  currentPage.value = page;

  emit('change');
}
function handlePrev() {
  if (currentPage.value > 1) {
    currentPage.value--;

    emit('change');
  }
}
function handleNext() {
  if (currentPage.value < parsedMeta.value.last_page) {
    currentPage.value++;

    emit('change');
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm text-gray-700">
        {{ getString('pagination.showing') }}
        {{ ' ' }}
        <span class="font-medium">{{ parsedMeta.from }}</span>
        {{ ' ' }}
        {{ getString('pagination.to') }}
        {{ ' ' }}
        <span class="font-medium">{{ parsedMeta.to }}</span>
        {{ ' ' }}
        {{ getString('pagination.of') }}
        {{ ' ' }}
        <span class="font-medium">{{ parsedMeta.total }}</span>
        {{ ' ' }}
        {{ getString('pagination.results') }}
      </p>
    </div>
    <div>
      <nav
        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          :class="[
            'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
            currentPage < 2 ? 'cursor-default' : '',
          ]"
          v-on:click="handlePrev"
        >
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          v-for="page in parsedMeta.last_page"
          :key="page"
          class="relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20"
          :class="[
            currentPage === page
              ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0',
          ]"
          v-on:click="handleClickPage(page)"
        >
          {{ page }}
        </button>
        <button
          :class="[
            'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
            currentPage === parsedMeta.last_page ? 'cursor-default' : '',
          ]"
          v-on:click="handleNext"
        >
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>
