export const useQueriesStore = defineStore('queries', () => {
  let disableLinks: string[];

  function getDisableLinks(): string[] {
    return disableLinks;
  }

  async function loadQueries(): Promise<void> {
    console.warn('Queries.ts#load');
    const devPrefix = process.dev ? '/_nuxt/assets' : '';
    const jsonLocation = `${devPrefix}/config/queries.json`;
    const data: QueryData = await $fetch(jsonLocation);
    disableLinks = Array.isArray(data.disableLinks) ? data.disableLinks : [];
  }

  return { loadQueries, getDisableLinks };
});
