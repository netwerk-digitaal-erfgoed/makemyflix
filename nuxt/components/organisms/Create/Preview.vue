<template>
  <div
    id="preview"
    :class="[previewMediaQueryClassName, { published }]">
    <AtomsCellphone v-if="currentViewport === 'cellphone'">
      <OrganismsFlix preview />
    </AtomsCellphone>
    <AtomsTablet v-else-if="currentViewport === 'tablet'">
      <OrganismsFlix preview />
    </AtomsTablet>
    <OrganismsFlix
      v-else
      preview />
  </div>
  <OrganismsCreateShare
    v-if="published"
    @close="onCloseModal" />
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const { previewMediaQueryClassName, currentViewport } = storeToRefs(flixStore);

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
#preview {
  padding: var(--space-6);
  width: calc(100% - 380px); // TODO: 380px should be a variable
  font-family: var(--font-family);
  display: flex;
  justify-content: center;

  &.preview-tablet,
  &.preview-cellphone {
    padding-top: var(--space-20);
  }

  .page {
    width: 100%;
  }
}
</style>
