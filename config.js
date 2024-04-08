'use strict';

const {root, section, option} = require('gemini-configparser');

const ENV_PREFIX = 'testplane_global_hook_';
const CLI_PREFIX = '--testplane-global-hook-';

const assertType = (type, name) => (value) => {
    if (value && typeof value !== type) {
        throw new Error(`"${name}" must be a ${type}`);
    }
};

const getParser = () => {
    return root(section({
        enabled: option({
            defaultValue: true,
            validate: assertType('boolean', 'enabled')
        }),
        beforeEach: option({
            defaultValue: null,
            validate: assertType('function', 'beforeEach')
        }),
        afterEach: option({
            defaultValue: null,
            validate: assertType('function', 'afterEach')
        })
    }), {envPrefix: ENV_PREFIX, cliPrefix: CLI_PREFIX});
};

module.exports = (options) => {
    const {env, argv} = process;

    return getParser()({options, env, argv});
};
