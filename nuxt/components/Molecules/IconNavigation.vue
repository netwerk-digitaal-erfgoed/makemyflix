<template>
  <AtomsNavigation
    :to="to"
    :direction="direction">
    <AtomsIcon
      :name="name"
      class="navigation-icon" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    direction?: string;
    to: To;
  }>(),
  {
    direction: '',
  },
);
</script>

<style lang="scss" scoped>
.navigation-icon {
  height: var(--space-11);
  width: var(--space-11);
  background-color: var(--blue);
  color: var(--black);
  border-radius: var(--space-11);
}
</style>
