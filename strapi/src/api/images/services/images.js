'use strict';
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  /**
   * Helper function to process the format input
   *
   * @param {sharp.Sharp} image
   * @param {string} format - Supported values: jpg | png | webp
   * @returns {sharp.Sharp}
   */
  format: (image, format) => {
    switch (format) {
      case 'png':
        return image.png();
      case 'webp':
        return image.webp();
      case 'jpg':
      default:
        return image.jpeg();
    }
  },

  /**
   * Helper function to process the quality input
   *
   * @param {sharp.Sharp} image
   * @param {string} quality - Supported Value: color | gray | bitonal | default
   * @returns {sharp.Sharp}
   */
  quality: (image, quality) => {
    switch (quality) {
      case 'bitonal':
        return image.threshold(128);
      case 'gray':
        return image.greyscale();
      case 'color':
      default:
        return image;
    }
  },

  /**
   * Helper function to process the region input
   * We do not support pct:x,y,w,h
   *
   * @param {sharp.Sharp} image
   * @param {string} region - Supported values: full | square | x,y,w,h
   * @returns {Promise<sharp.Sharp>}
   */
  region: async (image, region) => {
    // If the region is full, just return and do nothing
    switch (region) {
      case 'full':
        return image;
      case 'square':
        const { width, height } = await image.metadata();
        const minsize = Math.min(width || 0, height || 0);
        return image.resize(minsize, minsize, { fit: 'cover', position: 'centre' });
      default:
        try {
          const [x, y, width, height] = region.split(',').map(Number);
          return image.extract({ left: x, top: y, width, height });
        } catch (e) {
          console.warn(e);
          return image;
        }
    }
  },

  /**
   * Helper function to process the rotation input
   *
   * @param {sharp.Sharp} image
   * @param {string} rotation - Supported values: n | !n
   * @returns {sharp.Sharp}
   */
  rotation: (image, rotation) => {
    const isMirrored = rotation.startsWith('!');
    const value = Number(isMirrored ? rotation.slice(1) : rotation);

    if (isMirrored) {
      image = image.flop();
    }

    return value > 0 ? image.rotate(value) : image;
  },

  /**
   * Helper function to process the size input
   *
   * @param {sharp.Sharp} image
   * @param {string} size - Supported values: max | w,h
   * @returns {sharp.Sharp}
   */
  size: (image, size) => {
    // If the size is max, don't do anything and just return
    if (size === 'max') {
      return image;
    }

    try {
      const [width, height] = size.split(',').map(Number);
      return image.resize(width, height);
    } catch (e) {
      console.warn(e);
      return image;
    }
  },

  /**
   * Helper function to upload a buffer into the cache folder
   *
   * @param {Buffer} buffer
   * @param {string} extension
   * @param {string} alternativeText
   * @returns {Promise<File[]>}
   */
  storeInMediaLibrary: async (buffer, extension, alternativeText) => {
    try {
      // Ensure the cache folder exists before we try to upload to the media library
      const folderService = strapi.plugins['upload'].services.folder;
      const folders = await folderService.getStructure();
      let folder = (folders || []).find(folder => folder.name === 'cache');

      // If we can't find the folder, just exit and don't store it
      if (!folder) {
        return;
      }

      // Upload the file
      const uploadService = strapi.plugins['upload'].services.upload;
      return await uploadService.upload({
        data: {
          fileInfo: {
            alternativeText,
            folder: folder.id,
          },
        },
        files: {
          path: buffer,
          name: `${uuidv4()}.${extension}`,
          type: `image/${extension}`,
          size: buffer.length
        },
      });
    } catch (error) {
      console.warn(error);
      throw new Error('Failed to upload media file');
    }
  },
};
