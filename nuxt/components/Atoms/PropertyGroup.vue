<template>
  <div class="property">
    <label class="font-bold text-sm">{{ t(label) }}</label>
    <AtomsProperty v-for="property in properties" :key="property" :label="property.label" :value="property.value" :allow-link="allowLink" />
  </div>
</template>

<script setup lang="ts">
import { useQueriesStore } from "@/stores/queries";

const { t } = useI18n({});
const props = defineProps<{
  label: string,
  groupName: string
  prop?: ArtProperties
}>();

const allowLink = computed(() => {
  // Fetch field names that aren't allowed to be links
  const disableLinks = useQueriesStore().getDisableLinks();
  // If the groupName isn't in the list, return true
  return !disableLinks.includes(props.groupName);
})

const properties = computed(() => {
  if (!Array.isArray(props.prop)) {
    return [props.prop];
  }
  return props.prop;
});
</script>

<style scoped lang="scss">
  .property {
    display: flex;
    flex-direction: column;
  }
</style>
