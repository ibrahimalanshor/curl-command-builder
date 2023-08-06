<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  width: {
    type: String,
    default: 'full',
  },
  position: {
    type: String,
    default: 'left',
  },
  size: {
    type: String,
    default: 'md',
  },
  customWidth: {
    type: String,
    default: null,
  },
  textWrap: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['click-item']);

const visible = ref(false);

const style = computed(() => {
  const itemSizes = {
    sm: 'py-1.5 px-2.5',
    md: 'py-2 px-3',
  };

  return {
    items: [
      props.customWidth
        ? props.customWidth
        : props.width === 'full'
        ? 'w-full'
        : 'w-fit',
      props.position === 'left' ? 'left-0' : 'right-0',
      'absolute z-10 mt-2 min-w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
    ],
    item: [
      itemSizes[props.size],
      'block text-sm text-gray-700 hover:bg-gray-100',
      props.textWrap ? '' : 'whitespace-nowrap',
    ],
  };
});

function handleToggle() {
  visible.value = !visible.value;
}
function handleClose() {
  visible.value = false;
}
function handleClickItem(item) {
  visible.value = false;

  emit('click-item', item);
}
</script>

<template>
  <div
    :class="['relative', props.classes.wrapper]"
    v-click-outside="handleClose"
  >
    <div :class="['h-full', props.classes.toggle]">
      <slot name="toggle" :toggle="handleToggle" />
    </div>
    <div
      v-if="visible"
      :class="style.items"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabindex="-1"
    >
      <slot name="content" :classes="style">
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <template v-for="item in props.items" :key="item.id">
          <component
            v-if="item.render"
            :is="item.render"
            :item="item"
            :classes="style"
          />
          <router-link v-else-if="item.to" :class="style.item" :to="item.to">{{
            item.name
          }}</router-link>
          <a
            v-else
            href="#"
            :class="style.item"
            tabindex="-1"
            v-on:click.prevent="handleClickItem(item)"
          >
            {{ item.name }}
          </a>
        </template>
      </slot>
    </div>
  </div>
</template>
