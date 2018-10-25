# hermione-global-hook

Plugin for [hermione](https://github.com/gemini-testing/hermione), which adds ability to specify global beforeEach and afterEach hooks.
More info about hermione plugins in [hermione](https://github.com/gemini-testing/hermione#plugins).

## Installation

```bash
$ npm install hermione-global-hook
```

## Configuration

In hermione config:

```js
module.exports = {
    // ...

    plugins: {
        'hermione-global-hook': {
            enabled: true, // by default
            beforeEach: function() {
                // do some staff before each test
            },

            afterEach: function() {
                // do some staff after each test
            }
        }
    },

    // ...
};
```
