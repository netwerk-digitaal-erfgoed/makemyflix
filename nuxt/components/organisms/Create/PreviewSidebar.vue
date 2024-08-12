<template>
  <fieldset
    class="sidebar"
    :disabled="!ready">
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
              v-model="newFlix.primaryColor"
              type="color"
              inline
              label="Primaire kleur" />
            <MoleculesFormInput
              v-model="newFlix.secondaryColor"
              type="color"
              inline
              label="Secundaire kleur" />
            <MoleculesFormInput
              v-model="newFlix.tertiaryColor"
              type="color"
              inline
              label="Tertiaire kleur" />
            <!-- <MoleculesFormInput
              type="color"
              inline
              label="Accenten" /> -->
          </template>
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon>
          <template #header>
            <div class="block-header">Typografie</div>
          </template>
          <template #default>
            <MoleculesFormInput
              v-model="newFlix.fontFamily"
              type="select"
              :options="typographyOptions" />
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
          <MoleculesFormInput v-model="newFlix.title" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix omschrijving">
          <MoleculesFormInput v-model="newFlix.description" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix logo (optioneel)">
          <MoleculesFormUpload
            id="input-logo"
            v-model="newFlix.logo"
            prompt="Selecteer vanuit je browser of sleep in dit vlak om te uploaden" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix banner (optioneel)">
          <MoleculesFormUpload
            id="input-banner"
            v-model="newFlix.banner"
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
            v-for="device in devices"
            :key="device"
            type="button"
            class="responsive-view-button"
            :class="{ active: previewView === device }"
            @click="previewView = device">
            <Icon
              :icon="`mdi:${device}`"
              :width="responsiveButtonIconSize"
              :height="responsiveButtonIconSize" />
          </button>
        </div>
      </template>
    </AtomsAccordeon>
    <div
      class="publish"
      v-if="ready">
      <AtomsButton
        :disabled="!publishable"
        @click="emit('publish')"
        >PUBLICEER JOUW FLIX SITE</AtomsButton
      >
    </div>
  </fieldset>
</template>

<script setup lang="ts">
/**
 * Constants
 */
const responsiveButtonIconSize = '1.8em';
const typographyOptions = ['Poppins', 'Times New Roman'];
const devices: PreviewMediaQuery[] = ['laptop', 'tablet', 'cellphone'];

/**
 * Deps
 */
const flixStore = useFlixStore();
const flixBuilderStore = useFlixBuilderStore();
const themeStore = useThemeStore();

/**
 * State
 */
const props = defineProps<{
  ready?: boolean;
}>();
const emit = defineEmits(['publish']);
const { newFlix, previewView } = storeToRefs(flixBuilderStore);
const { currentFlix } = storeToRefs(flixStore);

/**
 * Computed properties
 */
const publishable = computed(() => {
  return props.ready && flixBuilderStore.newFlixSlug !== 'nieuwe-flix';
});

/**
 * Methods
 */
const objectUrls: Record<string, string> = {};
const syncUploadedImage = (type: 'logo' | 'banner', image: UploadedImage | File | null | undefined) => {
  if (image instanceof File) {
    if (objectUrls[type]) {
      URL.revokeObjectURL(objectUrls[type]);
    }

    if (!currentFlix.value!.branding) {
      currentFlix.value!.branding = {} as any;
    }

    if (!currentFlix.value!.branding?.[type]) {
      currentFlix.value!.branding![type] = {} as any;
    }

    const url = URL.createObjectURL(image);
    objectUrls[type] = url;
    currentFlix.value!.branding![type].url = url;
  } else if (image == null) {
    const url = objectUrls[type];

    if (url) {
      URL.revokeObjectURL(url);
      delete objectUrls[type];
    }

    if (currentFlix.value?.branding?.[type]) {
      delete currentFlix.value!.branding![type];
    }
  }
};

const update = useDebounce(flixBuilderStore.saveDraftFlix, 1000);

/**
 * Watchers
 */

// debounced update upon input change
watch(
  newFlix,
  () => {
    if (props.ready) {
      update();
    }
  },
  { deep: true },
);

// syncs theme input changes so that colors and fonts are immediately reflected in the preview
watch(
  () => flixBuilderStore.newFlixTheme,
  () => {
    themeStore.resetData();
    themeStore.setThemeStyling(true);
  },
);

// syncs intro input changes so that they are immediately reflected in the preview
watch(
  () => [newFlix.value.title, newFlix.value.description],
  ([t, d]) => {
    if (!currentFlix.value) {
      return;
    }

    if (!currentFlix.value.branding) {
      currentFlix.value.branding = {} as any;
    }

    currentFlix.value.branding!.name = t ?? '';

    if (!currentFlix.value.branding!.intro) {
      currentFlix.value.branding!.intro = {} as any;
    }

    currentFlix.value.branding!.intro!.title = t ?? '';
    currentFlix.value.branding!.intro!.description = d ?? '';

    if (flixBuilderStore.newFlixSlug) {
      currentFlix.value.id = flixBuilderStore.newFlixSlug;
    }
  },
);

// syncs images so that image uploads are immediately reflected in the preview
watch(
  () => [newFlix.value.logo, newFlix.value.banner],
  ([logo, banner]) => {
    syncUploadedImage('logo', logo);
    syncUploadedImage('banner', banner);
  },
);

/**
 * Lifecycle hooks
 */
onUnmounted(() => {
  for (const key in objectUrls) {
    URL.revokeObjectURL(objectUrls[key]);
  }
});
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
    height: 1px;
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
  width: 88px;
  height: 65px;
  border: 2px solid gray;
  transition: all 0.2s ease;

  svg {
    transition: color 0.2s ease;
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
