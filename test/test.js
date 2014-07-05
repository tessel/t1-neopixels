// ... It's a visual test
var Neopixels = require('../');

var neopixels = new Neopixels();

neopixels.on('end', function() {
  neopixels.animate(100, Buffer.concat(tracer(100)));
});

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

neopixels.animate(100, Buffer.concat(tracer(100)));

