<template>
  <MoleculesHeader
    title="MakeMyFlix"
    :show-home="false"
    dark-mode />
  <div class="cta">
    <div class="container">
      <div class="items">
        <div
          v-for="benefit in Benefits"
          :key="benefit.title"
          class="item">
          <div class="icon">
            <Icon
              :icon="benefit.icon"
              width="2em"
              height="2em" />
          </div>
          <div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="prompt">
      <h2>
        Maak direct<br />
        je eigen flix
      </h2>
      <AtomsButton
        type="link"
        to="/create"
        class="create-btn">
        START NU
      </AtomsButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const Benefits = [
  {
    title: 'Check de endpoints',
    text: 'Lorem ipsum dolor sit amet, consect.',
    icon: 'mdi:format-list-checks',
  },
  {
    title: 'Personaliseren',
    text: 'Lorem ipsum dolor sit amet, consect.',
    icon: 'mdi:pencil-outline',
  },
  {
    title: 'Genereer je Flix',
    text: 'Lorem ipsum dolor sit amet, consect.',
    icon: 'mdi:autorenew',
  },
  {
    title: 'Bekijk en delen',
    text: 'Lorem ipsum dolor sit amet, consect.',
    icon: 'mdi:monitor-share',
  },
];

onMounted(() => {
  useResetStyling();
});
</script>

<style lang="scss" scoped>
.cta {
  background-color: var(--secondary-color);
  color: var(--primary-color);
  min-height: calc(100vh - var(--header-height));

  .container {
    background-color: var(--primary-color);
    color: var(--secondary-color);
  }

  .items {
    display: grid;
    gap: var(--space-8);
    justify-content: center;
    max-width: 80rem;
    margin: 0 auto;
    padding: var(--space-8);

    @media (min-width: 48em) {
      padding: var(--space-20);
      grid-template-columns: 1fr 1fr;
    }
  }

  .item {
    display: flex;
    align-items: center;
    gap: var(--space-3);

    @media (min-width: 48em) {
      gap: var(--space-6);
    }

    .icon {
      color: var(--blues-blue);
    }

    h3 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-medium);
      margin-bottom: var(--space-4);

      @media (min-width: 80em) {
        font-size: var(--font-size-2xl);
      }
    }

    p {
      font-size: var(--font-sm);

      @media (min-width: 80em) {
        font-size: var(--font-size-base);
      }
    }
  }

  .prompt {
    text-align: center;
    padding: var(--space-20) 0;

    h2 {
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);

      @media (min-width: 48em) {
        font-size: var(--font-size-8xl);
      }
    }

    .create-btn {
      margin-top: var(--space-16);
    }
  }
}
</style>
