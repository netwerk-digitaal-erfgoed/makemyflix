<template>
  <span
    v-if="isLink && allowLink"
    class="property">
    <NuxtLink
      :to="value"
      class="link"
      >{{ label }}</NuxtLink
    >
  </span>
  <span
    v-else
    class="property">
    {{ propertyValue }}
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    allowLink: boolean;
    label?: string;
    value?: string;
  }>(),
  {
    allowLink: true,
    value: '',
  },
);

const isLink = computed(() => {
  return useCheckLink(props.value);
});

const propertyValue = computed(() => {
  if (isLink && !props.allowLink) {
    return props.label;
  }
  return props.value;
});
</script>

<style scoped lang="scss">
.property {
  font-size: var(--font-size-sm);
}

.link {
  color: inherit;
  text-decoration: inherit;

  &:hover {
    text-decoration: underline;
  }
}
</style>
