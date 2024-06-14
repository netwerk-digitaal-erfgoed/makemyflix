<template>
  <div :class="{ base: true, 'dark-mode': darkMode }">
    <MoleculesButtonsHome />
    <h3
      v-if="title"
      class="title">
      {{ title }}
    </h3>
    <MoleculesButtonsCategory v-if="showCategory" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    darkMode?: boolean;
    title?: string;
    showCategory?: boolean;
  }>(),
  {
    darkMode: false,
    title: '',
    showCategory: false,
  },
);
</script>

<style scoped lang="scss">
.base {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding-block: var(--space-7);
  align-items: center;
  background-color: var(--background-color);
  color: var(--text-color);
  width: 100%;
  z-index: 10;

  &.dark-mode {
    background-color: var(--inverse-background-color);
    color: var(--inverse-text-color);
  }
}

.title {
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  grid-column: span 10 / span 10;
  grid-column-start: 2;
}
</style>
