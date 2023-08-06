<script setup>
import { computed, ref, watch } from 'vue';
import BaseInput from './base-input.vue';
import BaseSpinner from './base-spinner.vue';
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { getString } from 'src/utils/resource';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: null,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  fullwidth: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: true,
  },
  itemsWidth: {
    type: String,
    default: 'full',
  },
  itemsAlign: {
    type: String,
    default: 'left',
  },
  size: {
    type: String,
    default: 'md',
  },
  classes: {
    type: Object,
    default: () => ({
      active: 'bg-indigo-600 text-white',
      item: '',
    }),
  },
  inputProps: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits([
  'focus',
  'update:modelValue',
  'search',
  'change',
  'end-scroll',
]);

const visibleItems = ref(false);
const searchText = ref(null);
const inputEl = ref(null);

const selected = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const style = computed(() => {
  const itemSizes = {
    sm: 'py-1.5 px-2.5',
    md: 'py-2 px-3',
  };
  return {
    items: [
      'text-sm min-w-full',
      props.itemsWidth === 'full' ? 'w-full' : 'w-fit',
      props.itemsAlign === 'left' ? 'left-0' : 'right-0',
    ],
    item: [
      'relative cursor-default select-none text-gray-900 hover:bg-indigo-600 hover:text-white',
      itemSizes[props.size],
      props.classes.item,
    ],
  };
});

function setSearchText() {
  searchText.value = selected.value ? selected.value.name : null;
}
function focus() {
  emit('focus');

  visibleItems.value = true;
}

function handleFocus() {
  if (!visibleItems.value) {
    focus();
  }
}
function handleClickOutside() {
  setSearchText();

  visibleItems.value = false;
}
function handleClickItem(item) {
  if (item.id !== selected.value?.id) {
    selected.value = item;
    emit('change', item);
  }

  visibleItems.value = false;
}
function handleSearch() {
  emit('search', searchText.value);
}
function handleOpenItems() {
  inputEl.value.element.focus();

  if (!visibleItems.value) {
    focus();
  }
}
function handleClear() {
  selected.value = null;

  emit('change');
}
function handleScroll(e) {
  if (e.target.scrollTop >= e.target.scrollHeight - e.target.clientHeight) {
    emit('end-scroll');
  }
}

watch(selected, () => {
  setSearchText();
});

setSearchText();
</script>

<template>
  <div
    :class="['relative', props.fullwidth ? 'w-full' : 'w-fit']"
    v-click-outside="handleClickOutside"
  >
    <slot name="toggle" :focus="handleFocus">
      <base-input
        ref="inputEl"
        type="text"
        :placeholder="props.placeholder"
        :classes="{
          input: 'read-only:cursor-default',
        }"
        :with-right-content="true"
        :with-label="false"
        :readonly="!props.searchable"
        :debounce="true"
        :fullwidth="props.fullwidth"
        v-bind="inputProps"
        v-model="searchText"
        v-on:focus="handleFocus"
        v-on:input="handleSearch"
      >
        <template #right-content>
          <base-spinner v-if="props.loading" size="sm" color="indigo" />
          <template v-else>
            <button
              v-if="selected"
              type="button"
              class="cursor-default"
              v-on:click="handleClear"
            >
              <x-mark-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="cursor-default"
              v-on:click="handleOpenItems"
            >
              <chevron-up-down-icon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </template>
        </template>
      </base-input>
    </slot>

    <ul
      v-if="visibleItems"
      :class="style.items"
      class="absolute z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      id="options"
      role="listbox"
      v-on:scroll="handleScroll"
    >
      <li
        v-if="!props.items.length"
        :class="style.item"
        id="option-0"
        role="option"
        tabindex="-1"
      >
        <span class="block truncate">{{ getString('message.empty') }}</span>
      </li>
      <template v-else>
        <li
          v-for="item in props.items"
          :key="item.id"
          :class="[
            style.item,
            selected?.id === item.id ? props.classes.active : '',
          ]"
          id="option-0"
          role="option"
          tabindex="-1"
          v-on:click="handleClickItem(item)"
        >
          <span class="block truncate">{{ item.name }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>
