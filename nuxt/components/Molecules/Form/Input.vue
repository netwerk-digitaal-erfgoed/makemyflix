<template>
  <AtomsInputWrapper
    :id="id"
    :label="label"
    :inline="inline">
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
    <template v-else-if="type === 'select'">
      <select
        class="input select"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
        <option
          v-for="option in options"
          :value="option"
          :key="option">
          {{ option }}
        </option>
      </select>
    </template>
  </AtomsInputWrapper>
</template>

<script lang="ts" setup>
/**
 * Props and State
 */
withDefaults(
  defineProps<{
    id?: string;
    type?: 'input' | 'textarea' | 'color' | 'select';
    label?: string;
    inline?: boolean;
    modelValue?: string | number;
    options?: string[];
  }>(),
  {
    type: 'input',
    inline: false,
  },
);

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
textarea {
  height: var(--space-32);
}

.input {
  grid-area: input;
  background-color: var(--background-color);
  color: var(--text-color);
  border: var(--space-0) solid var(--text-color);
  border-radius: var(--space-1);
  padding: var(--space-5) var(--space-3);
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

  &.color,
  &.select {
    cursor: pointer;
  }
}
</style>
