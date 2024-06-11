<template>
  <AtomsNavigation
    :to="{
      name: 'flix-category',
      params: { category: category.id },
    }">
    <div class="teaser">
      <div
        v-if="category.image"
        class="img-wrapper">
        <AtomsImage
          class="img"
          :identifier="category.image"
          size="400,1000" />
      </div>

      <div class="body">
        <div
          v-if="category.title"
          class="title">
          {{ category.title }}
        </div>

        <div
          v-if="category.period"
          class="period">
          {{ category.period }}
        </div>
      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
defineProps<{
  category: Category;
}>();
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  height: calc(100vh - (var(--header-height) + var(--space-6)));
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    .teaser-img {
      filter: blur(0);
    }
  }

  .img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.02);
    }

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.15s ease-in-out;
      filter: blur(0.625rem);
    }
  }

  .body {
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 100%;
    padding: var(--space-2) var(--space-5);
    background-color: rgba(0, 0, 0, 0.3);
    color: var(--white);
    text-align: center;

    .title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
    }

    .period {
      font-size: var(--font-size-xl);
    }
  }
}
</style>
