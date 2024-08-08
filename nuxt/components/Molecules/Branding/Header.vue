<template>
  <div class="header">
    <img
      v-if="logoUrl"
      :src="logoUrl"
      class="header-image" />
    <h1
      v-else-if="branding?.name"
      class="header-name">
      {{ branding.name }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const { branding } = storeToRefs(useFlixStore());

const logoUrl = computed(() => {
  const logo = branding.value?.logo;
  if (typeof logo === 'string') {
    return logo;
  }

  return logo?.url;
});
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--inverse-background-color);
  color: var(--inverse-text-color);
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
  text-transform: uppercase;
}
</style>
