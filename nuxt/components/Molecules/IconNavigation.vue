<template>
  <AtomsNavigation :to="to" :direction="direction">
    <AtomsIcon :name="name" class="h-11 w-11 bg-blue text-black rounded-full" />
  </AtomsNavigation>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name: string,
  direction?: string,
  to: Object
}>(), {
  direction: ''
});
</script>
