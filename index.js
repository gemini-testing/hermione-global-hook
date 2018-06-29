'use strict';

const parseConfig = require('./config');

/**
 * @param {Object} hermione
 * @param {Object} options
 */
module.exports = (hermione, opts) => {
    const config = parseConfig(opts);
    if (!config.enabled) {
        return;
    }

    const {beforeEach, afterEach} = config;

    hermione.on(hermione.events.AFTER_TESTS_READ, (collection) => {
        collection.eachRootSuite((root) => {
            beforeEach && root.beforeEach(beforeEach);
            afterEach && root.afterEach(afterEach);
        });
    });
};
