#Neopixels

[Neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) are strands of individually addressable RGB LEDs, made by Adafruit. Neopixels consist of individual [WS2812B](http://www.adafruit.com/datasheets/WS2812B.pdf) chips which are also sold by other vendors like [SeeedStudio](http://www.seeedstudio.com/depot/Digital-RGB-LED-FlexiStrip-60-LED-1-Meter-p-1666.html?cPath=81_79) They're fantastic for creating light shows, art installations, mood lighting, and a ton of other applications. 

This library is rather sparse at the moment and most of the functionality lies within a driver written in the firmware. It assumes a single strand of LEDs connected to pin G4 on the GPIO bank and RGB leds with a 800kHz signal. 

##Installation

Make sure you have firmware build `0.1.16` or later (```tessel board --version```) installed on Tessel. 

Then, install this library:
`npm install neopixels`

Then connect the circuit. You'll need a separate power source because these LEDs require **a lot** of juice. Check out [Adafruit's Powering Guide](https://learn.adafruit.com/adafruit-neopixel-uberguide/power) for the best advice. Best practice is to power the neopixels with 3.7V when using Tessel (since it is a 3.3V MCU) but 5V has worked fine in practice. Connect the data wire to G4 on Tessel's GPIO bank and connect GND on Tessel to both GND wires from the neopixels.

##Usage

Example:
```.js
// Import the neopixels library
var Neopixels = require('../');

// Make an instance of the strip
var neopixels = new Neopixels();

// When an animation completes
neopixels.on('end', function() {
  // Start the animation again
  neopixels.animate(100, Buffer.concat(tracer(100)));
});

/* 
* Start an animation!
* First argument is number of pixels per animation frame (usually the number of pixels in your strip)
* The second argument is the animation data
* The third optional argument is a callback on completion

* The library will automatically split the animation up
* into the appropriate number of animation frames
* based on the size of each frame (first argument)
*/
neopixels.animate(100, Buffer.concat(tracer(100)));


// An example animation
function tracer(numLEDs) {
  var trail = 5;
  var arr = new Array(numLEDs);
  for (var i = 0; i < numLEDs; i++) {
    var buf = new Buffer(numLEDs * 3);
    buf.fill(0);
    for (var col = 0; col < 3; col++){
      for (var k = 0; k < trail; k++) {
        buf[(3*(i+numLEDs*col/3)+col+1 +3*k)] = 0xFF*(trail-k)/trail;
      }
    }
    arr[i] = buf;
  }
  return arr;
}

```

##Contributions

This library could use a ton of help! If you're going to help, you'll need to get your hands dirty with some C in our firmware. Check out the [firmware](https://github.com/tessel/firmware/blob/master/src/addons/neopixel.c) and you'll need to be able to [compile your own firmware](https://github.com/tessel/firmware/tree/neopixel#compiling).

Email me at jon@technical.io if you're interested.

Things that need doing:
- {EASY} Making it possible to configure to run with a 400kHz signal as well.
- {EASY} Making it possible to configure which pwm pin (G4, G5, or G6) the data is output on.
- {MEDIUM [Non-firmware]} Add more example animations to the node module.
- {HARD} Enable 3x the frame rate by allowing 3 animations to be passed in and outputting animations on all 3 pwm pins (G4, G5, and G6 on the GPIO bank).




