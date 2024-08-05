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
    label: !!props.label,
  };
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto;
  grid-template-areas: 'input';
  gap: var(--space-4);
  color: var(--text-color);
  width: 100%;

  &.label {
    grid-template-areas: 'label' 'input';
  }

  &.inline {
    grid-template-columns: min-content auto;
    grid-template-rows: min-content;
    grid-template-areas: 'input';

    &.label {
      grid-template-areas: 'label input';
    }
  }

  label {
    grid-area: label;
    display: flex;
    align-items: center;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-light);
    text-wrap: nowrap;
  }

  :deep(input),
  :deep(textarea),
  :deep(select) {
    width: auto;
  }
}
</style>
