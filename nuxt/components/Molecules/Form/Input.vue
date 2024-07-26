<template>
  <div :class="{ 'input-wrapper': true, inline: inline }">
    <label v-if="label">
      {{ label }}
    </label>
    <template v-if="type === 'input'">
      <input
        class="input"
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </template>
    <template v-if="type === 'color'">
      <input
        class="input color"
        type="color"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </template>
    <template v-else-if="type === 'textarea'">
      <textarea
        class="input"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
/**
 * Props and State
 */
withDefaults(
  defineProps<{
    type?: 'input' | 'textarea' | 'color';
    label?: string;
    inline?: boolean;
    modelValue?: string | number;
  }>(),
  {
    type: 'input',
    inline: false,
  },
);

defineEmits(['update:modelValue']);
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

  textarea {
    height: var(--space-32);
  }

  .input {
    grid-area: input;
    border: var(--space-0) solid var(--text-color);
    border-radius: var(--space-1);
    padding: var(--space-5);
    box-sizing: content-box;
    outline: none;
    box-shadow: none;
    cursor: auto;

    &:focus,
    &:focus-visible,
    &:hover {
      border-color: var(--neutrals-900);
    }

    &:disabled {
      border-color: var(--neutrals-300);
      color: var(--neutrals-600);
      cursor: not-allowed;
    }

    &::placeholder {
      color: var(--neutrals-400);
    }

    &.color {
      justify-self: self-end;
      border: none;
      padding: 0;
      width: var(--space-8);
      height: var(--space-8);
    }
  }
}
</style>
