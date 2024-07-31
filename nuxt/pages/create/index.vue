<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="page">
    <span class="title">Genereer jouw eigen Flix in slechts 4 stappen</span>
    <component :is="currentStepComponent" />
    <pre>{{ devData }}</pre>
    <div class="actions">
      <template v-if="showBack">
        <button
          @click="back"
          class="btn secondary">
          Vorige
        </button>
      </template>
      <template v-if="showNext">
        <button
          @click="next"
          class="btn primary">
          Volgende
        </button>
      </template>
    </div>
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
const flixStore = useFlixStore();

/**
 * State
 */
const step = ref<number>(2);
const { newFlix } = storeToRefs(flixStore);

/**
 * Computed Properties
 */
const currentStepComponent = computed(() => {
  switch (step.value) {
    case 1:
      return resolveComponent('OrganismsCreateEndpoints');
    case 2:
      return resolveComponent('OrganismsCreateIdentity');
    case 3:
      return resolveComponent('OrganismsCreateStyling');
    case 4:
      return resolveComponent('OrganismsCreatePreview');
    default:
      return resolveComponent('OrganismsCreateEndpoints');
  }
});

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

const showBack = computed(() => step.value > 1);

const showNext = computed(() => step.value < 4);

// const showPreview = computed(() => step.value === 4);

/**
 * Methods
 */
const next = () => {
  if (step.value < 4) {
    step.value++;
  }
  if (step.value === 4) {
    flixStore.saveFlix();
    navigateTo('/create/preview');
  }
};

const back = () => {
  if (step.value > 1) {
    step.value--;
  }
};
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
