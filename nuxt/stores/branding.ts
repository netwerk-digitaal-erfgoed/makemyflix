import { defineStore } from 'pinia';

export const useBrandingStore = defineStore('branding', () => {
  const name = ref();
  const intro = ref();
  const logo = ref();
  const banner = ref();

  function loadBranding(branding: Branding): void {
    name.value = branding.name || '';
    intro.value = branding.intro || {};
    if (branding.banner) {
      banner.value = branding.banner;
    }
    if (branding.logo) {
      logo.value = branding.logo;
    }
  }

  return { intro, logo, name, banner, loadBranding };
});
