<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="page">
    <template v-if="!showPreview">
      <span class="title">Genereer jouw eigen Flix in slechts {{ stepsCount }} stappen</span>
      <component :is="stepComponents[stepComponentIndex]" />
      <div class="actions">
        <AtomsButton
          v-if="showBack"
          @click="flixBuilderStore.back"
          class="back-btn"
          variant="secondary">
          Vorige
        </AtomsButton>
        <AtomsButton
          v-if="showNext"
          class="next-btn"
          @click="flixBuilderStore.next">
          Volgende
        </AtomsButton>
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
const { stepComponents, stepsCount } = flixBuilderStore;
const { step } = storeToRefs(flixBuilderStore);

/**
 * Computed Properties
 */
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

  .next-btn {
    grid-area: right;
    justify-self: flex-end;
  }

  .back-btn {
    grid-area: left;
    justify-self: flex-start;
  }
}
</style>
