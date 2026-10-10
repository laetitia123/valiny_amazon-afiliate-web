<script setup>
import { computed, ref } from "vue";
import site from "../content/site.json";
import CategoryFilter from "./components/CategoryFilter.vue";
import ProductRow from "./components/ProductRow.vue";

// Every file in /content/products is one product. The admin panel (Decap CMS)
// creates, edits and deletes these files, and the site rebuilds from them.
const files = import.meta.glob("../content/products/*.json", { eager: true, import: "default" });

const products = Object.values(files).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name)
);

const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];
const active = ref("All");

const visible = computed(() =>
  active.value === "All" ? products : products.filter((p) => p.category === active.value)
);

document.title = `${site.name}: ${site.tagline}`;
</script>

<template>
  <p class="disclosure-bar">As an Amazon Associate I earn from qualifying purchases.</p>

  <header class="wrap masthead">
    <h1>{{ site.name }}</h1>
    <p class="tagline">{{ site.tagline }}</p>
    <p class="intro">{{ site.intro }}</p>
  </header>

  <main class="wrap">
    <CategoryFilter v-if="categories.length > 2" v-model="active" :categories="categories" />
    <ul class="products">
      <ProductRow
        v-for="p in visible"
        :key="p.asin"
        :product="p"
        :associate-tag="site.associateTag"
        :amazon-domain="site.amazonDomain"
      />
    </ul>
    <p v-if="!products.length" class="intro">No products yet.</p>
  </main>

  <footer class="wrap footer">
    <p>
      <strong>Disclosure.</strong> As an Amazon Associate I earn from qualifying purchases.
      If you buy through a link on this site, I may earn a commission at no extra cost to you.
    </p>
    <p>Prices and availability change, so check the Amazon page for current details.</p>
    <p v-if="site.contactEmail">
      Questions? <a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
    </p>
  </footer>
</template>
