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
const { currentFlix, isPreview } = useFlixStore();

const props = withDefaults(
  defineProps<{
    direction?: string;
    to: To;
  }>(),
  {
    direction: '',
  },
);

const destination = computed(() => {
  const to = {
    name: props.to.name,
    params: {
      flix: currentFlix!.id,
      ...(props.to.params ?? {}),
    },
  };

  return to;
});

const route = computed(() => router.resolve(destination.value));

const animateNavigation = () => {
  if (isPreview) {
    return;
  }

  return $navigate(destination.value, props.direction);
};
</script>

<style>
a {
  cursor: pointer;
}
</style>
