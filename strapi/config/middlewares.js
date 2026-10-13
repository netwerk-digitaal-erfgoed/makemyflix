module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          // S3_ENDPOINT as well as S3_PUBLIC_URL: the public URL may redirect to the storage
          // endpoint, and browsers check the redirect target against the policy too.
          'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', process.env.S3_PUBLIC_URL, process.env.S3_ENDPOINT],
          'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', process.env.S3_PUBLIC_URL, process.env.S3_ENDPOINT],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      headers: ['Content-Type', 'Authorization', 'x-flix', 'x-token'],
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
