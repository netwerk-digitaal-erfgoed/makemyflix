<template>
  <div :class="['preview']">
    <AtomsCellphone v-if="currentViewport === 'cellphone'">
      <OrganismsFlix />
    </AtomsCellphone>
    <AtomsTablet v-else-if="currentViewport === 'tablet'">
      <OrganismsFlix />
    </AtomsTablet>
    <OrganismsFlix v-else />
  </div>
  <template v-if="!isPreview">
    <OrganismsCreateShare />
  </template>
</template>

<script setup lang="ts">
const { currentViewport, isPreview } = storeToRefs(useFlixStore());
</script>

<style lang="scss" scoped>
.preview {
  padding: var(--space-6);
  width: calc(100% - var(--preview-width));
  font-family: var(--font-family);
  display: flex;
  justify-content: center;

  .page {
    width: 100%;
  }
}
</style>
