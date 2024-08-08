<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div
    v-if="step === 1"
    class="page">
      <span class="title">Genereer jouw eigen Flix in slechts een paar stappen</span>
      <OrganismsCreateEndpoints />
      <div class="actions">
        <AtomsButton
          class="next-btn"
          @click="step++">
          Volgende
        </AtomsButton>
      </div>
  </div>
  <OrganismsCreateEditor v-else-if="step === 2" />
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
 * State
 */
const { step } = storeToRefs(useFlixBuilderStore());
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  margin: var(--space-20) 0;
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
