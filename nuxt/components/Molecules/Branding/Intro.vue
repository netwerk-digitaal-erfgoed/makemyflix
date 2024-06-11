<template>
  <div
    v-if="branding?.intro"
    :class="introClass"
    :style="introStyle">
    <div class="wrapper glass-noblur">
      <span
        v-if="branding?.intro.title"
        class="title">
        {{ branding?.intro.title }}
      </span>
      <span
        v-if="branding?.intro.description"
        class="description">
        {{ description }}
      </span>
      <span
        v-if="branding?.intro.footer"
        class="footer">
        {{ branding?.intro.footer }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { branding } = storeToRefs(useFlixStore());
const description = computed(() => branding.value?.intro.description?.substring(0, 300));
const introStyle = computed(() => {
  const styles = {} as Record<string, string>;
  if (branding.value?.banner) {
    styles['--url'] = `url(${branding.value?.banner})`;
  }
  return styles;
});
const introClass = computed(() => {
  return {
    intro: true,
    'intro-bg': !!branding.value?.banner,
  };
});
</script>

<style lang="scss" scoped>
.intro {
  position: relative;
  max-height: 32rem;
  overflow: hidden;
  background-color: var(--black);
  color: var(--white);

  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: var(--space-6);
    row-gap: var(--space-6);
    justify-items: center;
    align-items: center;
    padding-block: var(--space-20);

    .title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
      grid-row-start: 1;
      grid-column: span 8 / span 8;
      grid-column-start: 3;
      overflow: hidden;
      white-space: nowrap;
      max-width: 100%;
    }

    .description {
      font-size: var(--font-size-base);
      text-transform: uppercase;
      grid-row-start: 2;
      grid-column: span 8 / span 8;
      grid-column-start: 3;
    }

    .footer {
      font-size: var(--font-size-sm);
      text-transform: uppercase;
      grid-row-start: 3;
      grid-column: span 8 / span 8;
      grid-column-start: 3;
    }
  }
}

.intro-bg {
  background-image: var(--url);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: grayscale(100%);
}
</style>
