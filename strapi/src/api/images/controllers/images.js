'use strict';
const axios = require('axios');
const sharp = require('sharp');

/**
 * A set of functions called "actions" for `images`
 */
module.exports = {
  loadImage: async (ctx, next) => {
    try {
      const imageService = strapi.service('api::images.images');
      const { identifier, region, size, rotation, quality, format } = ctx.params;

      const id = `${identifier}-${region}-${size}-${rotation}-${quality}.${format}`;
      const url = atob(identifier);

      // If the region is full, size is max, rotation is 0 and quality is default, just return it.
      if (region === 'full' && size === 'max' && rotation === '0' && quality === 'default' && url.startsWith('http')) {
        const response = await axios.get(url, { responseType: 'stream' });

        for (const header in response.headers) {
          ctx.set(header, response.headers[header]);
        }

        ctx.body = response.data;
        return ctx;
      }

      // Check if we have a cached version of this image
      const cachedFile = await imageService.fetchMediaLibrary(id);
      if (cachedFile) {
        console.warn('[Cache Hit] - Return cached file');
        ctx.type = `image/${format}`;
        ctx.body = cachedFile;
        return ctx;
      }

      console.warn('[Cache Miss] - Create new file and cache');

      // Fetch the external url as array buffer
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);

      // Process the image using Sharp and Utils
      let processedImage = sharp(buffer);
      processedImage = await imageService.region(processedImage, region);
      processedImage = imageService.size(processedImage, size);
      processedImage = imageService.rotation(processedImage, rotation);
      processedImage = imageService.quality(processedImage, quality);
      processedImage = imageService.format(processedImage, format);
      const result = await processedImage.toBuffer();

      // // Save the processed image to the cache
      imageService.storeInMediaLibrary(result, format, id);

      // Set the appropriate headers and send the processed image
      ctx.type = `image/${format}`;
      ctx.body = result;
      return;
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = 'Error fetching or processing image';
    }
  }
};
