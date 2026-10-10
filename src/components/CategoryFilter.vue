<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, required: true },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="filters" role="group" aria-label="Filter by category">
    <button
      v-for="cat in categories"
      :key="cat"
      type="button"
      class="chip"
      :aria-pressed="cat === modelValue"
      @click="$emit('update:modelValue', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>
