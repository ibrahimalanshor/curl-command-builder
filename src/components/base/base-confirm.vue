<script setup>
import { computed } from 'vue';
import { getString } from 'src/utils/resource';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import BaseModal from './base-modal.vue';
import BaseButton from './base-button.vue';
import BaseTitle from './base-title.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'success',
  },
  title: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    default: null,
  },
  action: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const icon = computed(() => {
  const icons = {
    success: CheckIcon,
    danger: ExclamationTriangleIcon,
    warning: ExclamationTriangleIcon,
  };

  return icons[props.type];
});
const style = computed(() => {
  const iconWrapperColors = {
    success: 'bg-green-100',
    danger: 'bg-red-100',
    warning: 'bg-yellow-100',
  };
  const iconColors = {
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
  };

  return {
    iconWrapper: [
      'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
      iconWrapperColors[props.type],
    ],
    icon: ['h-6 w-6', iconColors[props.type]],
  };
});
const actionProps = computed(() => {
  const colors = {
    success: 'indigo',
    danger: 'red',
    warning: 'yellow',
  };
  return {
    color: colors[props.type],
    text: props.action,
    loading: props.loading,
  };
});

function handleCancel() {
  visible.value = false;
}
function handleConfirm() {
  emit('confirm');
}
</script>

<template>
  <base-modal v-model="visible">
    <div class="space-y-4">
      <div :class="style.iconWrapper">
        <component :is="icon" :class="style.icon" />
      </div>
      <div class="text-center space-y-2">
        <base-title :level="6" semibold :tight="false">{{
          props.title
        }}</base-title>
        <div class="">
          <p class="text-sm text-gray-500 whitespace-normal">
            {{ props.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
      <base-button
        :text="getString('actions.cancel')"
        v-on:click="handleCancel"
      />
      <base-button v-bind="actionProps" v-on:click="handleConfirm" />
    </div>
  </base-modal>
</template>
