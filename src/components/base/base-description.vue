<script setup>
import { computed } from 'vue';

const props = defineProps({
  attributes: {
    type: Array,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  cols: {
    type: String,
    default: 'grid-cols-1 sm:grid-cols-2',
  },
  contentGaps: {
    type: String,
    default: 'space-y-2',
  },
  reverseColor: {
    type: Boolean,
    default: false,
  },
});

const style = computed(() => {
  return {
    title: props.reverseColor ? 'text-gray-500' : 'text-gray-900',
    description: props.reverseColor ? 'text-gray-900' : 'text-gray-700',
  };
});
</script>

<template>
  <dl
    :class="[
      props.inline
        ? 'divide-y divide-gray-100'
        : ['grid gap-x-4 gap-y-6', props.cols],
    ]"
  >
    <div
      v-for="attribute in props.attributes"
      :key="attribute.id"
      :class="[
        props.inline
          ? ['px-4 py-6 sm:grid sm:grid-cols-3 sm:px-6 sm:gap-4']
          : [
              'border-gray-100',
              attribute.fullwidth ? 'col-span-full' : 'sm:col-span-1',
              props.contentGaps,
            ],
        attribute.wrapperClass,
      ]"
    >
      <dt :class="['text-sm font-medium leading-6', style.title]">
        {{ attribute.name }}
      </dt>
      <dd
        :class="[
          'text-sm leading-6',
          props.inline ?? 'sm:col-span-2 sm:mt-0',
          style.description,
        ]"
      >
        <slot :name="attribute.id">
          <component v-if="attribute.render" :is="attribute.render" />
          <span v-else>{{
            attribute.value ? attribute.value : props.data[attribute.id]
          }}</span>
        </slot>
      </dd>
    </div>
  </dl>
</template>
