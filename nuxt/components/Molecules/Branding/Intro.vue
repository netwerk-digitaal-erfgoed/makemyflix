<template>
  <div v-if="branding?.intro" :class="introClass" :style="introStyle">
    <div class="grid grid-cols-12 gap-x-6 gap-y-6 justify-items-center items-center py-20 glass-noblur">
      <span v-if="branding?.intro.title" class="text-3xl font-semibold uppercase row-start-1 col-span-8 col-start-3 overflow-hidden whitespace-nowrap max-w-full">
        {{ branding?.intro.title }}
      </span>
      <span v-if="branding?.intro.description" class="text-lg uppercase row-start-2 col-span-8 col-start-3">
        {{ description }}
      </span>
      <span v-if="branding?.intro.footer" class="text-base uppercase row-start-3 col-span-8 col-start-3">
        {{ branding?.intro.footer }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { branding } = storeToRefs(useFlixStore());
const description = computed(() => branding.value?.intro.description?.substring(0, 300));
const introStyle = computed(() => {
  return {
    '--url': `url(${branding.value?.banner})`
  }
});
const introClass = computed(() => {
  return {
    'intro': true,
    'bg-black': true,
    'text-white': true,
    'intro-bg': !!branding.value?.banner
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
