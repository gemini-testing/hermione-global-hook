'use strict';

/**
 * @param {Object} hermione
 * @param {Object} options
 */
module.exports = (hermione, options) => {
    if (!options.enabled) {
        return;
    }

    const globalAfterEach = options.globalAfterEach || (() => {});
    const globalBeforeEach = options.globalBeforeEach || (() => {});

    hermione.on(hermione.events.AFTER_FILE_READ, (data) => {
        const afterEach = data.suite._afterEach.shift();

        data.suite.afterEach(function() {
            return globalAfterEach.apply(this.browser);
        });

        afterEach && data.suite._afterEach.push(afterEach);

        data.suite.beforeEach(function() {
            return globalBeforeEach.apply(this.browser);
        });
    });
};
