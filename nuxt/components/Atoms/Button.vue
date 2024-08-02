<template>
  <button
    :type="type"
    :class="classes">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary';
    type?: HTMLButtonElement['type'];
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
);

const classes = computed(() => {
  return ['btn', props.variant];
});
</script>

<style lang="scss" scoped>
.btn {
  padding: var(--space-4) var(--space-8);
  border-radius: var(--space-2);
  cursor: pointer;
  user-select: none;

  &.primary {
    color: var(--background-color);
    border: var(--space-0) solid transparent;
    background-color: var(--blues-blue);

    &:hover {
      color: var(--blues-blue);
      background-color: var(--background-color);
      border: var(--space-0) solid var(--blues-blue);
    }
  }

  &.secondary {
    background-color: var(--background-color);
    color: var(--blues-blue);
    border: var(--space-0) solid var(--blues-blue);

    &:hover {
      background-color: var(--blues-blue);
      color: var(--background-color);
      border: var(--space-0) solid transparent;
    }
  }
}
</style>
