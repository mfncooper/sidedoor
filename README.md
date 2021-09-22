# Sidedoor - Exposing a secondary API for your Node.js modules

![status](https://img.shields.io/badge/status-archive-red)

As you've written unit tests for your Node.js modules, you've almost certainly
been forced to think about exposing some internal methods for the sole purpose
of enabling more comprehensive tests or verifying such tests. You've wrestled
with polluting the public API of your module with functions you really don't
want people to see, let alone depend on.

What if, instead, you could expose a secondary API for your module, such that
the additional methods are available to your tests, but without polluting the
public API?

This is just what Sidedoor enables. In your module, a simple call to Sidedoor
exposes whatever secondary API you need, while a similarly simple call from a
client module provides access to that secondary API.

## Installation

Just use npm:

    npm install sidedoor

## Exposing an API

You expose your secondary API by telling Sidedoor which functions to expose,
and, optionally, the name under which you want to expose them. For example:

    function doSomethingImportant() {
        ...
    }

    function doSomethingTestRelated() {
        ...
    }

    // Expose the primary API
    module.exports = {
        doSomething: doSomethingImportant
    };

    // Expose the secondary API
    sidedoor.expose(module, 'test', {
        testHelper: doSomethingTestRelated
    });

Here, in addition to our module's primary API, we've exposed a secondary API
named 'test' that contains the single function `doSomethingTestRelated` exposed
under the name `testHelper`.

The arguments to `expose` are as follows:

* _module_, the module from which you are exposing the secondary API. This will
almost always be just 'module'.
* _name_, the name of the secondary API you are exposing. If omitted, a default
unnamed API is exposed.
* _exports_, the equivalent of the `exports` object, being the API that is to
be exposed.

Note that, because a secondary API may be named, it is possible to expose any
number of such APIs from any module.

## Accessing an API

You access a secondary API by asking Sidedoor to obtain it for you, optionally
providing the name of the API you want, and then simply calling it as you would
a regularly exported API. For example, :

    var public_api = require('my_module'),
        test_api = sidedoor.get('my_module', 'test');

    // Call the public API as normal
    public_api.doSomething();

    // Call the secondary API obtained via Sidedoor
    test_api.testHelper();

The arguments to `get` are as follows:

* _modpath_, the name or path of the module for which you want to access the API.
This is the same as what you would pass to `require` to obtain the primary API.
* _name_, the name of the secondary API you are accessing. If omitted, the default
unnamed API is obtained.

## License

Sidedoor is licensed under the [MIT License](http://github.com/mfncooper/sidedoor/raw/master/LICENSE).
