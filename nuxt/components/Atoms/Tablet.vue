<template>
  <div class="device device-ipad-pro">
    <div class="device-frame">
      <div class="device-screen">
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
  z-index: 1;
  margin-top: var(--space-20);
}

.device-ipad-pro {
  height: 35rem;
  width: 50.25rem;
  container-type: inline-size;
  container-name: preview;

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
    border: 0.125rem solid lighten($device-panel, 2%);
    border-radius: var(--space-3);
    height: 100%;
    max-width: 42.5rem;
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
      background: radial-gradient(farthest-corner at 20% 20%, #6074bf 0, transparent 40%),
        radial-gradient(farthest-corner at 80% 80%, #513785 0, #24555e 20%, transparent 50%);
      box-shadow: 0 0 var(--space-0) var(--space-0) rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      height: var(--space-2);
      left: var(--space-8);
      margin-top: calc(var(--space-1) * -1);
      top: 50%;
      width: var(--space-2);
    }
  }

  .device-home {
    border: 0.125rem solid #454545;
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
      height: calc(32rem - (var(--header-height)));
    }
  }
}
</style>
