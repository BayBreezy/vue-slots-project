<template>
  <label :for="props.for" class="font-medium inline-block cursor-pointer">
    <slot></slot>
  </label>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    for?: string;
  }>();
</script>
