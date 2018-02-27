BLE Proximity-based Switch
====================

Switches on a relay when an authorized BLE device is in range. You get to specify the BLE device(s) you want to activate the switch– I'll show you how in the [Code Setup](#code-setup) instructions.

This could be used to turn lights/audio/heaters/whatever on and off based on the presence of people's devices. For example, I could add the device IDs for the smartphones of everyone in my office, and have the office turn on when the first one of us arrives in the morning, and off when everyone has left.

## Materials

* [Tessel](https://www.sparkfun.com/products/13841?ref=tessel.io)
* [Bluetooth Low Energy USB Dongle](http://amzn.to/1Tz7yoa)
* [Relay Module](https://www.seeedstudio.com/Tessel-Relay-Module-p-2309.html)
* Something to plug into the relay that you want switched on or off– here's the silly [siren light](http://amzn.to/2BUa1cF) I used.
* One or more BLE devices that can advertise– I used a Myo; you could use a smartphone, another Tessel BLE module, or any number of other cool BLE devices.

## Hardware setup

1. Always unplug power (including USB power) before you do anything involving wires.
1. I'm assuming you're starting with a simple two-wire plug, like the one for a cheap desk lamp or space heater. Cut through one side of the cord. Be careful not to cut the other side of the cord; that insulation is important!
  ![](https://lh3.googleusercontent.com/-CemLjAebfr0/VIDmJTVSr-I/AAAAAAAALV4/jtebCw4Q_Ro/w828-h466-no/20141204_100235.jpg)
1. Use wire strippers or scissors to expose the wires within the cut side of the cord. You want about a centimeter exposed.
  ![](https://lh6.googleusercontent.com/-3cbTeMvu7EE/VIDmKSzDN9I/AAAAAAAALWo/eZnKGvjpMw0/w828-h466-no/20141204_100411.jpg)
1. Using a screwdriver or a pen to press down on the tabs, insert both exposed copper ends into the two sides of Relay 1 on the Relay Module.
1. Plug in the Relay Module to Port B and the BLE dongle to either USB port (I used the upper one).
1. You may now plug in power for the relay-switched thing and USB power to your computer for the Tessel.

## Code setup

1. Clone this repo.
1. From inside the folder of the cloned repo, `tessel run index.js` to run the code.
1. Set a BLE device to advertising– say, a Myo, an August lock, a Fitbit, or your (fairly new) BLE-enabled laptop or smartphone.
1. Check the console– it's scanning for your device! If it sees it, it should print out a message that it has discovered an unauthorized device, and the ID of that device. Copy the device ID into the `acceptedDevices` list in index.js to authorize that device.
1. Stop the code and run it again. Now, your device is authorized, and its presence will switch the relay on! Stop your device from advertising or move it out of range to switch the relay off.
1. If you're satisfied and want your device to run long-term on a battery, run `t2 push index.js` to deploy the code. It will now start whenever you plug it in to power.

## LED interaction
To make it easier to run offline, LEDs give some status updates:

* The blue LED turns on when BLE is scanning
* The red LED turns on if no authorized devices are found/relay switch is open (device off)
* The green LED turns on if an authorized device is found/relay switch is closed (device on)

## Customizing

* Feel free to add as many authorized devices as you want to the acceptedDevices array in index.js.
* I have this polling every five seconds, because reactions that fast look great in a demo setting. But if you wanted to deploy this in real life, you would probably want to make the polling time quite a bit longer to save power.
* If you want to use this long-term, you can run it from a battery, wall power, a solar charger, etc. according to [the bottom of this page](http://tessel.github.io/t2-start/blinky.html).
