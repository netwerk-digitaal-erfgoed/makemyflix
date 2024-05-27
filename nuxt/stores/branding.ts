import { defineStore } from 'pinia';

export const useBrandingStore = defineStore('branding', () => {
  const name = ref();
  const intro = ref();
  const logo = ref();
  const banner = ref();

  async function loadBranding (): Promise<void> {
    console.warn('Branding.ts#load');
    const devPrefix = process.dev ? '/_nuxt/assets' : '';
    const jsonLocation = `${devPrefix}/config/branding.json`;
    const branding:Branding = await $fetch(jsonLocation);

    // Set refs
    name.value = branding.name || '';
    intro.value = branding.intro || '';
    if (branding.banner) {
      banner.value = `${devPrefix}${branding.banner}`;
    }
    if (branding.logo) {
      logo.value = `${devPrefix}${branding.logo}`;
    }
  }

  return { intro, logo, name, banner, loadBranding };
});
