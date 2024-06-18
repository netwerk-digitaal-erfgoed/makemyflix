<template>
  <AtomsNavigation
    :to="{
      name: 'flix-category',
      params: { category: category.slug },
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
        <h2
          v-if="category.title"
          class="title">
          {{ category.title }}
        </h2>

        <h3
          v-if="category.period"
          class="period">
          {{ category.period }}
        </h3>
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
    .img-wrapper {
      .img {
        filter: blur(0);
      }
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
      background: var(--black-20);
    }

    .img {
      width: var(--max-width-slide);
      height: 100%;
      object-fit: cover;
      transition: 0.15s ease-in-out;
      filter: blur(0.625rem);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .body {
    box-sizing: border-box; // Due to swiper's shadow html
    position: absolute;
    left: 0;
    bottom: 10%;
    width: 100%;
    text-align: center;
    padding-block: var(--space-2);
    color: var(--background-color);
    background-color: var(--black-30);
    backdrop-filter: blur(var(--space-1));

    .title {
      text-transform: uppercase;
    }

    .period {
      font-weight: var(--font-weight-medium);
    }
  }
}
</style>
