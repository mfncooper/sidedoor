/*
 * Copyright (c) 2011 Yahoo! Inc. All rights reserved.
 */

var testCase = require('nodeunit').testCase,
    sidedoor = require('../lib/sidedoor');

function fixtureMod(name) {
    return "../test/fixtures/" + name;
}

module.exports = testCase({

    "when nothing is exposed": testCase({
        "getting the default group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeNone"));
            test.strictEqual(sd, undefined);
            test.done();
        },
        "getting a named group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeNone"), "mygroup");
            test.strictEqual(sd, undefined);
            test.done();
        }
    }),

    "when the default group is exposed": testCase({
        "getting the default group returns the functions": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeDefault"));
            test.notEqual(sd, undefined);
            test.equal(typeof sd, "object");
            test.equal(typeof sd.exposee, "function");
            test.equal(sd.exposee(), "-exposed-");
            test.done();
        },
        "getting a named group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeDefault"), "mygroup");
            test.strictEqual(sd, undefined);
            test.done();
        }
    }),

    "when a named group is exposed": testCase({
        "getting the default group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeNamed"));
            test.strictEqual(sd, undefined);
            test.done();
        },
        "getting the exposed group returns the functions": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeNamed"), "mygroup");
            test.notEqual(sd, null);
            test.equal(typeof sd, "object");
            test.equal(typeof sd.exposee, "function");
            test.equal(sd.exposee(), "-exposed-");
            test.done();
        },
        "getting another named group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeNamed"), "another");
            test.strictEqual(sd, undefined);
            test.done();
        }
    }),

    "when multiple groups are exposed": testCase({
        "getting the default group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeMultiple"));
            test.strictEqual(sd, undefined);
            test.done();
        },
        "getting an exposed group returns the functions": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeMultiple"), "mygroup1");
            test.notEqual(sd, null);
            test.equal(typeof sd, "object");
            test.equal(typeof sd.group1fn, "function");
            test.equal(sd.group1fn(), "-group1fn-exposed-");
            test.done();
        },
        "getting another exposed group returns the functions": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeMultiple"), "mygroup2");
            test.notEqual(sd, null);
            test.equal(typeof sd, "object");
            test.equal(typeof sd.group2fn, "function");
            test.equal(sd.group2fn(), "-group2fn-exposed-");
            test.done();
        },
        "getting another named group returns undefined": function (test) {
            var sd = sidedoor.get(fixtureMod("exposeMultiple"), "another");
            test.strictEqual(sd, undefined);
            test.done();
        },
        "functions are exposed only in their assigned groups": function (test) {
            var sd1 = sidedoor.get(fixtureMod("exposeMultiple"), "mygroup1"),
                sd2 = sidedoor.get(fixtureMod("exposeMultiple"), "mygroup2");
            test.notEqual(sd1, null);
            test.notEqual(sd2, null);
            test.equal(typeof sd1, "object");
            test.equal(typeof sd2, "object");
            test.equal(typeof sd1.group1fn, "function");
            test.equal(typeof sd2.group2fn, "function");
            test.equal(typeof sd1.group2fn, "undefined");
            test.equal(typeof sd2.group1fn, "undefined");
            test.done();
        }
    })

});
