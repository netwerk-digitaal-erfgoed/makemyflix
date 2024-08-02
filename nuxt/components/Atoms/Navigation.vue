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
const { currentFlix } = useFlixStore();

const props = withDefaults(
  defineProps<{
    direction?: string;
    to: To;
    preview?: boolean;
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
  if (props.preview) {
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
