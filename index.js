// Set authorized devices
acceptedDevices = [
  '105.105.60.123.235.203'
];

// Local vars
var noneFound; // var name for timeout
var authorized = false;

// Set up hardware
require('tesselate') ({
  modules: {
    A: ['ble-ble113a', 'ble'],
    B: ['relay-mono', 'relay']
  }
}, function (tessel, modules) {
  var ble = modules.ble;
  var relay = modules.relay;
  
  // Initial scan for devices
  scan();
  
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
      console.log('Unauthorized device discovered.', deviceID);
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
      ble.stopScanning();
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
    relay.turnOn(1);
    console.log('authorized:', authorized);
  }

  function deauthorize () {
    authorized = false;
    relay.turnOff(1);
    console.log('authorized:', authorized);
  }
});
