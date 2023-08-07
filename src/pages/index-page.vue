<script setup>
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import BaseActionButton from 'src/components/base/base-action-button.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseCard from 'src/components/base/base-card.vue';
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
});
const tabActive = ref('Headers');
const curl = ref(new Curl());
const testResult = ref(null);

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
]);

async function handleCopy() {
  await navigator.clipboard.writeText(curlResult.value);
}
async function handleTest() {
  try {
    testResult.value = (await curl.value.test()).data;
  } catch (err) {
    testResult.value = err.response.data;
  }
}

watch(curlOptions, () => {
  curl.value
    .setUrl(curlOptions.url)
    .setMethod(curlOptions.method)
    .setHeaders(curlOptions.headers)
    .setParams(curlOptions.params)
    .setBody(curlOptions.body);
});
</script>

<template>
  <base-container>
    <base-card title="Curl Command Generator" with-header custom-content>
      <template #header-actions>
        <base-button
          size="sm"
          color="indigo"
          :disabled="!curlOptions.url"
          v-on:click="handleTest"
          >Test</base-button
        >
      </template>

      <template #content="{ classes }">
        <div class="grid grid-cols-1">
          <div :class="[classes.content, 'space-y-4 border-b']">
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
          <div :class="[classes.content, 'border-b']">
            <base-input
              label="Result"
              placeholder="Curl"
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
          <div :class="[classes.content]">
            <base-input
              label="Test Result"
              placeholder="Test Result"
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
                {{ testResult }}
              </div>
            </base-input>
          </div>
        </div>
      </template>
    </base-card>
  </base-container>
</template>
