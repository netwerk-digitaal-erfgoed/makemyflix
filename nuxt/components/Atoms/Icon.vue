<template>
  <i class="icon-wrapper">
    <component :is="icon" />
  </i>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

const icon = computed(() => defineAsyncComponent(() => import(`../../assets/icons/${props.name}.svg?component`))).value;
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
