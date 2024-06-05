'use strict';
const axios = require('axios');
const sharp = require('sharp');

module.exports = {
  loadImage: async (ctx, next) => {
    try {
      const imageService = strapi.service('api::images.images');
      const { identifier, region, size, rotation, quality, format } = ctx.params;
      const id = `${identifier}-${region}-${size}-${rotation}-${quality}.${format}`;
      const url = atob(identifier);

      // Check if this image should be returned raw (full region, max size, no rotation, default quality)
      if (region === 'full' && size === 'max' && rotation === '0' && quality === 'default' && url.startsWith('http')) {
        console.warn(`[Images] - Redirect to raw image: ${url}`);
        ctx.redirect(url);
        return
      }

      // Check if we have an entry to redirect too
      const images = await strapi.entityService.findMany('plugin::upload.file', {
        filters: { alternativeText: id },
        populate: '*',
        limit: 1
      });
      // @ts-ignore
      if (images.length) {
        console.warn(`[images] - Redirect to: ${images[0].url}`);
        ctx.redirect(images[0].url);
        return;
      }

      // Fetch the external url as array buffer
      console.warn('[images] - Create new file and cache');
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
