<template>
  <div class="property">
    <label class="label">{{ generateLabel(label) }}</label>
    <AtomsProperty
      v-for="property in properties"
      :key="property"
      :label="property.label ?? property.value"
      :value="property.value"
      :allow-link="allowLink" />
  </div>
</template>

<script setup lang="ts">
const { generateLabel } = useFlixStore();
const props = defineProps<{
  label: string;
  groupName: string;
  prop?: ArtProperties;
}>();

const allowLink = computed(() => {
  // TODO: Fix this! Use Strapi to relay this information
  // Fetch field names that aren't allowed to be links
  const disableLinks = [] as string[];
  // If the groupName isn't in the list, return true
  return !disableLinks.includes(props.groupName);
});

const properties = computed(() => {
  if (!Array.isArray(props.prop)) {
    return [props.prop];
  }
  return props.prop;
});
</script>

<style scoped lang="scss">
.property {
  @include flex-column;
  font-size: var(--font-size-xsm);
  font-weight: var(--font-weight-light);

  .label {
    font-weight: var(--font-weight-bold);
  }
}
</style>
