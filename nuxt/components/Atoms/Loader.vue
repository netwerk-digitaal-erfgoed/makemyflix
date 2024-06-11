<template>
  <div class="loader">
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
    <div class="dot" />
  </div>
</template>

<style scoped lang="scss">
@keyframes scaling {
  // Note: Move colors to theming
  0%,
  100% {
    transform: scale(0.2);
    background-color: #d2ddde;
  }

  40% {
    transform: scale(1);
    background-color: #2e2e2e;
  }

  50% {
    transform: scale(1);
    background-color: #0d1933;
  }
}

.loader {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  column-gap: var(--space-1);
}

.dot {
  height: inherit;
  border-radius: 50%;
  transform: scale(0);
  animation: scaling 2.5s ease-in-out infinite;
  display: inline-block;
  aspect-ratio: 1/1;

  @for $j from 0 through 5 {
    &:nth-child(0n + #{$j}) {
      animation-delay: #{$j * 0.2}s;
    }
  }
}
</style>
