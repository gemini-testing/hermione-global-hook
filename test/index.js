'use strict';

const plugin = require('../');
const EventEmitter = require('events');

const events = {AFTER_TESTS_READ: 'after_tests_read'};

describe('testplane-global-hook', () => {
    const mktestplaneStub = () => {
        const testplane = new EventEmitter();
        testplane.events = events;

        return testplane;
    };

    const stubSuite = () => {
        return {
            beforeEach: sinon.spy().named('beforeEach'),
            afterEach: sinon.spy().named('afterEach')
        };
    };

    it('should be enabled by default', () => {
        const testplane = mktestplaneStub();

        plugin(testplane);

        const eachRootSuite = sinon.spy().named('eachRootSuite');
        testplane.emit(events.AFTER_TESTS_READ, {eachRootSuite});

        assert.calledOnce(eachRootSuite);
    });

    it('should do nothing if disabled', () => {
        const testplane = mktestplaneStub();

        plugin(testplane, {enabled: false});

        const eachRootSuite = sinon.spy().named('eachRootSuite');
        testplane.emit(events.AFTER_TESTS_READ, {eachRootSuite});

        assert.notCalled(eachRootSuite);
    });

    [
        'beforeEach',
        'afterEach'
    ].forEach((hookName) => {
        it(`should set global ${hookName} hook to each root suite`, () => {
            const hook = sinon.spy().named(hookName);

            const testplane = mktestplaneStub();
            plugin(testplane, {[hookName]: hook});

            const suite = stubSuite();
            const eachRootSuite = (cb) => cb(suite);
            testplane.emit(events.AFTER_TESTS_READ, {eachRootSuite});

            assert.calledOnceWith(suite[hookName], hook);
        });

        it(`should not set global ${hookName} hook if no hook set in config`, () => {
            const testplane = mktestplaneStub();
            plugin(testplane);

            const suite = stubSuite();
            const eachRootSuite = (cb) => cb(suite);
            testplane.emit(events.AFTER_TESTS_READ, {eachRootSuite});

            assert.notCalled(suite[hookName]);
        });
    });
});
