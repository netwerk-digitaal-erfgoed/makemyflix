<template>
  <fieldset class="sidebar">
    <div class="title">
      <h2>Flix bouwer</h2>
    </div>
    <AtomsAccordeon :initial="true">
      <template #header>
        <h4 class="section-header">Styling</h4>
      </template>
      <template #default>
        <div class="divider"></div>
        <AtomsAccordeon :initial="true">
          <template #header>
            <div class="block-header">Kleurgebruik</div>
          </template>
          <template #default>
            <MoleculesFormInput
              v-model="primaryColor"
              type="color"
              inline
              label="Primaire kleur" />
            <MoleculesFormInput
              v-model="secondaryColor"
              type="color"
              inline
              label="Secundaire kleur" />
            <MoleculesFormInput
              v-model="tertiaryColor"
              type="color"
              inline
              label="Tertiaire kleur" />
          </template>
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon>
          <template #header>
            <div class="block-header">Typografie</div>
          </template>
          <template #default>
            <MoleculesFormInput
              v-model="font"
              type="select"
              :options="supportedFonts" />
          </template>
        </AtomsAccordeon>
      </template>
    </AtomsAccordeon>
    <div class="divider"></div>
    <AtomsAccordeon
      :initial="true"
      class="offset">
      <template #header>
        <h4 class="section-header">Identiteit</h4>
      </template>
      <template #default>
        <div class="divider"></div>
        <AtomsAccordeon
          header="Naam"
          :initial="true">
          <MoleculesFormInput v-model="title" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix omschrijving">
          <MoleculesFormInput v-model="description" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix logo (optioneel)">
          <MoleculesFormUpload
            id="input-logo"
            v-model="logo"
            prompt="Selecteer vanuit je browser of sleep in dit vlak om te uploaden" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix banner (optioneel)">
          <MoleculesFormUpload
            id="input-banner"
            v-model="banner"
            prompt="Selecteer vanuit je browser of sleep in dit vlak om te uploaden" />
        </AtomsAccordeon>
      </template>
    </AtomsAccordeon>
    <div class="divider"></div>
    <AtomsAccordeon
      class="offset"
      :initial="true">
      <template #header>
        <h4 class="section-header">Responsive view</h4>
      </template>
      <template #default>
        <div class="responsive-view-buttons">
          <button
            v-for="viewport in supportedViewports"
            :key="viewport"
            type="button"
            class="responsive-view-button"
            :class="{ active: currentViewport === viewport }"
            @click="currentViewport = viewport">
            <Icon :icon="`mdi:${viewport}`" />
          </button>
        </div>
      </template>
    </AtomsAccordeon>
    <div class="publish">
      <AtomsButton
        :disabled="!isPublishable"
        @click="flixStore.publishDraft">
        PUBLICEER JOUW FLIX SITE
      </AtomsButton>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
/**
 * State & props
 */
const flixStore = useFlixStore();
const { currentFlix, currentViewport, supportedViewports, supportedFonts, isPublishable } = storeToRefs(flixStore);

// Local values
const title = ref<string>(currentFlix.value.branding?.name ?? '');
const description = ref<string>(currentFlix.value.branding?.intro?.description ?? '');
const logo = ref<UploadedImage>(currentFlix.value.branding?.logo ?? null);
const banner = ref<UploadedImage>(currentFlix.value.branding?.banner ?? null);
const primaryColor = ref<string>(currentFlix.value.theme?.primary ?? '#ffffff');
const secondaryColor = ref<string>(currentFlix.value.theme?.secondary ?? '#000000');
const tertiaryColor = ref<string>(currentFlix.value.theme?.tertiary ?? '#f2f5ff');
const font = ref<string>(currentFlix.value.theme?.font ?? 'Poppins');
const debouncedSave = useDebounce(flixStore.saveDraft, 500);

useSetStyling({
  primary: primaryColor.value,
  secondary: secondaryColor.value,
  tertiary: tertiaryColor.value,
  font: font.value,
});

/**
 * Computed properties
 */

/**
 * Sync the image to the server,
 */
const syncImage = async (file?: File, oldFile?: File) => {
  try {
    // If the new File is the same as the old File, just return the old one
    if (oldFile === file) {
      return oldFile;
    }

    // If the new file is empty, but the old file is not, remove the old file
    if (!file && oldFile) {
      await useDeleteImage(oldFile);
      return;
    }

    // If the new file is not empty and different from the old file, upload the new file
    if (file) {
      const { id, name, url } = await useUploadImage(file);
      return { id, name, url };
    }
  } catch (error) {
    // Something went wrong, log the error and return;
    console.error(error);
    return;
  }
};

/**
 * Watchers
 * TODO: Double check if it updates correctly in case the server alters a value
 */
watch(
  [title, description, logo, banner, primaryColor, secondaryColor, tertiaryColor, font],
  async ([t, d, l, b, p, s, ter, f], [, , ol, ob]) => {
    if (!currentFlix.value) {
      return;
    }

    // If currentFlix has a branding object, use it else create a new one
    const branding = currentFlix.value?.branding ?? ({} as Record<string, any>);

    // Update the values
    branding.name = t;
    branding.intro = branding.intro ?? ({} as Record<string, any>);
    branding.intro.title = t;
    branding.intro.description = d;

    // Update the logo / banner
    branding.logo = await syncImage(l, ol);
    branding.banner = await syncImage(b, ob);

    // if currentFlix has a theme object, use it else create a new one
    const theme = currentFlix.value?.theme ?? ({} as Record<string, any>);

    // update the values
    theme.primary = p;
    theme.secondary = s;
    theme.tertiary = ter;
    theme.font = f;

    // update the flix uri based on the title
    // TODO: Add validation to the uri, should be unique
    if (t) {
      currentFlix.value.uri = `${window.location.origin}/${useSlugify(t)}`;
    }

    // Update the currentFlix
    currentFlix.value.branding = branding;
    currentFlix.value.theme = theme;

    useSetStyling({
      primary: p,
      secondary: s,
      tertiary: ter,
      font: f,
    });

    // Update the flix
    debouncedSave();
  },
);
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #f5f5f5;
  min-width: 380px;
  width: 380px;
  padding: var(--space-6);
  border: none;

  .divider {
    background-color: #8c8c8c;
    height: var(--space-0);
    width: 100%;
    margin: var(--space-2) 0 var(--space-2);
  }

  .title {
    text-align: center;
    margin-bottom: var(--space-4);
  }

  .section-header {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  .block-header {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
  }

  .offset {
    margin-top: var(--space-8);
  }

  .publish {
    margin-top: var(--space-10);
  }
}

.responsive-view-buttons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-6);
  padding-top: var(--space-4);
}

.responsive-view-button {
  width: var(--space-22);
  height: var(--space-16);
  border: 2px solid gray;
  transition: var(--transition-state);

  svg {
    width: var(--space-10);
    height: var(--space-10);
    transition: var(--transition-state);
  }

  &:hover,
  &.active {
    background-color: var(--background-color);
    color: var(--text-color);
    border-color: var(--text-color);

    svg {
      color: var(--text-color);
    }
  }
}
</style>
