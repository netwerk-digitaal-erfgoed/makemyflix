<template>
  <AtomsNavigation
    class="col-span-1 col-start-1 flex justify-center items-center uppercase"
    :to="homePath"
  >
    <AtomsIcon name="home" class="h-5 w-5 mr-2" />
    Home
  </AtomsNavigation>
</template>

<script setup lang="ts">
  const homePath = { name: 'index' };
</script>
