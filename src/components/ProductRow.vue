<script setup>
import { computed } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
  associateTag: { type: String, required: true },
  amazonDomain: { type: String, required: true },
});

const url = computed(
  () =>
    `https://${props.amazonDomain}/dp/${encodeURIComponent(props.product.asin)}/?tag=${encodeURIComponent(props.associateTag)}`
);
const meta = computed(() =>
  props.product.pick ? `Top pick · ${props.product.category}` : props.product.category
);
</script>

<template>
  <li class="product" :class="{ 'is-pick': product.pick }">
    <div class="thumb">
      <img v-if="product.image" :src="product.image" :alt="product.name" loading="lazy" />
      <span v-else aria-hidden="true">{{ product.name.charAt(0) }}</span>
    </div>

    <div class="body">
      <p class="meta">{{ meta }}</p>
      <h2 class="name">{{ product.name }}</h2>
      <p class="blurb">{{ product.blurb }}</p>
      <ul v-if="product.pros?.length" class="pros">
        <li v-for="pro in product.pros" :key="pro">{{ pro }}</li>
      </ul>
    </div>

    <!-- "sponsored" tells search engines this is an affiliate link -->
    <a
      class="buy"
      :href="url"
      target="_blank"
      rel="sponsored nofollow noopener"
      :aria-label="`View ${product.name} on Amazon (affiliate link, opens in a new tab)`"
    >
      View on Amazon
    </a>
  </li>
</template>
