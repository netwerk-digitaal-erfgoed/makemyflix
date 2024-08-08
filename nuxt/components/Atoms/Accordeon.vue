<template>
  <div class="accordeon">
    <div
      class="accordeon-header"
      tabindex="0"
      @click="toggle"
      @keydown.prevent.enter="toggle">
      <slot name="header">
        {{ header }}
      </slot>
      <div
        class="icon"
        :class="openClasses">
        <Icon icon="mdi:chevron-right" />
      </div>
    </div>
    <div
      class="accordeon-body"
      :class="openClasses">
      <div
        class="inner"
        :class="openClasses">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  header?: string;
  initial?: boolean;
}>();
const open = ref(props.initial ?? false);

const openClasses = computed(() => {
  return {
    open: open.value,
  };
});

const toggle = () => {
  open.value = !open.value;
};
</script>

<style lang="scss" scoped>
.accordeon {
  outline: none;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-2) 0;
    cursor: pointer;

    .icon {
      transition: transform 0.3s ease;

      &.open {
        transform: rotate(90deg) translate(0, 6px);
      }
    }
  }

  &-body {
    overflow: hidden;
    transition-property: max-height, opacity;
    transition-duration: 0.4s;
    transition-timing-function: ease-in-out;

    &.open {
      max-height: 100vh;
      opacity: 1;
    }

    &:not(.open) {
      max-height: 0;
      opacity: 0;
    }

    .inner {
      &:not(.open) {
        visibility: hidden;
      }
    }
  }
}
</style>
