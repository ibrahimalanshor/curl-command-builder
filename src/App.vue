<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useTitle } from 'src/composes/title.compose';

const route = useRoute();
const router = useRouter();
const { setTitleFromResource } = useTitle();

router.afterEach(() => {
  setTitleFromResource();
});
</script>

<template>
  <component :is="route.meta.layout">
    <app-progress-bar />
    <app-toast />
    <router-view :key="route.path" />
  </component>
</template>
