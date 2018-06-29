# hermione-global-hooks

Plugin for [hermione](https://github.com/gemini-testing/hermione), which adds ability to specify global beforeEach and afterEach hooks.
More info about hermione plugins in [hermione](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
$ npm install hermione-global-hooks --registry=http://npm.yandex-team.ru
```

## Configuration

In hermione config:

```js
module.exports = {
    // ...

    plugins: {
        'hermione-global-hooks': {
            globalBeforeEach: function() {
                // do some staff before each test
            },

            globalAfterEach: function() {
                // do some staff after each test
            }
        }
    },

    // ...
};
```
