<template>
  <!-- <div
    class="header"
    :class="{ published }">
    <h1>Flix bouwer</h1>
    <div class="actions">
      <AtomsButton
        @click="flixBuilderStore.back"
        variant="secondary">
        Aanpassingen
      </AtomsButton>
      <AtomsButton @click="publish"> Delen </AtomsButton>
    </div>
  </div> -->
  <div class="preview">
    <OrganismsCreatePreviewSidebar @publish="publish" />
    <div
      id="preview"
      :class="{ published }">
      <OrganismsFlix
        v-if="ready"
        preview />
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
  await flixBuilderStore.saveDraftFlix();
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
  display: grid;
  grid-template-columns: auto 1fr;
}

#preview {
  padding: var(--space-6);
}

.header,
.preview {
  &.published {
    pointer-events: none;
  }
}
</style>
