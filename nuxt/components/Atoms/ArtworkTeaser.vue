<template>
  <AtomsNavigation
    :to="to"
    direction="up">
    <div class="teaser">
      <div
        v-if="artwork.image"
        class="img-wrapper">
        <AtomsImage
          class="img"
          :identifier="artwork.image"
          region="square"
          size="400,400" />
      </div>

      <div class="body">
        <div
          v-if="artwork.title"
          class="title">
          {{ artwork.title }}
        </div>
        <div
          v-if="artwork.subTitle"
          class="subtitle">
          {{ artwork.subTitle }}
        </div>
      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
defineProps<{
  artwork: Artwork;
  to: To;
}>();
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    .img {
      transform: scale(1.1);
    }
  }

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .img-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-slider);
    }
  }

  .body {
    position: absolute;
    left: 0;
    bottom: var(--space-6);
    width: 100%;
    padding: var(--space-2) var(--space-5);
    background-color: var(--black-30);
    color: var(--background-color);
    backdrop-filter: blur(var(--space-1));

    .title {
      font-weight: var(--font-weight-semibold);
    }

    .subtitle {
      font-size: var(--font-size-xsm);
      font-weight: var(--font-weight-light);
    }
  }
}
</style>
