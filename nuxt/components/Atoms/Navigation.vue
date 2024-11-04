<template>
  <a
    :href="route.href"
    @click.prevent="animateNavigation">
    <slot />
  </a>
</template>

<script setup lang="ts">
const router = useRouter();
const { $navigate } = useNuxtApp();
const { currentFlix, isPreview } = storeToRefs(useFlixStore());

const props = withDefaults(
  defineProps<{
    direction?: string;
    to: To;
  }>(),
  {
    direction: '',
  },
);

const route = computed(() => {
  const flixName = currentFlix.value?.uri.split('/').pop();
  if (!flixName) {
    return { href: '' };
  }
  const destination = {
    name: props.to.name,
    params: {
      flix: flixName,
      ...(props.to.params ?? {}),
    },
  };
  return router.resolve(destination);
});

const animateNavigation = () => {
  if (isPreview.value) {
    return;
  }
  return $navigate(route.value, props.direction);
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
