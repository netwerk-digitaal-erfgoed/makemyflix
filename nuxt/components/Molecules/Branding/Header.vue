<template>
  <div class="header">
    <img
      v-if="branding?.logo"
      :src="branding.logo"
      class="header-image" />
    <span
      v-else-if="branding?.name"
      class="header-name">
      {{ branding.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
const { branding } = storeToRefs(useFlixStore());
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--black);
  padding-block: var(--space-8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--header-height);
}
.header-image {
  display: flex;
  max-height: var(--space-15);
}

.header-name {
  font-size: var(--font-size-3xl);
  text-transform: uppercase;
  color: var(--white);
}
</style>
