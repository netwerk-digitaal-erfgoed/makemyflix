<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="page">
    <template v-if="!showPreview">
      <span class="title">Genereer jouw eigen Flix in slechts {{ stepComponents.length }} stappen</span>
      <component :is="stepComponents[stepComponentIndex]" />
      <pre>{{ devData }}</pre>
      <div class="actions">
        <button
          v-if="showBack"
          @click="flixBuilderStore.back"
          class="btn secondary">
          Vorige
        </button>
        <button
          v-if="showNext"
          @click="flixBuilderStore.next"
          class="btn primary">
          Volgende
        </button>
      </div>
    </template>
    <template v-else>
      <component :is="stepComponents[stepComponentIndex]" />
    </template>
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap`,
    },
  ],
});

/**
 * Deps
 */
const flixBuilderStore = useFlixBuilderStore();

/**
 * State
 */
const stepComponents = flixBuilderStore.stepComponents;
const { step, newFlix } = storeToRefs(flixBuilderStore);

/**
 * Computed Properties
 */
const devData = computed(() => {
  return Object.fromEntries(
    Object.entries(newFlix.value).map(([k, v]) => {
      if (v instanceof File) {
        return [k, v.name];
      }

      return [k, v];
    }),
  );
});

const stepComponentIndex = computed(() => {
  if (step.value >= 1 && step.value <= stepComponents.length) {
    return step.value - 1;
  }

  return 0;
});

const showBack = computed(() => step.value > 1);

const showNext = computed(() => step.value < stepComponents.length);

const showPreview = computed(() => step.value === 4);
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
    user-select: none;

    &:hover {
      color: var(--blues-blue);
      background-color: var(--background-color);
      border: var(--space-0) solid var(--blues-blue);
    }

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

      &:hover {
        background-color: var(--blues-blue);
        color: var(--background-color);
        border: none;
      }
    }
  }
}
</style>
