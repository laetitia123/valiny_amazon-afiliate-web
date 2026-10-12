<script setup>
import { computed, ref } from "vue";
import site from "../content/site.json";
import CategoryFilter from "./components/CategoryFilter.vue";
import ProductRow from "./components/ProductRow.vue";

// Every file in /content/products is one product. The admin panel (Decap CMS)
// creates, edits and deletes these files, and the site rebuilds from them.
const files = import.meta.glob("../content/products/*.json", {
  eager: true,
  import: "default",
});

const products = Object.values(files).sort(
  (a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name)
);

const categories = [
  "All",
  ...new Set(products.map((p) => p.category).filter(Boolean)),
];
const active = ref("All");
const query = ref("");

function goToResults() {
  document.getElementById("best")?.scrollIntoView({ behavior: "smooth" });
}

const visible = computed(() => {
  const q = query.value.trim().toLowerCase();
  return products.filter((p) => {
    if (active.value !== "All" && p.category !== active.value) return false;
    if (!q) return true;
    const haystack = [p.name, p.category, p.blurb, ...(p.pros ?? [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
});

document.title = `${site.name}: ${site.tagline}`;
</script>

<template>
  <p class="disclosure-bar">
    As an Amazon Associate, shop valinystyles earns from qualifying purchases.
  </p>

  <nav class="topbar">
    <div class="topbar-inner">
      <a class="logo" href="/">
        <span class="logo-name">{{ site.name }}</span>
        <span class="logo-shop">Shop</span>
      </a>
      <div class="search" role="search">
        <input
          v-model="query"
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          @keydown.enter.prevent="goToResults"
        />
        <button type="button" aria-label="Search" @click="goToResults">
          Search
        </button>
      </div>
      <a class="nav-link" href="#best">Best sellers</a>
      <a class="nav-link" href="#guide">Buying guide</a>
    </div>
  </nav>

  <section class="hero">
    <div class="wrap hero-inner">
      <p class="eyebrow">Deals &amp; expert picks</p>
      <h1>{{ site.tagline }}</h1>
      <p class="intro">{{ site.intro }}</p>
      <a class="cta" href="#best">Shop best sellers</a>
    </div>
  </section>

  <section class="perks wrap" aria-label="Why shop with us">
    <div class="perk">
      <strong>Researched picks</strong
      ><span>Every product is compared on value and everyday use.</span>
    </div>
    <div class="perk">
      <strong>Honest pricing</strong
      ><span>We link straight to Amazon for current prices.</span>
    </div>
    <div class="perk">
      <strong>Clear recommendations</strong
      ><span>Pros, trade-offs and who each product is for.</span>
    </div>
  </section>

  <main class="wrap" id="best">
    <div class="section-head">
      <h2>Best sellers</h2>
      <CategoryFilter
        v-if="categories.length > 2"
        v-model="active"
        :categories="categories"
      />
    </div>
    <ul class="products">
      <ProductRow
        v-for="(p, i) in visible"
        :key="p.asin"
        :rank="i + 1"
        :product="p"
        :associate-tag="site.associateTag"
        :amazon-domain="site.amazonDomain"
      />
    </ul>
    <p v-if="!products.length" class="intro">
      No products yet. Check back soon.
    </p>
    <p v-else-if="!visible.length" class="intro">
      No products match "{{ query }}". Try a different word.
    </p>
  </main>

  <section class="wrap guide" id="guide">
    <h2>Buying guide: how to choose well</h2>
    <div class="guide-grid">
      <div>
        <h3>Compare the specs</h3>
        <p>
          Check the features that matter for how you will actually use the
          product, not just the headline numbers.
        </p>
      </div>
      <div>
        <h3>Read the trade-offs</h3>
        <p>
          Every pick lists its pros and who it is best for, so you can match it
          to your budget and needs.
        </p>
      </div>
      <div>
        <h3>Check the price</h3>
        <p>
          Prices change often. Open the Amazon link for the current price,
          availability and shipping options.
        </p>
      </div>
    </div>
  </section>

  <footer class="footer-wrap">
    <div class="wrap footer">
      <p>
        <strong>Disclosure.</strong> As an Amazon Associate, shop valinystyles
        earns from qualifying purchases. If you buy through a link on this site,
        we may earn a commission at no extra cost to you.
      </p>
      <p>
        Prices and availability change often, so check the Amazon page for
        current details.
      </p>
      <p v-if="site.contactEmail">
        Questions?
        <a :href="`mailto:${site.contactEmail}`">{{ site.contactEmail }}</a>
      </p>
      <p class="copy">
        © {{ new Date().getFullYear() }} {{ site.name }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>
