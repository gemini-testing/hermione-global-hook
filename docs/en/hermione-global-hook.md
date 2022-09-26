# hermione-global-hook

## Overview

Use the [hermione-global-hook][hermione-global-hook] plugin to bring out the common logic from your tests into special handlers for `beforeEach` and `afterEach` hooks.

Often, before running the next hermione test, you need to do some preliminary setup, for example:
* clear all cookies;
* clean up your local storage;
* initialize some test's common variable.

In order not to repeat these actions in each test, you can describe them in the plugin settings as an async-function for the `beforeEach` hook.

Similarly, after completing the basic checks in the hermione test, you may want to always check for errors in the client code, the triggering of the necessary metrics, etc.

In order not to repeat these actions in each test, you can describe them in the plugin settings as an async-function for the `afterEach` hook.

## Install

```bash
npm install -D hermione-global-hook
```

## Setup

Add the plugin to the `plugins` section of the `hermione` config:

```javascript
module.exports = {
    plugins: {
        'hermione-global-hook': {
            beforeEach: async function() {
                await this.browser.deleteCookie(); // Say, we want to always clear cookies before running a test
            },
            afterEach: async function() {
                await this.browser.execute(function() {
                    try {
                        localStorage.clear(); // And always clean up the localStorage after the test is completed
                    } catch (e) { }
                });
            }
        },

        // other hermione plugins...
    },

    // other hermione settings...
};
```

### Description of configuration parameters

| **Parameter** | **Type** | **Default&nbsp;value** | **Description** |
| :--- | :---: | :---: | :--- |
| enabled | Boolean | true | Enable / disable the plugin. |
| beforeEach | Function | null | Asynchronous function that will be executed before running each test. |
| afterEach | Function | null | Asynchronous function that will be executed after each test is completed. |

## Useful links

* [hermione-global-hook plugin sources][hermione-global-hook]
* [browser.deleteCookie command](https://webdriver.io/docs/api/webdriver/#deletecookie)
* [browser.execute command](https://webdriver.io/docs/api/browser/execute)
* [browser.executeAsync command](https://webdriver.io/docs/api/browser/executeAsync)

[hermione-global-hook]: https://github.com/gemini-testing/hermione-global-hook
