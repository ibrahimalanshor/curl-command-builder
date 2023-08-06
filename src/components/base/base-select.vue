<script setup>
import { computed, ref } from 'vue';
import { getString } from 'src/utils/resource';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  withLabel: {
    type: Boolean,
    default: true,
  },
  withPlaceholder: {
    type: Boolean,
    default: true,
  },
  labelFromResource: {
    type: Boolean,
    default: false,
  },
  placeholderFromResource: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'gray',
  },
  message: {
    type: String,
    default: null,
  },
  modelValue: {
    type: null,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      input: '',
    }),
  },
  size: {
    type: String,
    default: 'md',
  },
  fullwidth: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
  collapsable: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const collapsed = ref(props.collapsed);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const label = computed(() => {
  return props.labelFromResource ? getString(props.label) : props.label;
});
const placeholder = computed(() => {
  return props.placeholderFromResource
    ? getString(props.placeholder)
    : props.placeholder;
});
const style = computed(() => {
  const inputSizes = {
    sm: 'pl-2.5 pr-10 py-1',
    md: 'pl-3 pr-10 py-1.5',
  };
  const inputColors = {
    gray: 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
    red: 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
  };

  return {
    input: {
      base: [
        props.fullwidth ? 'w-full' : '',
        props.classes.input,
        inputColors[props.color],
        inputSizes[props.size],
      ],
    },
  };
});
const attributes = computed(() => ({
  id: props.id,
  name: props.id,
  type: props.type,
  placeholder: placeholder.value,
  readonly: props.readonly,
  disabled: props.disabled,
  class: [
    'block rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:bg-gray-50',
    style.value.input.base,
  ],
}));

function handleChange() {
  emit('change');
}
function handleCollapse() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div :class="[props.fullwidth ? 'w-full' : 'w-fit']">
    <div v-if="props.withLabel" class="flex items-center justify-between mb-2">
      <label
        :for="props.id"
        class="block text-sm font-medium leading-6 text-gray-900"
        >{{ label }}</label
      >
      <button
        v-if="props.collapsable"
        type="button"
        v-on:click="handleCollapse"
      >
        <chevron-down-icon v-if="collapsed" class="w-5 h-5 text-gray-400" />
        <chevron-up-icon v-else class="w-5 h-5 text-gray-400" />
      </button>
    </div>
    <div
      v-if="!collapsed"
      :class="['relative', props.fullwidth ? 'w-full' : 'w-fit']"
    >
      <slot>
        <select v-bind="attributes" v-model="value" v-on:change="handleChange">
          <option v-if="props.withPlaceholder" :value="null">
            {{ placeholder }}
          </option>
          <option
            v-for="option in props.options"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </select>
      </slot>
    </div>
    <p v-if="props.message" class="mt-2 text-sm text-red-600">
      {{ props.message }}
    </p>
  </div>
</template>
