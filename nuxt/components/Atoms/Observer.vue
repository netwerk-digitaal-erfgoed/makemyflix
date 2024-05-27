<template>
  <div ref="root" class="observer">
    <slot />
  </div>
</template>

<script setup lang="ts">
const root = ref();
const observer = ref();
const emit = defineEmits(['intersect']);
const props = withDefaults(defineProps<{
  threshold?: string,
  marginRoot?: string
}>(), {
  threshold: '1.0',
  marginRoot: '0px'
});

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit('intersect');
    }
  }, {
    threshold: parseFloat(props.threshold),
    rootMargin: props.marginRoot
  });

  observer.value.observe(root.value);
})

onUnmounted(() => {
  observer.value.disconnect();
});
</script>
