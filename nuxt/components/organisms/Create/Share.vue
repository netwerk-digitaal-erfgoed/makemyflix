<template>
  <div
    class="backdrop"
    @click="emit('close')"></div>
  <div class="modal">
    <div class="header">
      <div></div>
      <h3>MakeMyFlix</h3>
      <button
        type="button"
        @click="onClose">
        <Icon
          icon="mdi:close"
          height="1.25em"
          width="1.25em" />
      </button>
    </div>
    <div class="info">
      <h2>{{ newFlix.title }} FLIX staat live!</h2>
      <div>Bekijk en deel de link</div>
    </div>
    <div class="copy">
      <div>Kopieer deze link</div>
      <div class="link">
        <div class="link-text">{{ flixUri }}</div>
        <AtomsButton @click="copyToPasteBoard(flixUri)">Kopieren</AtomsButton>
      </div>
    </div>
    <div class="visit">
      <div class="prompt">Bekijk je Flix op de website van MakeMyFlix</div>
      <AtomsButton @click="navigateToFlix">Naar MakeMyFlix</AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Deps
 */
const flixBuilderStore = useFlixBuilderStore();
const router = useRouter();

/**
 * State
 */
const emit = defineEmits(['close']);
const { newFlix } = storeToRefs(flixBuilderStore);

/**
 * Computed properties
 */
const flixUri = computed(() => window.location.origin + '/' + flixBuilderStore.newFlixSlug);

/**
 * Methods
 */
const copyToPasteBoard = (s: string) => {
  window.navigator.clipboard.writeText(s);
};

const onClose = () => {
  emit('close');
};

const navigateToFlix = () => {
  router.push({
    name: 'flix',
    params: {
      flix: flixBuilderStore.newFlixSlug,
    },
  });
};
</script>

<style lang="scss" scoped>
.backdrop {
  height: 100%;
  width: 100%;
  position: fixed;
  inset: 0;
  z-index: 20;
  background: black;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 50rem;
  width: 100%;

  background-color: var(--inverse-background-color);
  color: var(--inverse-text-color);
  z-index: 30;
  border-radius: var(--space-0);
  padding: var(--space-8);

  .header {
    display: grid;
    grid-template-columns: 2rem auto 2rem;
    align-items: center;
    text-align: center;

    button {
      color: inherit;
    }
  }

  .info {
    margin-top: 4rem;
    text-align: center;

    h2 {
      margin-bottom: 2rem;

      + div {
        font-size: 1.25em;
      }
    }
  }

  .copy {
    margin-top: 3rem;

    .link {
      display: grid;
      grid-template-columns: 1fr auto;
      align-content: center;
      gap: 1rem;

      &-text {
        display: grid;
        align-items: center;
        border: 2px solid gray;
        border-radius: var(--space-1);
        background-color: var(--background-color);
        color: var(--text-color);
        padding: var(--space-4);
        box-sizing: content-box;
        outline: none;
        box-shadow: none;
      }
    }
  }

  .visit {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr auto;
    align-content: center;
    gap: 1rem;

    .prompt {
      display: grid;
      align-content: center;
    }
  }
}
</style>
