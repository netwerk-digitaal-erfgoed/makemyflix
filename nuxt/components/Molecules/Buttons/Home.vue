<template>
  <AtomsNavigation
    class="navigation-button"
    :to="homePath">
    <AtomsIcon
      name="home"
      class="icon" />
    Home
  </AtomsNavigation>
</template>

<script setup lang="ts">
const homePath = { name: 'flix' } as To;
</script>

<style lang="scss" scoped>
.navigation-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  color: inherit;
  text-decoration: inherit;

  .icon {
    height: var(--space-5);
    width: var(--space-5);
    margin-right: var(--space-2);
  }
}
</style>
