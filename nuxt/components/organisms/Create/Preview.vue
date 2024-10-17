<template>
  <div
    id="preview"
    :class="[previewMediaQueryClassName, { published }]">
    <!-- <template>
      <AtomsCellphone v-if="previewView === 'cellphone'">
        <OrganismsFlix preview />
      </AtomsCellphone>
      <AtomsTablet v-else-if="previewView === 'tablet'">
        <OrganismsFlix preview />
      </AtomsTablet> -->
    <OrganismsFlix preview />
    <!-- v-else -->
    <!-- </template> -->
  </div>
  <OrganismsCreateShare
    v-if="published"
    @close="onCloseModal" />
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const { previewView, previewMediaQueryClassName } = storeToRefs(flixStore);

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
  width: 100%;
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
