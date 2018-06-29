'use strict';

const plugin = require('../');
const EventEmitter = require('events');

const events = {AFTER_TESTS_READ: 'after_tests_read'};

describe('hermione-global-hooks', () => {
    const mkHermioneStub = () => {
        const hermione = new EventEmitter();
        hermione.events = events;

        return hermione;
    };

    const stubSuite = () => {
        return {
            beforeEach: sinon.spy().named('beforeEach'),
            afterEach: sinon.spy().named('afterEach')
        };
    };

    it('should be enabled by default', () => {
        const hermione = mkHermioneStub();

        plugin(hermione);

        const eachRootSuite = sinon.spy().named('eachRootSuite');
        hermione.emit(events.AFTER_TESTS_READ, {eachRootSuite});

        assert.calledOnce(eachRootSuite);
    });

    it('should do nothing if disabled', () => {
        const hermione = mkHermioneStub();

        plugin(hermione, {enabled: false});

        const eachRootSuite = sinon.spy().named('eachRootSuite');
        hermione.emit(events.AFTER_TESTS_READ, {eachRootSuite});

        assert.notCalled(eachRootSuite);
    });

    [
        'beforeEach',
        'afterEach'
    ].forEach((hookName) => {
        it(`should set global ${hookName} hook to each root suite`, () => {
            const hook = sinon.spy().named(hookName);

            const hermione = mkHermioneStub();
            plugin(hermione, {[hookName]: hook});

            const suite = stubSuite();
            const eachRootSuite = (cb) => cb(suite);
            hermione.emit(events.AFTER_TESTS_READ, {eachRootSuite});

            assert.calledOnceWith(suite[hookName], hook);
        });

        it(`should not set global ${hookName} hook if no hook set in config`, () => {
            const hermione = mkHermioneStub();
            plugin(hermione);

            const suite = stubSuite();
            const eachRootSuite = (cb) => cb(suite);
            hermione.emit(events.AFTER_TESTS_READ, {eachRootSuite});

            assert.notCalled(suite[hookName]);
        });
    });
});
