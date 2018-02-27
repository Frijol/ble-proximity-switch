var tessel = require('tessel');
var relayDriver = require('../');
var relayPort = tessel.port.A;
var testPort = tessel.port.B;

var pinout = testPort.digital[0];
var pinin = testPort.digital[1];

var relay = relayDriver.use(relayPort);

console.log('1..11');

relay.on('ready', function () {
  console.log('# ready');
  console.log('ok');

  var channel = 1;
  var boundOff = relay.turnOff.bind(relay);
  var boundOn = relay.turnOn.bind(relay);

  setup(function() {
    testHelper(boundOff, channel, 1, function() {
      testHelper(boundOn, channel, 0, function() {
        testHelper(boundOff, channel, 1, function() {
          pinout.write(1, function() {
            testHelper(boundOn, channel, 1);
          });
        });
      });
    });
  });

  relay._setValue(0, 1, function(error) {
    console.log(error !== null ? 'ok' : 'not ok');
  });

  relay._setValue(3, 1, function(error) {
    console.log(error !== null ? 'ok' : 'not ok');
  });

  relay.getState(0, function(error) {
    console.log(error !== null ? 'ok' : 'not ok');
  });

  relay.getState(3, function(error) {
    console.log(error !== null ? 'ok' : 'not ok');
  });

  relay.getState(1, function(error) {
    console.log(error === null ? 'ok' : 'not ok');
  });

  relay.getState(2, function(error) {
    console.log(error === null ? 'ok' : 'not ok');
  });
});

function setup(cb) {
  pinout.output();
  pinin.input();
  pinout.write(false, cb);
}

function testHelper(relayFunc, channel, expectedValue, cb) {
  var timeout = 1000;

  relayFunc(channel, timeout, function(err) {
    if (err) {
      console.log('not ok', err);
      return cb && cb();
    }
    else {
      pinin.read(function(err, value) {
        if (err) {
          console.log('not ok', err);
          return cb && cb();
        }
        else {
          console.log('# in', value);
          console.log(value == expectedValue ? 'ok' : 'not ok');
          return cb && cb();
        }
      });
    }
  })
}

relay.on('latch', function(channel, value) {
  console.log('# latch on channel ' + channel + ' switched to', value);
});
