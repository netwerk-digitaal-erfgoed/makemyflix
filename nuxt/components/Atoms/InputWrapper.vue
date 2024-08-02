<template>
  <div :class="classes">
    <label
      v-if="label"
      :for="id">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string;
  label?: string;
  inline?: boolean;
}>();

const classes = computed(() => {
  return {
    'input-wrapper': true,
    inline: props.inline,
  };
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas: 'label' 'input';
  gap: var(--space-4);
  background-color: var(--background-color);
  color: var(--text-color);
  width: 100%;

  &.inline {
    grid-template-columns: min-content auto;
    grid-template-rows: min-content;
    grid-template-areas: 'label input';
  }

  label {
    grid-area: label;
    display: flex;
    align-items: center;
    font-size: var(--font-size-lg);
    text-wrap: nowrap;
  }

  :deep(input),
  :deep(textarea),
  :deep(select) {
    width: auto;
  }
}
</style>
