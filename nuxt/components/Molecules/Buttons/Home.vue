<template>
  <AtomsNavigation
    class="navigation-button"
    :to="homePath">
    <div class="icon">
      <svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="2.10526" height="23.1579" fill="currentcolor"/>
        <rect x="3.15796" width="4.21053" height="23.1579" fill="currentcolor"/>
        <rect x="8.42114" width="4.21053" height="23.1579" fill="currentcolor"/>
        <rect x="14" width="8" height="23" fill="currentcolor"/>
      </svg>
    </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--space-5);
    width: var(--space-5);
    margin-right: var(--space-2);
  }
}
</style>
