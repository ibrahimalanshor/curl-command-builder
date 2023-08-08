<script setup>
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import BaseActionButton from 'src/components/base/base-action-button.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseCheckbox from 'src/components/base/base-checkbox.vue';
import BaseContainer from 'src/components/base/base-container.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseTab from 'src/components/base/base-tab.vue';
import { computed, ref, h, reactive, watch } from 'vue';
import { Curl } from 'src/helpers/curl';

const curlOptions = reactive({
  url: null,
  method: 'GET',
  headers: null,
  params: null,
  body: null,
  output: null,
  options: {
    verbose: false,
    compressed: false,
    headerOnly: false,
  },
});
const tabActive = ref('Headers');
const curl = ref(new Curl());

const curlResult = computed(() => {
  return curl.value.result();
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
        modelValue: curlOptions.headers,
        'onUpdate:modelValue': (value) => (curlOptions.headers = value),
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
        modelValue: curlOptions.params,
        'onUpdate:modelValue': (value) => (curlOptions.params = value),
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
        modelValue: curlOptions.body,
        'onUpdate:modelValue': (value) => (curlOptions.body = value),
      }),
  },
  {
    id: 'Output',
    name: 'Output',
    render: () =>
      h(BaseInput, {
        type: 'text',
        placeholder: 'file.txt',
        fullwidth: true,
        withLabel: false,
        modelValue: curlOptions.output,
        'onUpdate:modelValue': (value) => (curlOptions.output = value),
      }),
  },
  {
    id: 'Options',
    name: 'Options',
    render: () =>
      h(
        'div',
        { class: 'flex flex-col gap-4' },
        {
          default: () => [
            h(BaseCheckbox, {
              text: 'Verbose (-v)',
              modelValue: curlOptions.options.verbose,
              'onUpdate:modelValue': (value) =>
                (curlOptions.options.verbose = value),
            }),
            h(BaseCheckbox, {
              text: 'Compressed (--compressed)',
              modelValue: curlOptions.options.compressed,
              'onUpdate:modelValue': (value) =>
                (curlOptions.options.compressed = value),
            }),
            h(BaseCheckbox, {
              text: 'Header Only (-I)',
              modelValue: curlOptions.options.headerOnly,
              'onUpdate:modelValue': (value) =>
                (curlOptions.options.headerOnly = value),
            }),
          ],
        }
      ),
  },
]);

async function handleCopy() {
  await navigator.clipboard.writeText(curlResult.value);
}

watch(curlOptions, () => {
  curl.value
    .setUrl(curlOptions.url)
    .setMethod(curlOptions.method)
    .setHeaders(curlOptions.headers)
    .setParams(curlOptions.params)
    .setBody(curlOptions.body)
    .setOutput(curlOptions.output)
    .setOptions(curlOptions.options);
});
</script>

<template>
  <base-container>
    <base-card title="Curl Command Generator" with-header custom-content>
      <template #content="{ classes }">
        <div class="grid grid-cols-1">
          <div :class="[classes.content, 'space-y-4']">
            <div :class="['flex gap-x-4']">
              <base-select
                label="Method"
                :options="methodOptions"
                :with-placeholder="false"
                :with-label="false"
                v-model="curlOptions.method"
              />
              <base-input
                label="URL"
                placeholder="https://example.com"
                type="text"
                fullwidth
                :with-label="false"
                v-model="curlOptions.url"
              />
            </div>
            <base-tab :tabs="tabs" v-model="tabActive" />
          </div>
          <div :class="[classes.content, 'border-t']">
            <base-input
              label="Curl Result"
              placeholder="Curl Result"
              textarea
              readonly
              :classes="{
                input: 'bg-gray-50 select-all',
              }"
            >
              <template #action>
                <base-action-button v-on:click="handleCopy">
                  <clipboard-icon class="w-4 h-4"></clipboard-icon>
                </base-action-button>
              </template>
              <div
                class="min-h-[fit] whitespace-pre text-sm leading-6 bg-gray-50 select-all rounded-md shadow-sm ring-1 ring-inset px-2.5 py-1.5 text-gray-900 ring-gray-300"
              >
                {{ curlResult }}
              </div>
            </base-input>
          </div>
        </div>
      </template>
    </base-card>
  </base-container>
</template>
