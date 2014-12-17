BLE Proximity-based Switch
====================

Switches on a relay when an authorized BLE device is in range. You get to specify the BLE device(s) you want to activate the switch– I'll show you how in the [Code Setup](#code-setup) instructions.

This could be used to turn lights/audio/heaters/whatever on and off based on the presence of people's devices. For example, I could add the device IDs for the smartphones of everyone in my office, and have the office turn on when the first one of us arrives in the morning, and off when everyone has left.

## Materials

* [Tessel](//tessel.io)
* [Bluetooth Low Energy Module](//tessel.io/modules#module-ble)
* [Relay Module](//tessel.io/modules#module-relay)
* Something to plug into the relay that you want switched on or off.

## Hardware setup

1. Always unplug power (including USB power) before you do anything involving wires.
1. I'm assuming you're starting with a simple two-wire plug, like the one for a cheap desk lamp or space heater. Cut through one side of the cord. Be careful not to cut the other side of the cord; that insulation is important!
  ![](https://lh3.googleusercontent.com/-CemLjAebfr0/VIDmJTVSr-I/AAAAAAAALV4/jtebCw4Q_Ro/w828-h466-no/20141204_100235.jpg)
1. Use wire strippers or scissors to expose the wires within the cut side of the cord. You want about a centimeter exposed.
  ![](https://lh6.googleusercontent.com/-3cbTeMvu7EE/VIDmKSzDN9I/AAAAAAAALWo/eZnKGvjpMw0/w828-h466-no/20141204_100411.jpg)
1. Using a screwdriver or a pen to press down on the tabs, insert both exposed copper ends into the two sides of Relay 1 on the Relay Module.
1. Plug in the Relay Module to Port B and the BLE Module to port A.
1. You may now plug in power for the relay-switched thing and USB power to your computer for the Tessel.

## Code setup

1. Clone this repo.
1. From inside your local copy of the repo, `npm install` to install dependencies.
1. `tessel run index.js` to run the code.
1. Set a BLE device to advertising– say, a Myo, an August lock, a Fitbit, or your (fairly new) BLE-enabled laptop or smartphone.
1. Check the console– it's scanning for your device! If it sees it, it should print out a message that it has discovered an unauthorized device, and the ID of that device. Copy the device ID into the `acceptedDevices` list in index.js to authorize that device.
1. Stop the code and run it again. Now, your device is authorized, and its presence will switch the relay on! Stop your device from advertising or move it out of range to switch the relay off.

## Customizing

* I have this polling every five seconds, because reactions that fast look great in a demo setting. But if you wanted to deploy this in real life, you would probably want to make the polling time quite a bit longer to save power.
* If you want to use this long-term, you can run it from a battery, wall power, a solar charger, etc. according to [this doc](//tessel.io/modules#module-ble).
