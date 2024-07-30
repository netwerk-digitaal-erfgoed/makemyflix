<template>
  <input
    type="file"
    :id="id"
    class="inputfile" />
  <label
    :class="{ highlight: dragging }"
    :for="id"
    @dragend="removeHighlight"
    @dragleave="removeHighlight"
    @dragover="addHighlight"
    @drop="removeHighlight">
    <div class="icon">
      <Icon icon="mdi:tray-upload" />
    </div>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
/**
 * State and Props
 */
defineProps<{
  id: string;
  label?: string;
  modelValue?: string;
}>();

const dragging = ref(false);

/**
 * Methods
 */
const removeHighlight = () => {
  dragging.value = false;
};

const addHighlight = () => {
  dragging.value = true;
};
</script>

<style lang="scss" scoped>
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

label {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: var(--space-8);
  background-color: var(--blues-blue-5);
  border: var(--space-0) dashed var(--blues-blue);
  border-radius: var(--space-1);
  padding: var(--space-6) var(--space-10);
  cursor: pointer;
  color: var(--blues-blue);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-light);

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-6);
    border-radius: 50%;
    background: var(--blues-blue);
    color: white;
  }
}

label.highlight,
.inputfile:focus + label,
.inputfile + label:hover {
  border: var(--space-0) solid var(--blues-blue);
}
</style>
