'use strict';

/**
 * game-round service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game-round.game-round');
