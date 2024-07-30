<template>
  <div class="header">
    <h1>Flix bouwer</h1>
    <div class="actions">
      <!-- Add buttons -->
    </div>
    <iframe
      :src="previewUrl"
      frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
const { newFlix } = storeToRefs(useFlixStore());

const previewUrl = computed(() => {
  const name = newFlix.value.name;
  console.warn(name);
  return window.location;
});
</script>

<style lang="scss" scoped>
.wrapper {
  font-family: 'Poppins';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas:
    'intro intro'
    'colors fonts';
  gap: var(--space-20);
  margin-inline: var(--space-15);
  margin-block: var(--space-10);
}

.intro {
  grid-area: intro;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: var(--space-4);

  span {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
    color: var(--black-40);
  }
}

.colors {
  grid-area: colors;
}

.fonts {
  grid-area: fonts;
}
</style>
