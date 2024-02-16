<template>
  <div class="py-5 bg-gray-100 min-h-dvh px-5 lg:px-[20%] w-full">
    <h1 class="font-semibold text-2xl mb-5">Products</h1>
    <!-- Card holding products -->
    <div class="rounded-xl bg-white ring-1 ring-gray-200 shadow-sm p-4">
      <!-- Search form -->
      <form @submit.prevent="" class="flex items-center gap-3">
        <div class="grow">
          <Input v-model="search" placeholder="Find a product" />
        </div>
        <Btn color="blue" text="Search" class="shrink-0" />
      </form>
      <!-- Add product form -->
      <form @submit.prevent="addProduct" class="flex items-center gap-3 mt-5">
        <div class="grow">
          <Input placeholder="Product name" v-model="productName" />
        </div>
        <Btn type="submit" text="Add product" class="shrink-0" />
      </form>

      <!-- Products list -->
      <ul class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Product
          v-for="item in sortedProducts"
          :key="item.id"
          :name="item.name"
          :image="item.image"
          :status="item.status"
          :alt="item.name"
          :date="item.date"
        />
      </ul>
    </div>
    <!-- Pagination data -->
    <div class="flex items-center justify-between py-5 px-3 text-sm">
      <p>
        Page <b>{{ page }}</b> of <b>{{ maxPages }}</b>
      </p>
      <div class="flex items-center gap-3">
        <Label for="sortBy">Sort by</Label>
        <select v-model="sortBy" class="bg-transparent" name="sortBy" id="sortBy">
          <option value="" disabled selected><b>Sort order</b></option>
          <option v-for="(item, k) in sortOptions" :key="k" :value="item.value">
            {{ item.text }}
          </option>
        </select>
      </div>

      <div>
        <select
          v-model.number="rowsPerPage"
          name="rowsPerPage"
          id="rowsPerPage"
          class="bg-transparent"
        >
          <option v-for="(item, i) in pageItems" :key="i" :value="item">{{ item }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import Input from "@/components/Input.vue";
  import Btn from "@/components/Btn.vue";
  import { mockData } from "@/assets/mockData";
  import Label from "@/components/Label.vue";
  import Product from "@/components/Product.vue";

  const data = ref([...mockData]);
  const search = ref("");

  const page = ref(1);
  const rowsPerPage = ref(10);
  const sortBy = ref("");
  const pageItems = [5, 10, 25, 50, 100];
  const sortOptions = [
    { value: "az", text: "A - Z" },
    { value: "modified", text: "Last modified" },
    { value: "created", text: "Created date" },
  ];
  const productName = ref("");

  // Allow the user to search for products
  const filteredProducts = computed(() => {
    // If no search term, return the data based on the current page and rows per page
    if (!search.value)
      return data.value.slice((page.value - 1) * rowsPerPage.value, page.value * rowsPerPage.value);
    // If there's a search term, filter the data based on the search term and then return the data based on the current page and rows per page
    return data.value
      .filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
      .slice((page.value - 1) * rowsPerPage.value, page.value * rowsPerPage.value);
  });

  // Sort the products based on the selected sort option
  const sortedProducts = computed(() => {
    if (sortBy.value === "az")
      return filteredProducts.value.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy.value === "modified") return filteredProducts.value.sort((a, b) => b.date - a.date);
    if (sortBy.value === "created") return filteredProducts.value.sort((a, b) => a.date - b.date);
    return filteredProducts.value;
  });

  // Calculate the maximum number of pages
  const maxPages = computed(() => Math.ceil(data.value.length / rowsPerPage.value));

  // / add product
  const addProduct = () => {
    if (!productName.value) return;
    data.value.unshift({
      id: data.value.length + 1,
      name: productName.value,
      image: "https://via.placeholder.com/150",
      status: "green",
      date: Date.now(),
    });
    alert("Product added successfully");
  };
</script>
