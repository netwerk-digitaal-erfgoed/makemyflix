<template>
  <div class="bg-black text-white flex justify-center items-center fixed left-0 bottom-20 rounded-b-3xl origin-top-left h-8 w-40 cursor-pointer select-none z-10 rotate-270" @click="openAbout">
    HeritageFlix
  </div>
  <div v-if="isOpen" class="backdrop fixed left-0 top-0 w-full h-full overflow-hidden flex items-center justify-center z-50 bg-black/40" @click.self="closeAbout">
    <div class="modal bg-black text-white pt-4 pb-0 px-8 max-w-5xl overflow-hidden relative grid">
      <div class="header row-start-1 flex justify-center items-center">
        <span class="text-2xl text-white ">HeritageFlix</span>
        <button @click="closeAbout" class="w-4 h-4 text-white absolute right-0 top-0 m-6">
          <AtomsIcon name="close" />
        </button>
      </div>
      <div class="content row-start-2 overflow-y-scroll custom-scroll">
        <ContentDoc path="/about"/>
      </div>
      <div class="footer h-20 flex justify-center items-center row-start-3">
        <AtomsIcon name="ndeLogo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(true);

const openAbout = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '1rem';
};
const closeAbout = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}
</script>

<style lang="scss" scoped>
.modal {
  max-height: 90vh;
  grid-template-rows: 3rem 1fr 5rem;
}
:deep(h1) {
  @apply text-2xl text-white mb-5;
}
:deep(h2) {
  @apply font-semibold;
}
:deep(p),
:deep(ul) {
  @apply font-light mb-4;
}
</style>
