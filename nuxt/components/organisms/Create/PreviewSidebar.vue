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
              :modelValue="tempFlix.theme?.primary"
              @update:modelValue="onThemeChange('primary', $event)"
              type="color"
              inline
              label="Primaire kleur" />
            <MoleculesFormInput
              :modelValue="tempFlix.theme?.secondary"
              @update:modelValue="onThemeChange('secondary', $event)"
              type="color"
              inline
              label="Secundaire kleur" />
            <MoleculesFormInput
              :modelValue="tempFlix.theme?.tertiary"
              @update:modelValue="onThemeChange('tertiary', $event)"
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
              :modelValue="tempFlix.theme?.font"
              @update:modelValue="onThemeChange('font', $event)"
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
          <MoleculesFormInput
            :modelValue="tempFlix.branding?.intro.title"
            @update:modelValue="onBrandingChange('title', $event)" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix omschrijving">
          <MoleculesFormInput
            :modelValue="tempFlix.branding?.intro.description"
            @update:modelValue="onBrandingChange('description', $event)" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix logo (optioneel)">
          <MoleculesFormUpload
            id="input-logo"
            :modelValue="tempFlix.branding?.logo"
            @update:modelValue="onFileUpload('logo', $event)"
            prompt="Selecteer vanuit je browser of sleep in dit vlak om te uploaden" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix banner (optioneel)">
          <MoleculesFormUpload
            id="input-banner"
            :modelValue="tempFlix.branding?.banner"
            @update:modelValue="onFileUpload('banner', $event)"
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
 * Constants
 */
const DEFAULT: Flix = {
  publishedAt: null,
  branding: {
    name: '',
    intro: {
      title: '',
      description: '',
    },
    logo: null,
    banner: null,
  } as Branding,
  theme: {
    primary: '#ffffff',
    secondary: '#000000',
    tertiary: '#f2f5ff',
    font: 'Poppins',
  } as Theme,
  uri: '',
};

/**
 * State & props
 */
const flixStore = useFlixStore();
const { currentFlix, currentViewport, isPublishable } = storeToRefs(flixStore);
const tempFlix = ref<Flix>(currentFlix.value ?? DEFAULT);

useSetStyling(tempFlix.value.theme!);

/**
 * Computed properties
 */
const supportedViewports = computed<PreviewMediaQuery[]>(() => {
  return ['laptop', 'tablet', 'cellphone'];
});

const supportedFonts = computed<string[]>(() => {
  return ['Poppins', 'Times New Roman'];
});

const onBrandingChange = (prop: 'title' | 'description', value: string) => {
  const branding = tempFlix.value?.branding ?? ({} as Branding);
  branding.intro = branding.intro ?? ({} as Intro);
  branding.intro[prop] = value;

  // If the prop is title, we should also update the name and the uri
  if (prop === 'title') {
    branding.name = value;
    tempFlix.value.uri = `${window.location.origin}/${useSlugify(value)}`;
  }
  tempFlix.value.branding = branding;
};

const onFileUpload = async (prop: 'logo' | 'banner', file: File | null) => {
  const branding = tempFlix.value?.branding ?? ({} as Branding);
  branding[prop] = file === null ? null : (await useUploadImage(file)) ?? null;
  tempFlix.value.branding = branding;
};

const onThemeChange = (prop: 'primary' | 'secondary' | 'tertiary' | 'font', color: string) => {
  const theme = tempFlix.value?.theme ?? ({} as Theme);
  theme[prop] = color;
  tempFlix.value.theme = theme;
  useSetStyling(theme);
};

const updateStore = () => {
  // Update the currentFlix with the tempFlix
  currentFlix.value = tempFlix.value;
  flixStore.saveDraft();
};

const debouncedSave = useDebounce(updateStore, 500);

watch(
  tempFlix,
  async () => {
    debouncedSave();
  },
  { deep: true },
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
