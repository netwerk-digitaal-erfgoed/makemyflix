module.exports = ({ env }) => {
  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: `${env('S3_PUBLIC_URL')}/${env('S3_BUCKET')}`,
          s3Options: {
            credentials: {
              accessKeyId: env("S3_KEY"),
              secretAccessKey: env("S3_SECRET"),
            },
            region: env("S3_REGION"),
            endpoint: env("S3_ENDPOINT"),
            forcePathStyle: true,
            params: {
              Bucket: env("S3_BUCKET"),
            },
          },
        },
      },
    },
  };
};
