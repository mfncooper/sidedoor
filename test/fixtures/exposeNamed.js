var sidedoor = require("../../lib/sidedoor.js");

function exposee() {
    return "-exposed-";
}

sidedoor.expose(module, "mygroup", {
    exposee: exposee
});
