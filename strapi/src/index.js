'use strict';
const { ApplicationError } = require('@strapi/utils').errors;

const folderName = 'cache';

async function ensureCacheFolder(strapi) {
  const params = { name: folderName };
  const folderService = strapi.plugins['upload'].services.folder;
  const hasFolder = await folderService.exists(params);
  if (!hasFolder) {
    await folderService.create(params);
  }
}

async function verifyDeletion(strapi, event) {
  // Find the current cache folder
  const folders = await strapi.entityService.findMany('plugin::upload.folder', {
    filters: { name: folderName },
    populate: ['name'],
    limit: 1,
  });
  const folderId = folders.length ? folders[0].path : false;

  if (folderId) {
    // Loop over all $or conditions to see if the folderId is in there
    const containsCacheFolder = !!event?.params?.where?.$or?.filter(cond => cond?.path?.$eq === folderId).length;

    if (containsCacheFolder) {
      throw new ApplicationError('This folder cannot be deleted.', {
        message: 'This folder cannot be deleted.',
      });
    }
  }
}

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await ensureCacheFolder(strapi);
    strapi.db.lifecycles.subscribe({
      models: ['plugin::upload.folder'],
      async beforeDeleteMany(event) {
        await verifyDeletion(strapi, event);
      },
    });
  },
};
