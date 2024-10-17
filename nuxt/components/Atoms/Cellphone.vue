<template>
  <div class="device device-iphone-x">
    <div class="device-frame">
      <div class="device-screen scroller">
        <slot></slot>
      </div>
    </div>
    <div class="device-stripe" />
    <div class="device-header" />
    <div class="device-sensors" />
    <div class="device-btns" />
    <div class="device-power" />
    <div class="device-home" />
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
// iPhone X
$device-silver: #e2e3e4;
$device-silver-dark: darken($device-silver, 10%);
$device-silver-panel: #222;

.device {
  position: relative;
  z-index: 1;
  margin-top: var(--space-20);
}

.device-iphone-x {
  height: 54.25rem;
  width: 26.75rem;
  container-type: inline-size;
  container-name: preview;

  .device-frame {
    background: $device-silver-panel;
    border-radius: var(--space-16);
    box-shadow:
      inset 0 0 0.125rem 0.125rem $device-silver-dark,
      inset 0 0 0 var(--space-2) $device-silver;
    height: 100%;
    padding: var(--space-7);
    width: 100%;
  }

  .device-screen {
    border-radius: var(--space-10);
    height: 50.75rem;
    max-width: 23.5rem;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .device-stripe {
    &::after,
    &::before {
      border: solid rgba(1, 1, 1, 0.25);
      border-width: 0 var(--space-2);
      content: '';
      height: var(--space-2);
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 9;
    }
    &::after {
      top: var(--space-21);
    }
    &::before {
      bottom: var(--space-21);
    }
  }

  .device-header {
    background: $device-silver-panel;
    border-bottom-left-radius: var(--space-5);
    border-bottom-right-radius: var(--space-5);
    height: var(--space-8);
    left: 50%;
    margin-left: calc(var(--space-26) * -1);
    position: absolute;
    top: var(--space-7);
    width: 12.75rem;
    z-index: 20;

    &::after,
    &::before {
      content: '';
      height: var(--space-3);
      position: absolute;
      top: 0;
      width: var(--space-3);
    }
    &::after {
      background: radial-gradient(
        circle at bottom left,
        transparent 0,
        transparent 75%,
        $device-silver-panel 75%,
        $device-silver-panel 100%
      );
      left: calc(var(--space-3) * -1);
    }
    &::before {
      background: radial-gradient(
        circle at bottom right,
        transparent 0,
        transparent 75%,
        $device-silver-panel 75%,
        $device-silver-panel 100%
      );
      right: calc(var(--space-3) * -1);
    }
  }

  .device-sensors {
    &::after,
    &::before {
      content: '';
      position: absolute;
      z-index: 20;
    }
    &::after {
      background: #333;
      border-radius: var(--space-1);
      height: var(--space-2);
      left: 50%;
      margin-left: calc(var(--space-7) * -1);
      top: var(--space-8);
      width: var(--space-13);
    }
    &::before {
      background: radial-gradient(farthest-corner at 20% 20%, #6074bf 0, transparent 40%),
        radial-gradient(farthest-corner at 80% 80%, #513785 0, #24555e 20%, transparent 50%);
      box-shadow: 0 0 var(--space-0) var(--space-0) rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      height: var(--space-3);
      left: 50%;
      margin-left: var(--space-10);
      top: var(--space-8);
      width: var(--space-3);
    }
  }

  .device-btns {
    background: $device-silver-dark;
    height: var(--space-8);
    left: calc(var(--space-1) * -1);
    position: absolute;
    top: var(--space-29);
    width: var(--space-1);

    &::after,
    &::before {
      background: $device-silver-dark;
      content: '';
      height: var(--space-16);
      left: 0;
      position: absolute;
      width: var(--space-1);
    }

    &::after {
      top: var(--space-15);
    }
    &::before {
      top: var(--space-35);
    }
  }

  .device-power {
    background: $device-silver-dark;
    height: var(--space-25);
    right: calc(var(--space-1) * -1);
    position: absolute;
    top: 12.5rem;
    width: var(--space-1);
  }
}

:deep() {
  @include responsive-typography;
  .category-slide .teaser {
    @include preview-container-down {
      height: calc(50.75rem - (var(--header-height)));
    }
  }
}
</style>
