<script setup>
import { computed } from 'vue';

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

function handleClickItem(item) {
  active.value = item.id;
}
</script>

<template>
  <div class="space-y-4">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <a
          v-for="tab in tabs"
          :key="tab.id"
          href="#"
          :class="[
            active === tab.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-500 hover:text-gray-700',
            'rounded-md px-3 py-2 text-sm font-medium',
          ]"
          :aria-current="tab.id === active ? 'page' : undefined"
          v-on:click="handleClickItem(tab)"
          >{{ tab.name }}</a
        >
      </nav>
    </div>
    <component :is="activeTab.render" />
  </div>
</template>
