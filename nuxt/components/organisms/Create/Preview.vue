<template>
  <div class="header">
    <h1>Flix bouwer</h1>
    <div class="actions">
      <button
        @click="flixBuilderStore.back"
        class="btn secondary">
        Aanpassingen
      </button>
      <button
        @click="flixBuilderStore.next"
        class="btn primary">
        Delen
      </button>
    </div>
  </div>
  <div
    id="preview"
    class="preview">
    <OrganismsFlix v-if="ready" />
    <AtomsLoader v-else />
  </div>
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const flixBuilderStore = useFlixBuilderStore();

const ready = ref(false);

onBeforeMount(async () => {
  await flixBuilderStore.saveDraftFlix();
  await flixStore.setupFlix('test', true); // TODO: make dynamic
  ready.value = true;
});

onUnmounted(() => {
  flixStore.resetData();
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.preview {
  margin-top: 2rem;
}
</style>
