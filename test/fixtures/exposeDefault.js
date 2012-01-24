var sidedoor = require("../../lib/sidedoor.js");

function exposee() {
    return "-exposed-";
}

sidedoor.expose(module, {
    exposee: exposee
});
