<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div
    v-if="showErrors"
    class="errors">
    {{ errorMessages }}
  </div>
  <div class="page">
    <span class="title">Genereer jouw eigen Flix in slechts een paar stappen</span>
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
        v-model="currentFlix.data.endpointUrl" />
      <MoleculesFormInput
        type="textarea"
        class="categories"
        label="Plaats hier je Category queries"
        v-model="currentFlix.data.categoryQuery" />
      <MoleculesFormInput
        type="textarea"
        class="items"
        label="Plaats hier je Item queries"
        v-model="currentFlix.data.itemsQuery" />
    </div>
    <div class="actions">
      <AtomsButton
        class="next-btn"
        @click="nextStep">
        Volgende
      </AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Setup the page by adding specific fonts
 */
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700&display=swap`,
    },
  ],
});

/**
 * State & Props
 */
const flixStore = useFlixStore();
const { query } = useRoute();
const { currentFlix } = storeToRefs(flixStore);
const showErrors = ref<boolean>(false);
const errorMessages = ref<string>('');

// Create a draft to work on
await flixStore.createDraft(query.token);

/**
 * Methods
 */
const nextStep = async () => {
  const { data } = unref(currentFlix);

  if (!data.endpointUrl || !data.categoryQuery || !data.itemsQuery) {
    showErrors.value = true;
    errorMessages.value = 'Gelieve alle velden in te vullen.';
    return;
  }
  // Save the current flix
  const response = await flixStore.saveFlix();

  // If there was an error, show a generic message.
  // Note: Don't show the actual error to the user, since it's most likely an issue for us, unlike validation errors
  if (response.error) {
    showErrors.value = true;
    errorMessages.value = 'Er is iets fout gegaan bij het opslaan, controlleer alle velden en probeer het opnieuw.';
  } else {
    // Goto the next step
    navigateTo({
      path: `/create/preview`,
      query: {
        token: response.attributes.hash,
      },
    });
  }
};
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

.errors {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: var(--space-8);
  background-color: var(--red-10);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-light);
  color: var(--black-40);
}

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
