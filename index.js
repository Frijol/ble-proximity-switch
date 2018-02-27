// Set authorized devices
acceptedDevices = [
  '105.105.60.123.235.203'
];

// Local vars
var noneFound; // var name for timeout
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

//   // When a device is discovered
//   noble.on('discover', function(peripheral) {
//     deviceID = peripheral.address._str;
//     if(acceptedDevices.indexOf(deviceID) > -1) {
//       console.log('Authorized device in range.', deviceID);
//       noble.stopScanning();
//       clearTimeout(noneFound);
//       if(!authorized) {
//         authorize();
//       }
//       // Check for changes
//       poll();
//     } else {
//       console.log('Unauthorized device discovered.', deviceID);
//     }
//   });
//
//   // Scan for devices regularly
//   function poll() {
//     setTimeout(scan, 5000);
//   }
//
//   // Check and see if authed devices in range
//   function scan () {
//     console.log('Scanning...');
//     ble.startScanning();
//     noneFound = setTimeout(function () {
//       ble.stopScanning();
//       console.log('No authorized BLE devices in range.');
//       if(authorized) {
//         deauthorize();
//       }
//       // Check for changes
//       poll();
//     }, 5000);
//   }
//
//   function authorize () {
//     authorized = true;
//     relay.turnOn(1);
//     console.log('authorized:', authorized);
//   }
//
//   function deauthorize () {
//     authorized = false;
//     relay.turnOff(1);
//     console.log('authorized:', authorized);
//   }
// });
