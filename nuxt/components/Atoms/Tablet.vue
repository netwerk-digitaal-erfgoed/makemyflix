<template>
  <div
    class="device device-ipad-pro"
    :style="{
      '--device-sf': scaleFactor,
    }">
    <div class="device-frame">
      <div class="device-screen">
        <slot></slot>
      </div>
    </div>
    <div class="device-sensors"></div>
    <div class="device-home"></div>
  </div>
</template>

<script setup lang="ts">
/**
 * Constants
 */
const PreviewSidebarWidth = 380;
const PreviewViewPadding = 48;
const DefaultWidth = 804;
const MinWidth = DefaultWidth;
const MaxWidth = 1024;

/**
 * State
 */
const scaleFactor = ref(getScaleFactor());

/**
 * Methods
 */
function getAvailableWidth() {
  const preview = document.getElementById('preview');
  if (!preview) {
    return Number.POSITIVE_INFINITY;
  }

  return Math.max(0, window.innerWidth - PreviewSidebarWidth - PreviewViewPadding);
}

function getScaleFactor() {
  const availableWidth = getAvailableWidth();

  let width = availableWidth;
  if (width > MaxWidth) {
    width = MaxWidth;
  } else if (availableWidth < MinWidth) {
    width = MinWidth;
  }

  return width / DefaultWidth;
}

const onResize = useDebounce(() => {
  scaleFactor.value = getScaleFactor();
}, 150);

/**
 * Lifecycles
 */
onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
$device-silver: #e2e3e4;
$device-silver-dark: darken($device-silver, 15%);
$device-panel: #0d0d0d;
$width: calc(804px * var(--device-sf));
$height: calc(560px * var(--device-sf));
$screenWidth: calc(680px * var(--device-sf));
$screenHeight: calc(510px * var(--device-sf));

.device {
  position: relative;
  transform: scale(1);
  z-index: 1;
}

.device-ipad-pro {
  height: $height;
  width: $width;

  .device-frame {
    background: $device-panel;
    border-radius: calc(36px * var(--device-sf));
    box-shadow:
      inset 0 0 0 1px $device-silver-dark,
      inset 0 0 1px 3px $device-silver;
    height: $height;
    padding: calc(25px * var(--device-sf)) calc(62px * var(--device-sf));
    width: $width;
    display: grid;
    place-content: center;
  }

  // 2732-by-2048-pixel resolution
  .device-screen {
    border: 2px solid lighten($device-panel, 2%);
    border-radius: calc(11px * var(--device-sf));
    height: $screenHeight;
    width: $screenWidth;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .device-sensors {
    &::after,
    &::before {
      content: '';
      position: absolute;
    }
    &::after {
      background: lighten($device-panel, 5%);
      border-radius: calc(17px * var(--device-sf));
      box-shadow:
        calc(-20px * var(--device-sf)) 0 lighten($device-panel, 5%),
        calc(70px * var(--device-sf)) 0 lighten($device-panel, 5%);
      height: calc(10px * var(--device-sf));
      top: 50%;
      margin-top: calc(-30px * var(--device-sf));
      left: calc(29px * var(--device-sf));
      width: calc(10px * var(--device-sf));
      transform: rotate(-90deg) scale(-1);
    }
    &::before {
      background: radial-gradient(farthest-corner at 20% 20%, #6074bf 0, transparent 40%),
        radial-gradient(farthest-corner at 80% 80%, #513785 0, #24555e 20%, transparent 50%);
      box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      height: calc(6px * var(--device-sf));
      left: calc(31px * var(--device-sf));
      margin-top: calc(-3px * var(--device-sf));
      top: 50%;
      width: calc(6px * var(--device-sf));
    }
  }

  .device-home {
    border: 2px solid #454545;
    border-radius: 50%;
    right: calc(17px * var(--device-sf));
    height: calc(34px * var(--device-sf));
    top: 50%;
    margin-top: calc(-17px * var(--device-sf));
    position: absolute;
    width: calc(34px * var(--device-sf));
  }
}
</style>
