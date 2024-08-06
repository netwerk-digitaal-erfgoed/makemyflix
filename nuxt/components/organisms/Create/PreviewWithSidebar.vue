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
        :class="[previewMediaQueryClassName]"
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
const { previewMediaQueryClassName } = storeToRefs(flixBuilderStore);

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
 * Watchers
 */
watch(() => flixBuilderStore.previewMediaQueryClassName, v => {
  const base = document.body.className.split(' ').filter(x => !!x && !x.startsWith('preview-'));
  base.push(v);
  document.body.className = base.join(' ');
}, { immediate: true });

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
  display: flex;
  overflow-x: scroll;

  &-tablet {
    max-width: 1180px;
    max-height: 820px;
    overflow-y: scroll;
  }

  &-cellphone {
    max-width: 390px;
    max-height: 844px;
    overflow-y: scroll;
  }
}

#preview {
  padding: var(--space-6);
  width: 100%;
  font-family: var(--font-family);
}

.header,
.preview {
  &.published {
    pointer-events: none;
  }
}
</style>
