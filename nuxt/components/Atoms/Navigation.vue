<template>
  <NuxtLink
    :to="to"
    @click.prevent="animateNavigation">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const { $navigate } = useNuxtApp();
const { currentFlix } = useFlixStore();

const props = withDefaults(
  defineProps<{
    direction?: string;
    to: To;
  }>(),
  {
    direction: '',
  },
);

const animateNavigation = function () {
  const to = {
    name: props.to.name,
    params: {
      flix: currentFlix!.id,
      ...(props.to.params ?? {}),
    },
  };

  return $navigate(to, props.direction);
};
</script>
