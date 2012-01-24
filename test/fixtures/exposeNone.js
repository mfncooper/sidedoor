var sidedoor = require("../../lib/sidedoor.js");

function group1fn() {
    return "-group1fn-exposed-";
}

function group2fn() {
    return "-group2fn-exposed-";
}

sidedoor.expose(module, "mygroup1", {
    group1fn: group1fn
});

sidedoor.expose(module, "mygroup2", {
    group2fn: group2fn
});
