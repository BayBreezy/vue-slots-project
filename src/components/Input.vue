<template>
  <div>
    <slot name="label">
      <Label class="mb-1.5" :for="id" v-if="label">{{ label }}</Label>
    </slot>
    <slot name="input">
      <input
        v-model="model"
        :type="type || 'text'"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        class="h-10 px-3 py-2 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-100 transition border border-gray-400 w-full"
      />
    </slot>
    <slot name="hint">
      <p v-if="hint" class="text-sm text-gray-500">{{ hint }}</p>
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { defineModel } from "vue";
  import Label from "@/components/Label.vue";

  const props = defineProps<{
    id?: string;
    label?: string;
    type?: string;
    hint?: string;
    placeholder?: string;
    name?: string;
  }>();

  const model = defineModel();

  const createRandomId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const id = props.id || createRandomId();
</script>
