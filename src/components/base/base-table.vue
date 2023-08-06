<script setup>
import { getString } from 'src/utils/resource';
import WithLoader from 'src/components/compose/with-loader.vue';
import BasePagination from 'src/components/base/base-pagination.vue';
import { computed } from 'vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  withPagination: {
    type: Boolean,
    default: false,
  },
  withFooter: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
  page: {
    type: Number,
    default: 1,
  },
  sort: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'md',
  },
});
const emit = defineEmits([
  'update:page',
  'change-page',
  'update:sort',
  'change-sort',
]);

const currentPage = computed({
  get() {
    return props.page;
  },
  set(value) {
    emit('update:page', value);
  },
});
const currentSort = computed({
  get() {
    return props.sort;
  },
  set(value) {
    emit('update:sort', value);
  },
});
const parsedSort = computed(() => {
  const isDesc = currentSort.value?.charAt(0) === '-';

  return {
    direction: isDesc ? 'desc' : 'asc',
    column: currentSort.value?.slice(isDesc ? 1 : 0),
  };
});
const style = computed(() => {
  const thSizes = {
    sm: 'px-2 py-2 first:pl-4 first:pr-3',
    md: 'px-3 py-3.5 first:pl-4 first:pr-3 first:sm:pl-6',
  };
  const tdSizes = {
    sm: 'px-2 py-2 first:pl-4 first:pr-3',
    md: 'px-3 py-4 first:pl-4 first:pr-3 first:sm:pl-6',
  };

  return {
    th: [
      'text-left text-sm font-semibold text-gray-900 border-b border-gray-200 border-b-gray-300 first:border-l first:rounded-tl-lg last:border-r last:rounded-tr-lg',
      thSizes[props.size],
    ],
    td: [
      'whitespace-nowrap text-sm border-b border-gray-200 first:border-l last:border-r',
      tdSizes[props.size],
    ],
  };
});

function handleChangePage() {
  emit('change-page');
}
function handleSort(column) {
  if (column.sortable ?? true) {
    currentSort.value = `${
      parsedSort.value.column !== 'column' &&
      parsedSort.value.direction === 'desc'
        ? ''
        : '-'
    }${column.id}`;

    emit('change-sort');
  }
}
</script>

<template>
  <div class="flow-root max-w-full overflow-x-auto">
    <div class="relative shadow rounded-lg">
      <div class="inline-block min-w-full align-middle">
        <with-loader :loading="props.loading">
          <table class="min-w-full border-separate border-spacing-0">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in props.columns"
                  :key="column.id"
                  scope="col"
                  :class="[style.th, column.headerClass]"
                >
                  <div
                    :class="[
                      'group inline-flex',
                      column.sortable ?? true ? 'cursor-pointer' : '',
                    ]"
                    v-on:click="handleSort(column)"
                  >
                    {{ column.name }}
                    <span
                      v-if="column.sortable ?? true"
                      :class="[
                        'ml-2 flex-none rounded',
                        column.id === parsedSort.column
                          ? 'bg-gray-100 text-gray-900 group-hover:bg-gray-200'
                          : 'invisible text-gray-400 group-hover:visible group-focus:visible',
                      ]"
                    >
                      <chevron-down-icon
                        v-if="
                          column.id !== parsedSort.column ||
                          parsedSort.direction === 'asc'
                        "
                        class="h-5 w-5"
                      />
                      <chevron-up-icon v-else class="h-5 w-5" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-white [&>tr:first-child>td]:border-t-0 [&>tr:last-child>td]:border-b"
              :class="[
                !props.withPagination && !props.withFooter
                  ? '[&>tr:last-child>td:first-child]:rounded-bl-lg [&>tr:last-child>td:last-child]:rounded-br-lg border-gray-200'
                  : '',
              ]"
            >
              <template v-if="!props.data.length">
                <tr>
                  <td
                    :class="['text-gray-500', style.td]"
                    :colspan="props.columns.length"
                  >
                    {{ getString('message.empty') }}
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr v-for="item in props.data" :key="item.id">
                  <td
                    v-for="column in props.columns"
                    :key="column.id"
                    :class="[
                      style.td,
                      column.bold
                        ? 'font-medium text-gray-900'
                        : 'text-gray-500',
                    ]"
                  >
                    <slot :name="column.id" :item="item">
                      <component
                        v-if="column.render"
                        :is="column.render"
                        :item="item"
                      />
                      <p v-else>
                        {{
                          column.value
                            ? typeof column.value === 'function'
                              ? column.value(item)
                              : column.value
                            : item[column.id]
                        }}
                      </p>
                    </slot>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot v-if="props.withFooter">
              <slot name="footer" :classes="style" />
            </tfoot>
          </table>
          <div
            v-if="props.withPagination"
            class="border border-t-0 rounded-b-lg border-gray-200 bg-white px-4 py-3 sm:px-6"
          >
            <base-pagination
              :meta="props.meta"
              v-model="currentPage"
              v-on:change="handleChangePage"
            />
          </div>
        </with-loader>
      </div>
    </div>
  </div>
</template>
