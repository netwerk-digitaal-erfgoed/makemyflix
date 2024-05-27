<template>
  <div v-if="intro" :class="introClass" :style="introStyle">
    <div class="grid grid-cols-12 gap-x-6 gap-y-6 justify-items-center items-center py-20 glass-noblur">
      <span v-if="intro.title" class="text-3xl font-semibold uppercase row-start-1 col-span-8 col-start-3 overflow-hidden whitespace-nowrap max-w-full">
        {{ intro.title }}
      </span>
      <span v-if="intro.description" class="text-lg uppercase row-start-2 col-span-8 col-start-3">
        {{ description }}
      </span>
      <span v-if="intro.footer" class="text-base uppercase row-start-3 col-span-8 col-start-3">
        {{ intro.footer }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBrandingStore } from "@/stores/branding";
const { intro, banner } = useBrandingStore();
const description = computed(() => intro.description?.substring(0, 300));
const introStyle = computed(() => {
  return {
    '--url': `url(${banner})`
  }
});
const introClass = computed(() => {
  return {
    'intro': true,
    'bg-black': true,
    'text-white': true,
    'intro-bg': !!banner
  };
})
</script>

<style lang="scss" scoped>
.intro {
  position: relative;
  max-height: 32rem;
  overflow: hidden;
}

.intro-bg {
  background-image: var(--url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: grayscale(100%);
}
</style>
