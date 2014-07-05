var Neopixel = require('../');

var neopixel = new Neopixel();


neopixel.on('end', function() {
  neopixel.animate(100, Buffer.concat(tracer(100)));
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

neopixel.animate(100, Buffer.concat(tracer(100)));

