/**
 * Helper function to generate headers for requests
 * A token always takes precedence over the currentFlix.uri
 */
export default () => {
  const { query } = useRoute();
  const { currentFlix } = useFlixStore();
  const headers: Record<string, string> = {};

  if (query.token) {
    headers['x-token'] = query.token as string;
  } else if (currentFlix?.uri) {
    headers['x-flix'] = currentFlix.uri;
  }
  return headers;
};
