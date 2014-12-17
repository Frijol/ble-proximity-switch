console.log('Initializing, please wait...');

// Set up hardware
var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

// Set authorized device
acceptedDevices = [
  "105.105.60.123.235.203"
];

ble.on('ready', function(err) {
  console.log('Scanning...');
  ble.startScanning();
});

ble.on('discover', function(peripheral) {
  deviceID = peripheral.address._str.toString();
  console.log("Discovered peripheral!", deviceID);
  if(acceptedDevices.indexOf(deviceID) > -1) {
    console.log('Device accepted.');
  } else {
    console.log('Unrecognized device.');
  }
});
