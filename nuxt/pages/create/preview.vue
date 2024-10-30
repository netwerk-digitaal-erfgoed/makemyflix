<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="page">
    <OrganismsCreatePreviewSidebar />
    <OrganismsCreatePreview />
  </div>
</template>

<script setup lang="ts">
const flixStore = useFlixStore();
const { query } = useRoute();
await flixStore.createDraft(query.token);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin: 0 var(--space-20);

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
}

.page {
  display: flex;
  overflow-x: scroll;
  min-height: calc(100vh - var(--space-24)); // full height minus banner
  &-laptop {
    max-height: 1080px;
    overflow-y: scroll;
  }
}
</style>
