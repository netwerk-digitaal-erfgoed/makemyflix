<template>
  <div class="device device-iphone-x">
    <div class="device-frame">
      <div class="device-screen">
        <slot></slot>
      </div>
    </div>
    <div class="device-stripe"></div>
    <div class="device-header"></div>
    <div class="device-sensors"></div>
    <div class="device-btns"></div>
    <div class="device-power"></div>
    <div class="device-home"></div>
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
    transform: scale(1);
    z-index: 1;
}

.device-iphone-x {
  height: 868px;
  width: 428px;

  .device-frame {
    background: $device-silver-panel;
    border-radius: 68px;
    box-shadow:
      inset 0 0 2px 2px $device-silver-dark,
      inset 0 0 0 7px $device-silver;
    height: 868px;
    padding: 28px;
    width: 428px;
  }

  // 2436-by-1125-pixel resolution
  .device-screen {
    border-radius: 40px;
    height: 812px;
    width: 375px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .device-stripe {
    &::after,
    &::before {
      border: solid rgba(1, 1, 1, 0.25);
      border-width: 0 7px;
      content: '';
      height: 7px;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 9;
    }
    &::after {
      top: 85px;
    }
    &::before {
      bottom: 85px;
    }
  }

  .device-header {
    background: $device-silver-panel;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 30px;
    left: 50%;
    margin-left: -102px;
    position: absolute;
    top: 28px;
    width: 204px;
    z-index: 20;

    &::after,
    &::before {
      content: '';
      height: 10px;
      position: absolute;
      top: 0;
      width: 10px;
    }
    &::after {
      background: radial-gradient(
        circle at bottom left,
        transparent 0,
        transparent 75%,
        $device-silver-panel 75%,
        $device-silver-panel 100%
      );
      left: -10px;
    }
    &::before {
      background: radial-gradient(
        circle at bottom right,
        transparent 0,
        transparent 75%,
        $device-silver-panel 75%,
        $device-silver-panel 100%
      );
      right: -10px;
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
      border-radius: 3px;
      height: 6px;
      left: 50%;
      margin-left: -25px;
      top: 32px;
      width: 50px;
    }
    &::before {
      background: radial-gradient(farthest-corner at 20% 20%, #6074bf 0, transparent 40%),
        radial-gradient(farthest-corner at 80% 80%, #513785 0, #24555e 20%, transparent 50%);
      box-shadow: 0 0 1px 1px rgba(255, 255, 255, 0.05);
      border-radius: 50%;
      height: 10px;
      left: 50%;
      margin-left: 42px;
      top: 30px;
      width: 10px;
    }
  }

  .device-btns {
    background: $device-silver-dark;
    height: 32px;
    left: -3px;
    position: absolute;
    top: 115px;
    width: 3px;

    &::after,
    &::before {
      background: $device-silver-dark;
      content: '';
      height: 62px;
      left: 0;
      position: absolute;
      width: 3px;
    }

    &::after {
      top: 60px;
    }
    &::before {
      top: 140px;
    }
  }

  .device-power {
    background: $device-silver-dark;
    height: 100px;
    right: -3px;
    position: absolute;
    top: 200px;
    width: 3px;
  }
}
</style>
