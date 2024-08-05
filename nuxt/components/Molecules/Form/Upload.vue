<template>
  <AtomsInputWrapper
    :id="id"
    :label="label"
    :inline="inline">
    <div :class="dragAreaClasses">
      <template v-if="!hasFile">
        <div class="icon">
          <Icon icon="mdi:tray-upload" />
        </div>
        {{ prompt }}
      </template>
      <template v-else>
        {{ filename }}
        <button
          type="button"
          class="icon"
          @click="clearInput">
          <Icon
            icon="mdi:close"
            width="1.25em"
            height="1.25em" />
        </button>
      </template>
      <input
        type="file"
        ref="el"
        :id="id"
        class="inputfile"
        @dragenter="addHighlight"
        @focus="addHighlight"
        @click="addHighlight"
        @dragleave="removeHighlight"
        @dragover="addHighlight"
        @dragend="removeHighlight"
        @blur="removeHighlight"
        @drop="removeHighlight"
        @change="selectFile" />
    </div>
  </AtomsInputWrapper>
</template>

<script setup lang="ts">
/**
 * State and Props
 */
const props = defineProps<{
  id: string;
  label?: string;
  prompt: string;
  inline?: boolean;
  modelValue?: UploadedImage | File | null;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: File | null): void;
}>();

const el = ref<HTMLInputElement>();
const dragging = ref(false);

/**
 * Computed properties
 */
const dragAreaClasses = computed(() => {
  return {
    'inputfile-area': true,
    file: hasFile.value,
    'no-file': !hasFile.value,
    highlight: dragging.value,
  };
});

const filename = computed(() => {
  const v = props.modelValue;
  if (v instanceof File) {
    return v.name;
  }
  return v?.name ?? '';
});

const hasFile = computed(() => !!filename.value);

/**
 * Methods
 */
const addHighlight = () => {
  if (!dragging.value) {
    dragging.value = true;
  }
};

const removeHighlight = () => {
  dragging.value = false;
};

const selectFile = () => {
  const file = el.value?.files?.[0] ?? null;
  emit('update:modelValue', file);
};

const clearInput = () => {
  if (el.value) {
    el.value.value = '';
    el.value.files = null;
  }

  emit('update:modelValue', null);
};
</script>

<style lang="scss" scoped>
.inputfile {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  cursor: pointer;
  opacity: 0;

  &-area {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--space-8);

    &.file {
      justify-content: space-between;
      border: var(--space-0) solid var(--text-color);
      border-radius: var(--space-1);
      padding: var(--space-5);
      box-sizing: content-box;
      outline: none;
      box-shadow: none;
      cursor: auto;
      width: auto;

      &:focus,
      &:focus-visible,
      &:hover {
        border-color: var(--blues-blue);
      }

      &:disabled {
        border-color: var(--neutrals-300);
        color: var(--neutrals-600);
        cursor: not-allowed;
      }

      .icon {
        height: 1.25em;
        z-index: 2;

        &:hover {
          color: var(--blues-blue);
        }
      }
    }

    &.no-file {
      justify-content: center;
      background-color: var(--blues-blue-5);
      border: var(--space-0) dashed var(--blues-blue);
      border-radius: var(--space-1);
      padding: var(--space-6) var(--space-10);
      cursor: pointer;
      color: var(--blues-blue);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);

      input {
        z-index: 2;
      }

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
  }
}

.inputfile-area.highlight,
.inputfile-area:focus,
.inputfile-area:hover {
  border: var(--space-0) solid var(--blues-blue);
}
</style>
