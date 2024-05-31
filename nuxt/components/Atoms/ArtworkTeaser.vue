<template>
  <AtomsNavigation :to="to" direction="up">
    <div class="teaser">
      <div v-if="artwork.image" class="teaser-img-wrapper">
        <AtomsImage class="teaser-img" :identifier="artwork.image" region="square" size="400,400" format="webp" />
      </div>

      <div class="teaser-body">
        <div v-if="artwork.title" class="text-base font-semibold">
          {{ artwork.title }}
        </div>

        <div v-if="artwork.subTitle" class="text-sm font-light">
          {{ artwork.subTitle }}
        </div>
      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
defineProps<{
  artwork: Artwork,
  to: object
}>();
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    .teaser-img {
      transform: scale(1.1);
    }
  }

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.teaser-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.teaser-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.15s ease-in-out;
}

.teaser-body {
  position: absolute;
  left: 0;
  bottom: 1.5rem;
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  backdrop-filter: blur(0.25rem);
}
</style>
