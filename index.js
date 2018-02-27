/////////////////////////
//--- Configuration ---//
/////////////////////////

// Authorized devices:
// Run the code initially, UUIDs of discoverable devices will print in the console
// Copy the UUID of any device you want to authorize into this array
// It can be helpful to get into an area where there's only one BLE device around for this step!
acceptedDevices = [
  '48b764e10fc2',
  '2c41a14a9a4e'
];

// Timeout:
// How long should it wait between checking for authorized devices?
// Set longer if there are a lot of BLE devices, to make sure it has time to find any authorized devices.
const timeout = 7000; // milliseconds

/////////////////////////////
//--- You shouldn't need to mess with anything below this part! ---//
////////////////////////////

// Local vars
var noneFound; // var name for timeout function
var authorized = false;

// Set up hardware
var noble = require('noble');
var tessel = require('tessel');
var relaylib = require('relay-mono');
var relay = relaylib.use(tessel.port['B']);

// Notify when hardware ready
relay.on('ready', function () {
  console.log('Relay ready...');
});

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    console.log('BLE ready, beginning to scan...');
    // Begin scanning for BLE peripherals
    noble.startScanning();
  }
});

// When a device is discovered
noble.on('discover', function(peripheral) {
  deviceID = peripheral.uuid;
  if(acceptedDevices.indexOf(deviceID) > -1) {
    console.log('Authorized device in range:', deviceID);
    noble.stopScanning();
    clearTimeout(noneFound);
    if(!authorized) {
      authorize();
    }
    // Check for changes
    poll();
  } else {
    console.log('Unauthorized device discovered:', deviceID);
  }
});

// Scan for devices regularly
function poll() {
  setTimeout(scan, timeout);
}

// Check and see if authed devices in range
function scan () {
  console.log('Scanning...');
  noble.startScanning();
  noneFound = setTimeout(function () {
    noble.stopScanning();
    console.log('No authorized BLE devices in range.');
    if(authorized) {
      deauthorize();
    }
    // Check for changes
    poll();
  }, timeout);
}

// Turn on relay for authorized device present
function authorize () {
  authorized = true;
  relay.turnOn(1, function () {
    console.log('authorized:', authorized);
  });
}

// Turn off relay when no authorized device present
function deauthorize () {
  authorized = false;
  relay.turnOff(1, function () {
    console.log('authorized:', authorized);
  });
}
