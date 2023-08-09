<script setup>
import { computed } from 'vue';
import BaseSelect from 'src/components/base/base-select.vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: null,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);

const active = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const activeTab = computed(() =>
  props.tabs.find((tab) => tab.id === active.value)
);
const style = computed(() => {
  return {
    button: {
      base: 'rounded-md px-3 py-2 text-sm font-medium flex items-center gap-x-2',
      active: 'bg-indigo-100 text-indigo-700',
      inactive: 'text-gray-500 hover:text-gray-700',
    },
  };
});

function handleClickItem(item) {
  active.value = item.id;
}
</script>

<template>
  <div class="space-y-4">
    <div class="sm:hidden">
      <base-select :options="tabs" fullwidth v-model="active" />
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <template v-for="tab in tabs" :key="tab.id">
          <slot
            name="button"
            :tab="tab"
            :is-active="tab.id === active"
            :classes="style"
            :handle-click="() => handleClickItem(tab)"
          >
            <a
              href="#"
              :class="[
                active === tab.id ? style.button.active : style.button.inactive,
                style.button.base,
              ]"
              :aria-current="tab.id === active ? 'page' : undefined"
              v-on:click="handleClickItem(tab)"
            >
              {{ tab.name }}
              <svg
                class="h-1.5 w-1.5 fill-indigo-500"
                viewBox="0 0 6 6"
                aria-hidden="true"
              >
                <circle cx="3" cy="3" r="3" />
              </svg>
            </a>
          </slot>
        </template>
      </nav>
    </div>
    <component :is="activeTab.render" />
  </div>
</template>
