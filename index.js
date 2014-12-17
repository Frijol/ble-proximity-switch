console.log('Initializing, please wait...');

// Set up hardware
var tessel = require('tessel');
var blelib = require('ble-ble113a');
var ble = blelib.use(tessel.port['A']);

// Set authorized device
acceptedDevices = [
  '105.105.60.123.235.203'
];

// Local vars
var noneFound; // var name for timeout
var authorized = false;

// Initial scan for devices
ble.on('ready', function(err) {
  scan();
});

// When a device is discovered
ble.on('discover', function(peripheral) {
  deviceID = peripheral.address._str;
  if(acceptedDevices.indexOf(deviceID) > -1) {
    console.log('Authorized device in range.', deviceID);
    ble.stopScanning();
    clearTimeout(noneFound);
    if(!authorized) {
      authorize();
    }
    // Check for changes
    poll();
  } else {
    console.log('Unrecognized device discovered.', deviceID);
  }
});

// Scan for devices regularly
function poll() {
  setTimeout(scan, 5000);
}

// Check and see if authed devices in range
function scan () {
  console.log('Scanning...');
  ble.startScanning();
  noneFound = setTimeout(function () {
    console.log('No authorized BLE devices in range.');
    if(authorized) {
      deauthorize();
    }
    // Check for changes
    poll();
  }, 5000);
}

function authorize () {
  authorized = true;
  console.log('authorized:', authorized);
}

function deauthorize () {
  authorized = false;
  console.log('authorized:', authorized);
}
