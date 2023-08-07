<script setup>
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import BaseActionButton from 'src/components/base/base-action-button.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseContainer from 'src/components/base/base-container.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseTab from 'src/components/base/base-tab.vue';
import { computed, ref, h } from 'vue';

const url = ref(null);
const method = ref('GET');
const header = ref(null);
const params = ref(null);
const body = ref(null);
const tabActive = ref('Headers');

const result = computed(() => {
  return [
    `curl -X ${method.value} ${url.value ?? ''}${
      params.value ? `?${params.value.split('\n').join('&')}` : ''
    }`,
    ...(header.value
      ? [
          `-H ${
            header.value ? header.value.split('\n').join(' \\\n\t-H ') : ''
          }`,
        ]
      : []),
    ...(body.value ? [`-d '${body.value}'`] : []),
  ].join(' \\\n\t');
});
const methodOptions = computed(() => [
  { id: 'GET', name: 'GET' },
  { id: 'POST', name: 'POST' },
  { id: 'PATCH', name: 'PATCH' },
  { id: 'DELETE', name: 'DELETE' },
]);
const tabs = computed(() => [
  {
    id: 'Headers',
    name: 'Headers',
    render: () =>
      h(BaseInput, {
        placeholder: '"Content-Type: application/json"',
        textarea: true,
        fullwidth: true,
        withLabel: false,
        modelValue: header.value,
        'onUpdate:modelValue': (value) => (header.value = value),
      }),
  },
  {
    id: 'Params',
    name: 'Params',
    render: () =>
      h(BaseInput, {
        placeholder: 'search=value',
        textarea: true,
        fullwidth: true,
        withLabel: false,
        modelValue: params.value,
        'onUpdate:modelValue': (value) => (params.value = value),
      }),
  },
  {
    id: 'Body',
    name: 'Body',
    render: () =>
      h(BaseInput, {
        placeholder: '{"key1":"value1", "key2":"value2"}',
        textarea: true,
        fullwidth: true,
        withLabel: false,
        modelValue: body.value,
        'onUpdate:modelValue': (value) => (body.value = value),
      }),
  },
]);

async function handleCopy() {
  await navigator.clipboard.writeText(result.value);
}
</script>

<template>
  <base-container>
    <base-card title="Curl Command Generator" with-header custom-content>
      <template #content="{ classes }">
        <div class="grid grid-cols-1">
          <div :class="[classes.content, 'space-y-4 border-b']">
            <div :class="['flex gap-x-4']">
              <base-select
                label="Method"
                :options="methodOptions"
                :with-placeholder="false"
                :with-label="false"
                v-model="method"
              />
              <base-input
                label="URL"
                placeholder="https://example.com"
                type="text"
                fullwidth
                :with-label="false"
                v-model="url"
              />
            </div>
            <base-tab :tabs="tabs" v-model="tabActive" />
          </div>
          <div :class="[classes.content, 'border-l']">
            <base-input
              label="Result"
              placeholder="Curl"
              textarea
              readonly
              :classes="{
                input: 'bg-gray-50 select-all',
              }"
              v-model="result"
            >
              <template #action>
                <base-action-button v-on:click="handleCopy">
                  <clipboard-icon class="w-4 h-4"></clipboard-icon>
                </base-action-button>
              </template>
              <div
                class="min-h-[fit] whitespace-pre text-sm leading-6 bg-gray-50 select-all rounded-md shadow-sm ring-1 ring-inset px-2.5 py-1.5 text-gray-900 ring-gray-300"
              >
                {{ result }}
              </div>
            </base-input>
          </div>
        </div>
      </template>
    </base-card>
  </base-container>
</template>
