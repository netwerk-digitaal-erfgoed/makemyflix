<template>
  <div :class="{ base: true, 'dark-mode': darkMode }">
    <MoleculesButtonsHome />
    <span
      v-if="title"
      class="title">
      {{ title }}
    </span>
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
  background-color: var(--white);
  color: var(--black);
  width: 100%;
  z-index: 10;

  &.dark-mode {
    background-color: var(--black);
    color: var(--white);
  }
}

.title {
  display: flex;
  justify-content: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  grid-column: span 10 / span 10;
  grid-column-start: 2;
}
</style>
