var hw = process.binding('hw');
var util = require('util');
var events = require('events');

/*
 One function to send an animation to Tessel.
 Data gets sent on the GPIO bank's G4
*/

function Neopixel() {
  this.animate = function(numPixels, animationData, callback) {
    // When we finish sending the animation
    process.once('neopixel_animation_complete', function animationComplete() {
      // Emit an end event
      this.emit('end');
      // If there is a callback
      if (callback) {
        // Call it
        callback();
      }
    }.bind(this));

    // Send the animation
    console.log('animation with length', numPixels, animationData.length);
    hw.neopixel_animation_buffer(numPixels * 3, animationData);
  } 
}

util.inherits(Neopixel, events.EventEmitter);

module.exports = Neopixel;

console.warn("Please make sure you've uploaded a neopixel build to your Tessel.");
console.warn("You can currently find it at https://s3.amazonaws.com/builds.tessel.io/custom/neopixel.bin");
console.warn("Plug in your neopixel data line to G4 on the GPIO port. Connect GND on Tessel to both black GND wires from Neopixel");