<template>
  <div class="preview">
    <OrganismsCreatePreviewSidebar
      :ready="ready"
      @publish="publish" />
    <div
      id="preview"
      :class="[previewMediaQueryClassName, { published }]">
      <template v-if="ready">
        <AtomsCellphone v-if="previewView === 'cellphone'">
          <OrganismsFlix preview />
        </AtomsCellphone>
        <AtomsTablet v-else-if="previewView === 'tablet'">
          <OrganismsFlix preview />
        </AtomsTablet>
        <OrganismsFlix
          v-else
          :class="[previewMediaQueryClassName]"
          preview />
      </template>
      <AtomsLoader v-else />
    </div>
  </div>
  <OrganismsCreateShare
    v-if="published"
    @close="onCloseModal" />
</template>

<script setup lang="ts">
/**
 * Deps
 */
const flixStore = useFlixStore();
const flixBuilderStore = useFlixBuilderStore();

/**
 * State
 */
const ready = ref(false);
const published = ref(false);
const { previewView, previewMediaQueryClassName } = storeToRefs(flixBuilderStore);

/**
 * Methods
 */
const publish = async () => {
  await flixBuilderStore.publishFlix();
  published.value = true;
};

const onCloseModal = () => {
  if (!flixBuilderStore.newFlixSlug) {
    console.warn('Flix slug not found.');
    return;
  }

  useNuxtApp().$navigate({
    name: 'flix',
    params: {
      flix: flixBuilderStore.newFlixSlug,
    },
  });
};

/**
 * Lifecyle methods
 */
onBeforeMount(async () => {
  if (flixBuilderStore.newFlixSlug && flixBuilderStore.newFlixSlug !== 'nieuwe-flix') {
    const uri = `${window.location.origin}/${flixBuilderStore.newFlixSlug}`;
    const success = await flixBuilderStore.mergeExistingFlix(uri);

    if (!success) {
      await flixBuilderStore.saveDraftFlix();
    }
  } else {
    await flixBuilderStore.saveDraftFlix();
  }

  flixStore.resetData();

  if (flixBuilderStore.newFlixSlug) {
    await flixStore.setupFlix(flixBuilderStore.newFlixSlug, true);
    ready.value = true;
  } else {
    console.warn('Flix slug not found.');
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 var(--space-20);

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.preview {
  display: flex;
  overflow-x: scroll;
  min-height: calc(100vh - 96px); // full height minus banner

  &-laptop {
    max-height: 1080px;
    overflow-y: scroll;
  }
}

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
}

.header,
.preview {
  &.published {
    pointer-events: none;
  }
}
</style>
