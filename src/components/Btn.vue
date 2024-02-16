<template>
  <button :class="button({ class: props.class, color })" :type="type || 'button'">
    <slot>{{ text }}</slot>
  </button>
</template>

<script lang="ts" setup>
  import { tv } from "tailwind-variants";
  const props = defineProps<{
    text?: string;
    color?: "green" | "blue" | "white";
    class?: any;
    type?: "submit" | "reset" | "button";
  }>();

  const button = tv({
    base: "inline-flex items-center font-medium justify-center gap-2 transition rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-100 h-10 px-4 py-2 text-sm hover:opacity-90",
    variants: {
      color: {
        green: "bg-appGreen text-white focus-visible:ring-green-100",
        blue: "bg-appBlue text-white focus-visible:ring-blue-100",
        white: "bg-white text-gray-900 hover:bg-gray-200",
      },
    },
    defaultVariants: {
      color: "green",
    },
  });
</script>
