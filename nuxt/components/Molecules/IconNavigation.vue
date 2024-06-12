<template>
  <AtomsNavigation
    :to="to"
    :direction="direction">
    <div class="icon-wrapper">
      <Icon
        :icon="icon"
        class="icon" />
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    direction?: string;
    to: To;
  }>(),
  {
    direction: '',
  },
);
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--space-11);
  width: var(--space-11);
  background-color: var(--blue);
  color: var(--black);
  border-radius: var(--space-11);

  .icon {
    width: var(--space-6);
    height: var(--space-6);
  }
}
</style>
