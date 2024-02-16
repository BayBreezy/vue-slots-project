<template>
  <li class="border-b">
    <slot name="header">
      <div @click="open = !open" class="flex items-center w-full py-4 cursor-pointer">
        <slot name="image">
          <img
            v-if="localImage || image"
            :src="localImage ?? image"
            :alt="alt"
            class="object-cover size-6 rounded shrink-0"
          />
          <div v-else class="size-6 bg-gray-200 shrink-0 rounded"></div>
        </slot>
        <slot name="status" :changeStatus="changeStatus">
          <button @click.stop="changeStatus()" class="flex items-center justify-center mx-2">
            <span :style="{ backgroundColor: localStatus }" class="rounded-full size-2.5"></span>
          </button>
        </slot>
        <slot name="title">
          <p class="font-medium">{{ name }}</p>
        </slot>

        <!-- Date and dropdown -->

        <div class="flex items-center gap-3 ml-auto">
          <slot name="date" :formatDate="formatDate">
            <p v-if="date" class="text-gray-500 mr-2 text-sm">{{ formatDate(localDate) }}</p>
          </slot>
          <button>
            <slot name="trailingIcon">
              <ChevronDown class="size-4" />
            </slot>
          </button>
        </div>
      </div>
    </slot>
    <div v-if="open" class="py-5 px-2">
      <div class="flex items-center gap-5 justify-between">
        <img v-if="localImage" :src="localImage" :alt="alt" class="object-cover size-52 shrink-0" />
        <div
          @click="hiddenInput?.click()"
          v-else
          class="flex items-center border rounded-md hover:bg-gray-200 transition border-dashed hover:border-gray-400 justify-center size-52 shrink-0"
        >
          Upload a photo
        </div>
        <div class="flex flex-col gap-3">
          <slot name="replaceBtn">
            <Btn @click="hiddenInput?.click()" color="blue" text="Replace" />
            <input
              hidden
              ref="hiddenInput"
              type="file"
              @change="handleUpload"
              @click="$event.target.value = ''"
            />
          </slot>
          <slot name="clearBtn">
            <Btn color="white" text="Clear" @click="localImage = ''" />
          </slot>
        </div>
      </div>
      <slot name="form">
        <form class="mt-7">
          <fieldset class="grid gap-5">
            <Input placeholder="Image title" label="Image title" />
            <Input placeholder="Alt Text" label="Alt Text" />
            <Input placeholder="Link" label="Link" />
          </fieldset>
        </form>
      </slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
  import { ref, defineModel } from "vue";
  import ChevronDown from "@/components/icons/ChevronDown.vue";
  import Btn from "@/components/Btn.vue";
  import Input from "@/components/Input.vue";

  const open = defineModel({ default: false });
  const hiddenInput = ref<HTMLInputElement | null>(null);

  const props = defineProps<{
    image: string;
    alt?: string;
    status?: string;
    name: string;
    date?: string | number;
  }>();

  const localStatus = ref(props.status);
  const localImage = ref(props.image);
  const localDate = ref(props.date);

  const changeStatus = (val = null) => {
    // if a value is passed, set the status to that value
    if (val) {
      localStatus.value = val;
      return;
    }
    // if no value is passed, toggle the status
    switch (localStatus.value) {
      case "green":
        localStatus.value = "red";
        break;
      case "red":
        localStatus.value = "green";
        break;
      case "yellow":
        localStatus.value = "green";

      default:
        break;
    }
  };

  const handleUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    // if not image
    // @ts-expect-error
    if (!target.files[0].type.includes("image")) return alert("Please upload an image");
    const file = (target.files as FileList)[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      localImage.value = e.target?.result as string;
    };

    reader.readAsDataURL(file);
    localDate.value = new Date().getTime();
  };

  const formatDate = (date: string | number) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };
</script>
