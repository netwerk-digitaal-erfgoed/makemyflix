<template>
  <button
    v-if="type !== 'link'"
    :type="type"
    :class="classes">
    <slot></slot>
  </button>
  <NuxtLink
    v-else
    :class="classes"
    :to="to">
    <slot></slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from '#vue-router';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary';
    type?: HTMLButtonElement['type'] | 'link';
    to?: RouteLocationRaw;
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
);

const classes = computed(() => {
  const c = ['btn', props.variant];

  if (props.type === 'link') {
    c.push('link');
  }

  return c;
});
</script>

<style lang="scss" scoped>
.btn {
  padding: var(--space-4) var(--space-8);
  border-radius: var(--space-2);
  cursor: pointer;
  transition: var(--transition-state);
  user-select: none;

  &.link {
    display: inline-block;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.primary {
    color: var(--background-color);
    border: var(--space-0) solid transparent;
    background-color: var(--blues-blue);

    &:hover:enabled,
    &.link:hover {
      color: var(--blues-blue);
      background-color: var(--background-color);
      border: var(--space-0) solid var(--blues-blue);
    }
  }

  &.secondary {
    background-color: var(--background-color);
    color: var(--blues-blue);
    border: var(--space-0) solid var(--blues-blue);

    &:hover:enabled,
    &.link:hover {
      background-color: var(--blues-blue);
      color: var(--background-color);
      border: var(--space-0) solid transparent;
    }
  }
}
</style>
