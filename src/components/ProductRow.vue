<script setup>
import { computed } from "vue";

const props = defineProps({
  product: { type: Object, required: true },
  rank: { type: Number, default: 1 },
  associateTag: { type: String, required: true },
  amazonDomain: { type: String, required: true },
});

const url = computed(
  () =>
    `https://${props.amazonDomain}/dp/${encodeURIComponent(
      props.product.asin
    )}/?tag=${encodeURIComponent(props.associateTag)}`
);
const meta = computed(() =>
  props.product.pick
    ? `Editor's pick · ${props.product.category}`
    : props.product.category
);
</script>

<template>
  <li class="product" :class="{ 'is-pick': product.pick }">
    <span class="rank" aria-label="Rank">#{{ rank }}</span>

    <div class="thumb">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        loading="lazy"
      />
      <span v-else aria-hidden="true">{{ product.name.charAt(0) }}</span>
    </div>

    <div class="body">
      <p class="meta">{{ meta }}</p>
      <h3 class="name">{{ product.name }}</h3>
      <p class="blurb">{{ product.blurb }}</p>
      <ul v-if="product.pros?.length" class="pros">
        <li v-for="pro in product.pros" :key="pro">{{ pro }}</li>
      </ul>
    </div>

    <!-- "sponsored" tells search engines this is an affiliate link -->
    <div class="buy-box">
      <p class="prime-note">Ships with free returns on eligible orders</p>
      <a
        class="buy"
        :href="url"
        target="_blank"
        rel="sponsored nofollow noopener"
        :aria-label="`Check price for ${product.name} on Amazon (affiliate link, opens in a new tab)`"
      >
        Check price on Amazon
      </a>
    </div>
  </li>
</template>

