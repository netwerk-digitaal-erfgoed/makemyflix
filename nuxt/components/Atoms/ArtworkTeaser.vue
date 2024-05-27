<template>
  <AtomsNavigation :to="to" direction="up">
    <div class="teaser">
      <div v-if="artworkImage" class="teaser-img-wrapper">
        <img class="teaser-img" :src="artworkImage" />
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
const props = defineProps<{
  artwork: Artwork,
  to: Object
}>();

/**
 * Image processing
 */
 const artworkImage = computed(() => {
  if (!props.artwork?.image) {
    return '';
  }

  const identifier = process.server ? Buffer.from(props.artwork.image, 'base64') : btoa(props.artwork.image);
  // https://images.diaries.amsterdamtimemachine.nl/iiif/urn-gvn-EVDO01-IIAV002_IAV001000030-large_03.jpg/749,12,729,618/max/0/default.jpg
  return `http://localhost:3000/images/${identifier}/square/400,400/0/default.webp`;

});


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
