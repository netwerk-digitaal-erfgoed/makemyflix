<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="page">
    <span class="title">Genereer jouw eigen Flix in slechts 4 stappen</span>
    <OrganismsEndpoints />
    <div class="actions">
      <button
        v-if="showBack"
        @click="back"
        class="btn secondary">
        Vorige
      </button>
      <button
        v-if="showNext"
        @click="next"
        class="btn primary">
        Volgende
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const next = () => {
  console.log('Next');
};
const back = () => {
  console.log('Back');
};

const showBack = ref(false);
const showNext = ref(true);
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  margin: var(--space-20);
}

.title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-light);
  color: var(--blues-blue);
  text-align: center;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'left right';
  gap: var(--space-4);
  margin-inline: var(--space-15);

  .btn {
    padding: var(--space-4) var(--space-8);
    border: none;
    border-radius: var(--space-4);
    background-color: var(--blues-blue);
    color: var(--background-color);
    cursor: pointer;

    &.primary {
      grid-area: right;
      justify-self: flex-end;
    }

    &.secondary {
      grid-area: left;
      justify-self: flex-start;
      background-color: var(--background-color);
      color: var(--blues-blue);
      border: var(--space-0) solid var(--blues-blue);
    }
  }
}
</style>
