<template>
  <div class="wrapper">
    <div class="intro">
      <h1>Flix Styling</h1>
      <span>Personaliseer jouw Flix. Binnen de preview is dit nog aan te passen.</span>
    </div>
    <div class="colors">
      <span>Kleurgebruik</span>
      <MoleculesFormInput
        inline
        type="color"
        class="color"
        label="Primary"
        v-model="newFlix.primaryColor" />
      <MoleculesFormInput
        inline
        type="color"
        class="color"
        label="Secondary"
        v-model="newFlix.secondaryColor" />
      <MoleculesFormInput
        inline
        type="color"
        class="color"
        label="Tertiary"
        v-model="newFlix.tertiaryColor" />
    </div>
    <div class="fonts">
      <span>Typographie</span>
      <!-- Dropdown nodig -->
    </div>
  </div>
</template>

<script setup lang="ts">
const { newFlix } = storeToRefs(useFlixBuilderStore());
</script>

<style lang="scss" scoped>
.wrapper {
  font-family: 'Poppins';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas:
    'intro intro'
    'colors fonts';
  gap: var(--space-20);
  margin-inline: var(--space-15);
  margin-block: var(--space-10);
}

.intro {
  grid-area: intro;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: var(--space-4);

  span {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
    color: var(--black-40);
  }
}

.colors {
  grid-area: colors;
}

.fonts {
  grid-area: fonts;
}
</style>
