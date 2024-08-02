<template>
  <div :class="{ base: true, 'dark-mode': darkMode }">
    <MoleculesButtonsHome v-if="showHome" />
    <h3
      v-if="title"
      class="title">
      {{ title }}
    </h3>
    <MoleculesButtonsCategory
      v-if="showCategory"
      class="close" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    darkMode?: boolean;
    title?: string;
    showCategory?: boolean;
    showHome?: boolean;
  }>(),
  {
    darkMode: false,
    title: '',
    showCategory: false,
    showHome: true,
  },
);
</script>

<style scoped lang="scss">
.base {
  display: grid;
  grid-template-columns: 1fr 1fr 8fr 1fr 1fr;
  grid-template-areas: 'home . title . action';
  padding-block: var(--space-7);
  align-items: center;
  background-color: var(--background-color);
  color: var(--text-color);
  width: 100%;
  z-index: 10;

  &.dark-mode {
    background-color: var(--inverse-background-color);
    color: var(--inverse-text-color);

    .home,
    .close {
      color: var(--inverse-text-color);
    }
  }
}

.home {
  grid-area: home;
}

.close {
  grid-area: action;
}

.title {
  grid-area: title;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
}

@include sm-screen-down {
  .base {
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'home action'
      'title title';
  }

  .home {
    justify-self: flex-start;
    margin-inline: var(--space-4);
  }

  .close {
    justify-self: flex-end;
    margin-inline: var(--space-4);
  }
}
</style>
