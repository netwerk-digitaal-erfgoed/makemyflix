<template>
  <AtomsNavigation :to="path">
    <div class="teaser">
      <div v-if="category.image" class="teaser-img-wrapper">
        <img class="teaser-img" :src="category.image" />
      </div>

      <div class="teaser-body">
        <div v-if="category.title" class="text-2xl font-semibold uppercase">
          {{ category.title }}
        </div>

        <div v-if="category.period" class="text-xl">
          {{ category.period }}
        </div>
      </div>
    </div>
  </AtomsNavigation>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: Category
}>();

const path = {
  name: "category",
  params: {
    category: props.category.id,
  },
};
</script>

<style lang="scss" scoped>
.teaser {
  position: relative;
  width: 100%;
  height: calc(100vh - ($header-height + 1.5rem ));
  word-wrap: break-word;
  overflow: hidden;

  &:hover {
    .teaser-img {
      filter: blur(0);
    }
  }
}

.teaser-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.02);
  }
}

.teaser-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.15s ease-in-out;
  filter: blur(0.625rem);
}

.teaser-body {
  position: absolute;
  left: 0;
  bottom: 10%;
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  text-align: center;
}
</style>
