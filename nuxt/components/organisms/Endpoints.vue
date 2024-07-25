<template>
  <div class="wrapper">
    <div class="intro">
      <h1>Selecteer je end-point</h1>
      <span>
        Om van je endpoint een Flix te maken moet deze voldoen aan volgende punten: Goed gestuctureerd in Schema.org,
        rijke content met basic fields, format leesbaarzijn in JSON via de endpoint.
      </span>
    </div>
    <MoleculesFormInput
      class="endpoint"
      label="Plaats hier je link van je endpoint"
      inline
      v-model="endpoint" />
    <MoleculesFormInput
      type="textarea"
      class="categories"
      label="Plaats hier je Category queries"
      v-model="categories" />
    <MoleculesFormInput
      type="textarea"
      class="items"
      label="Plaats hier je Item queries"
      v-model="items" />
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

const endpoint = ref();
const categories = ref();
const items = ref();
</script>

<style lang="scss" scoped>
.wrapper {
  font-family: 'Poppins';
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content auto auto;
  grid-template-areas:
    'intro intro'
    'endpoint endpoint'
    'categories items';
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

.endpoint {
  grid-area: endpoint;
}

.categories {
  grid-area: categories;
}

.items {
  grid-area: items;
}
</style>
