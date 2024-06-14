<template>
  <template v-if="hasSidenote">
    <div
      class="about-label"
      @click="openAbout">
      About
    </div>
    <div
      v-if="isOpen"
      class="backdrop"
      @click.self="closeAbout">
      <div class="modal">
        <div class="header">
          <h2 class="title">About</h2>
          <button
            @click="closeAbout"
            class="close-button">
            <Icon
              icon="mdi:close"
              class="icon" />
          </button>
        </div>
        <div
          class="content custom-scroll"
          v-html="sidenote" />
        <div class="footer">
          <!-- TODO: Load this from Strapi using the setup call -->
          [[ About logo here ]]
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const isOpen = ref(true);
const flixStore = useFlixStore();

/**
 * Computed Properties
 */
const hasSidenote = computed<boolean>(() => {
  return !!flixStore.sidenote;
});

const sidenote = computed<string>(() => {
  if (flixStore.sidenote) {
    return useMarkdown(flixStore.sidenote);
  }
  return '';
});

/**
 * Methods
 */
const openAbout = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '1rem';
};
const closeAbout = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};
</script>

<style lang="scss" scoped>
// Collapsed sidenote styline
.about-label {
  background-color: var(--inverse-background-color);
  color: var(--inverse-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: var(--space-20);
  border-bottom-left-radius: var(--space-6);
  border-bottom-right-radius: var(--space-6);
  transform-origin: top left;
  height: var(--space-8);
  width: var(--space-40);
  user-select: none;
  cursor: pointer;
  z-index: 10;
  transform: rotate(270deg);
}

// Modal styling
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background-color: var(--black-40);

  .modal {
    background-color: var(--modal-background-color);
    color: var(--modal-text-color);
    padding: var(--space-4) var(--space-8) 0 var(--space-8);
    max-width: var(--max-modal-width);
    position: relative;
    overflow: hidden;
    display: grid;
    max-height: var(--max-modal-height);
    grid-template-rows: var(--space-12) 1fr var(--space-20);

    .header {
      grid-row-start: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .title {
        text-transform: uppercase;
      }

      .close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--space-6);
        height: var(--space-6);
        color: var(--inverse-text-color);
        position: absolute;
        right: 0;
        top: 0;
        margin: var(--space-4);

        .icon {
          width: var(--space-6);
          height: var(--space-6);
        }
      }
    }

    .content {
      grid-row-start: 2;
      overflow-y: scroll;
      scrollbar-color: var(--inverse-text-color) transparent;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: var(--space-2);
      }

      &::-webkit-scrollbar-thumb {
        background: var(--inverse-background-color);
        border-radius: var(--space-1);
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }

    .footer {
      height: var(--space-20);
      display: flex;
      justify-content: center;
      align-items: center;
      grid-row-start: 3;
    }
  }
}

/**
 * Markdown styling
 * Note: Some specific styling is required for the markdown content
 */
.content {
  :deep(h1) {
    margin-bottom: var(--space-5);
  }

  :deep(p),
  :deep(ul) {
    font-weight: var(--font-weight-light);
    margin-bottom: var(--space-4);
  }

  :deep(a) {
    color: var(--modal-text-color);
  }
}
</style>
