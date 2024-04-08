'use strict';

const parseConfig = require('./config');

/**
 * @param {Object} testplane
 * @param {Object} options
 */
module.exports = (testplane, opts) => {
    const config = parseConfig(opts);
    if (!config.enabled) {
        return;
    }

    const {beforeEach, afterEach} = config;

    testplane.on(testplane.events.AFTER_TESTS_READ, (collection) => {
        collection.eachRootSuite((root) => {
            beforeEach && root.beforeEach(beforeEach);
            afterEach && root.afterEach(afterEach);
        });
    });
};
