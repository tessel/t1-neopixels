module.exports = require('./lib/neopixels');

console.warn("Please make sure you've uploaded a neopixel build to your Tessel.");
console.warn("You can currently find it at https://s3.amazonaws.com/builds.tessel.io/custom/neopixel.bin");
console.warn("Plug in your neopixel data line to G4 on the GPIO port. Connect GND on Tessel to both black GND wires from Neopixel");