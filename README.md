BLE Proximity-based Switch
====================

Switches on a relay when an authorized BLE device is in range. You get to specify the BLE device(s) you want to activate the switch.

## Materials

* [Tessel](//tessel.io)
* [Bluetooth Low Energy Module](//tessel.io/modules#module-ble)
* [Relay Module](//tessel.io/modules#module-relay)
* Something to plug into the relay that you want switched on or off.

## Hardware setup

## Code setup

1. Clone this repo.
1. From inside your local copy of the repo, `npm install` to install dependencies.
1. `tessel run index.js` to run the code.
1. Set a BLE device to advertising– say, a Myo, an August lock, a Fitbit, or your (fairly new) BLE-enabled laptop or smartphone.
1. Check the console– it's scanning for your device! If it sees it, it should print out a message that it has discovered an unauthorized device, and the ID of that device. Copy the device ID into the `acceptedDevices` list in index.js to authorize that device.
1. Stop the code and run it again. Now, your device is authorized, and its presence will switch the relay on! Stop your device from advertising or move it out of range to switch the relay off.
