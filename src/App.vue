<script setup>
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import GithubIcon from 'src/assets/github.svg';
import BaseIconButton from 'src/components/base/base-icon-button.vue';
import BaseButton from 'src/components/base/base-button.vue';
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
    fillCheck: () => !!curlOptions.headers,
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
    fillCheck: () => !!curlOptions.params,
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
    fillCheck: () => !!curlOptions.body,
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
    fillCheck: () => !!curlOptions.output,
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
    fillCheck: () =>
      Object.values(curlOptions.options).reduce(
        (prev, current) => (prev += current),
        0
      ),
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
              text: 'Header Only (-I)',
              modelValue: curlOptions.options.headerOnly,
              'onUpdate:modelValue': (value) =>
                (curlOptions.options.headerOnly = value),
            }),
            h(BaseCheckbox, {
              text: 'Compressed (--compressed)',
              modelValue: curlOptions.options.compressed,
              'onUpdate:modelValue': (value) =>
                (curlOptions.options.compressed = value),
            }),
          ],
        }
      ),
  },
]);

function isTabFilled(tab) {
  if (!tab.fillCheck) {
    return false;
  }

  return tab.fillCheck();
}

async function handleCopy() {
  await navigator.clipboard.writeText(curlResult.value);
}
function handleReset() {
  curlOptions.url = null;
  curlOptions.method = 'GET';
  curlOptions.headers = null;
  curlOptions.params = null;
  curlOptions.body = null;
  curlOptions.output = null;
  curlOptions.options.verbose = false;
  curlOptions.options.headerOnly = false;
  curlOptions.options.compressed = false;
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
    <div class="flex justify-end mb-4">
      <a
        href="https://github.com/ibrahimalanshor/curl-command-builder"
        target="_blank"
      >
        <img :src="GithubIcon" alt="Github" class="w-4 h-4" />
      </a>
    </div>
    <base-card title="Curl Command Builder" with-header custom-content>
      <template #action>
        <base-button size="sm" color="indigo" v-on:click="handleReset"
          >Reset</base-button
        >
      </template>
      <template #content="{ classes }">
        <div class="grid grid-cols-1">
          <div :class="[classes.content, 'space-y-4']">
            <div :class="['flex gap-x-4']">
              <base-select
                label="Method"
                :options="methodOptions"
                v-model="curlOptions.method"
              />
              <base-input
                label="URL"
                placeholder="https://example.com"
                type="text"
                fullwidth
                v-model="curlOptions.url"
              />
            </div>
            <base-tab :tabs="tabs" v-model="tabActive">
              <template #button="{ tab, classes, isActive, handleClick }">
                <button
                  :class="[
                    classes.button.base,
                    isActive ? classes.button.active : classes.button.inactive,
                  ]"
                  v-on:click="handleClick"
                >
                  {{ tab.name }}
                  <svg
                    v-if="isTabFilled(tab)"
                    class="h-1.5 w-1.5 fill-indigo-500"
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx="3" cy="3" r="3" />
                  </svg>
                </button>
              </template>
            </base-tab>
          </div>
          <div :class="[classes.content, 'border-t']">
            <base-input
              label="Curl Result"
              placeholder="Curl Result"
              textarea
              with-label
            >
              <template #action>
                <base-icon-button class="relative" v-on:click="handleCopy">
                  <clipboard-icon class="w-4 h-4"></clipboard-icon>
                </base-icon-button>
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
