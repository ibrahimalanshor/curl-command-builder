<script setup>
import defaultAvatar from 'src/assets/avatar.png';

const props = defineProps({
  src: null,
});
</script>

<template>
  <img class="h-8 w-8 rounded-full" :src="src ?? defaultAvatar" />
</template>
