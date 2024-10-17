<template>
  <div :class="['preview', { published }]">
    <AtomsCellphone v-if="currentViewport === 'cellphone'">
      <OrganismsFlix />
    </AtomsCellphone>
    <AtomsTablet v-else-if="currentViewport === 'tablet'">
      <OrganismsFlix />
    </AtomsTablet>
    <OrganismsFlix v-else />
  </div>
  <OrganismsCreateShare
    v-if="published"
    @close="onCloseModal" />
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const { currentViewport } = storeToRefs(flixStore);

const published = ref(false);

/**
 * Methods
 */

const onCloseModal = () => {
  if (!flixStore.newFlixSlug) {
    console.warn('Flix slug not found.');
    return;
  }

  useNuxtApp().$navigate({
    name: 'flix',
    params: {
      flix: flixStore.newFlixSlug,
    },
  });
};
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
