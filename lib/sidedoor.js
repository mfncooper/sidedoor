/*
 Copyrights for code authored by Yahoo! Inc. is licensed under the following
 terms:

 MIT License

 Copyright (c) 2011 Yahoo! Inc. All Rights Reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.
*/

/*
 * A library that allows the controlled exposure of functions from a module
 * without polluting the primary exports mechanism. This is useful mainly
 * when exposing test-only functions, since those functions are made available
 * to tests while being withheld from the public module API. (The functions are
 * still available to any client, but an explicit effort must be made to obtain
 * them.)
 */

var SIDEDOOR_KEY = "sidedoor",
    DEFAULT_GROUP = "default";

/*
 * Expose a set of functions from a module as a group. The group name may be
 * elided, in which case the functions are considered to be within a default
 * group.
 */
function expose(mod, group, fns) {
    // Check for a defaulted group
    if (typeof group !== "string") {
        fns = group;
        group = DEFAULT_GROUP;
    }

    if (!mod.hasOwnProperty(SIDEDOOR_KEY)) {
        mod[SIDEDOOR_KEY] = {};
    }
    mod[SIDEDOOR_KEY][group] = fns;
}

/*
 * Retrieve a set of functions from a module as a group. If the group name is
 * not specified, the default group is retrieved. If the group of functions
 * does not exist, undefined is returned.
 */
function get(modname, group) {
    var mod = require.cache[require.resolve(modname)],
        fns = null;

    if (!mod) {
        require(modname);
        mod = require.cache[require.resolve(modname)];
    }
    if (!mod) {
        throw new Error("bad stuff");
    }

    if (mod.hasOwnProperty(SIDEDOOR_KEY)) {
        fns = mod[SIDEDOOR_KEY][group || DEFAULT_GROUP];
    }

    return fns;
}

exports.expose = expose;
exports.get = get;
