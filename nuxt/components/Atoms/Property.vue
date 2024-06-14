<template>
  <span v-if="isLink && allowLink">
    <NuxtLink
      :to="value"
      class="link"
      >{{ label }}</NuxtLink
    >
  </span>
  <span v-else>
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
.link {
  color: inherit;
  text-decoration: inherit;

  &:hover {
    text-decoration: underline;
  }
}
</style>
