<template>
  <div class="device">
    <div class="device-frame">
      <div class="device-screen scroller">
        <slot></slot>
      </div>
    </div>
    <div class="device-sensors"></div>
    <div class="device-home"></div>
  </div>
</template>

<style lang="scss" scoped>
$device-silver: #e2e3e4;
$device-silver-dark: darken($device-silver, 15%);
$device-panel: #0d0d0d;

.device {
  position: relative;
  height: var(--tablet-height);
  width: var(--tablet-width);
  container-type: inline-size;
  container-name: preview;
  z-index: 1;
  margin-top: var(--space-20);

  .device-frame {
    background: $device-panel;
    border-radius: var(--space-9);
    box-shadow:
      inset 0 0 0 var(--space-0) $device-silver-dark,
      inset 0 0 var(--space-0) var(--space-1) $device-silver;
    height: 100%;
    padding: var(--space-6) var(--space-16);
    width: 100%;
    display: grid;
    place-content: center;
  }

  .device-screen {
    border: var(--space-a) solid lighten($device-panel, 2%);
    border-radius: var(--space-3);
    height: 100%;
    max-width: var(--tablet-screen-width);
    width: 100%;
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
      border-radius: var(--space-4);
      box-shadow:
        calc(var(--space-5) * -1) 0 lighten($device-panel, 5%),
        var(--space-17) 0 lighten($device-panel, 5%);
      height: var(--space-3);
      top: 50%;
      margin-top: calc(var(--space-8) * -1);
      left: var(--space-8);
      width: var(--space-3);
      transform: rotate(-90deg) scale(-1);
    }
    &::before {
      border-radius: 50%;
      height: var(--space-2);
      left: var(--space-8);
      margin-top: calc(var(--space-1) * -1);
      top: 50%;
      width: var(--space-2);
    }
  }

  .device-home {
    border: var(--space-a) solid var(--dark-gray);
    border-radius: 50%;
    right: var(--space-4);
    height: var(--space-9);
    top: 50%;
    margin-top: calc(var(--space-4) * -1);
    position: absolute;
    width: var(--space-9);
  }
}
:deep() {
  @include responsive-typography;
  .category-slide .teaser {
    @include preview-container-down {
      height: calc(var(--tablet-screen-height) - (var(--header-height)));
    }
  }
}
</style>
