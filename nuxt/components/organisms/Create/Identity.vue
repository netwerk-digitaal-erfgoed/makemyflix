<template>
  <div class="wrapper">
    <div class="intro">
      <h1>Flix identiteit</h1>
      <span>Wij proberen jouw Flix zoveel mogelijk te personaliseren</span>
    </div>
    <MoleculesFormInput
      type="input"
      class="name"
      label="Naam"
      v-model="newFlix.title" />
    <MoleculesFormInput
      type="input"
      class="description"
      label="Flix omschrijving"
      v-model="newFlix.description" />
    <MoleculesFormUpload
      id="logo"
      label="Selecteer vanuit je browser of sleep in dit vlak om te uploaden"
      v-model="newFlix.logo" />
    <MoleculesFormUpload
      id="banner"
      label="Selecteer vanuit je browser of sleep in dit vlak om te uploaden"
      v-model="newFlix.banner" />
  </div>
</template>

<script setup lang="ts">
const { newFlix } = storeToRefs(useFlixStore());
</script>

<style lang="scss" scoped>
.wrapper {
  font-family: 'Poppins';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas:
    'intro intro'
    'name description';
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

.name {
  grid-area: name;
}

.description {
  grid-area: description;
}
</style>
