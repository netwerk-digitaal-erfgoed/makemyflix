<template>
  <div class="sidebar">
    <div class="title">
      <h2>Flix bouwer</h2>
    </div>
    <AtomsAccordeon :initial="true">
      <template #header>
        <h4 class="section-header">Styling</h4>
      </template>
      <template #default>
        <div class="divider"></div>
        <AtomsAccordeon :initial="true">
          <template #header>
            <div class="block-header">Kleurgebruik</div>
          </template>
          <template #default>
            <MoleculesFormInput
              type="color"
              inline
              label="Primaire kleur" />
            <MoleculesFormInput
              type="color"
              inline
              label="Secundaire kleur" />
            <MoleculesFormInput
              type="color"
              inline
              label="Tekst kleur" />
            <MoleculesFormInput
              type="color"
              inline
              label="Accenten" />
          </template>
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon>
          <template #header>
            <div class="block-header">Typografie</div>
          </template>
          <template #default>
            <MoleculesFormInput
              type="select"
              :options="['Poppins']" />
          </template>
        </AtomsAccordeon>
      </template>
    </AtomsAccordeon>
    <div class="divider"></div>
    <AtomsAccordeon
      :initial="true"
      class="offset">
      <template #header>
        <h4 class="section-header">Identiteit</h4>
      </template>
      <template #default>
        <div class="divider"></div>
        <AtomsAccordeon header="Naam">
          <MoleculesFormInput />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix omschrijving">
          <MoleculesFormInput />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix logo (optioneel)">
          <MoleculesFormUpload
            id="input-logo"
            prompt="Upload logo" />
        </AtomsAccordeon>
        <div class="divider"></div>
        <AtomsAccordeon header="Flix banner (optioneel)">
          <MoleculesFormUpload
            id="input-banner"
            prompt="Upload banner" />
        </AtomsAccordeon>
      </template>
    </AtomsAccordeon>
    <div class="divider"></div>
    <AtomsAccordeon class="offset">
      <template #header>
        <h4 class="section-header">Responsive view</h4>
      </template>
      <template #default> </template>
    </AtomsAccordeon>
    <div class="offset">
      <AtomsButton @click="emit('publish')">PUBLICEER JOUW FLIX SITE</AtomsButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['publish']);
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #f5f5f5;
  min-width: 380px;
  padding: var(--space-6);

  .divider {
    background-color: #8c8c8c;
    height: 1px;
    width: 100%;
    margin: var(--space-2) 0 var(--space-2);
  }

  .title {
    text-align: center;
    margin-bottom: var(--space-4);
  }

  .section-header {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  .block-header {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
  }

  .offset {
    margin-top: var(--space-8);
  }
}
</style>
