#Relay
Driver for the relay-mono Tessel relay module. The hardware documentation for this module can be found [here](https://github.com/tessel/hardware/blob/master/modules-overview.md#relay).

If you run into any issues you can ask for support on the [Relay Module Forums](http://forums.tessel.io/category/relay).

###Installation
```sh
npm install relay-mono
```

###Example
```js
/*********************************************
This relay module demo toggles both relay
channels every two seconds, logging the new
values to the console upon latching.
*********************************************/

var tessel = require('tessel');
var relaylib = require('../'); 

var relay = relaylib.use(tessel.port['A']);  

// Wait for the module to connect
relay.on('ready', function relayReady () {
  console.log('Ready! Toggling relays...');
  setInterval(function toggle() {
    // Toggle relay channel 1
    relay.toggle(1, function toggleOneResult(err) {
      if (err) console.log("Err toggling 1", err);
    });
    // Toggle relay channel 2
    relay.toggle(2, function toggleTwoResult(err) {
      if (err) console.log("Err toggling 2", err);
    });
  }, 2000); // Every 2 seconds (2000ms)
});

// When a relay channel is set, it emits the 'latch' event
relay.on('latch', function(channel, value) {
  console.log('latch on relay channel ' + channel + ' switched to', value);
});
```

###Methods
&#x20;<a href="#api-relay-getState-relayChannel-callback-err-state-Gets-the-state-of-the-specified-relay-channel-true-for-on-and-false-for-off" name="api-relay-getState-relayChannel-callback-err-state-Gets-the-state-of-the-specified-relay-channel-true-for-on-and-false-for-off">#</a> relay<b>.getState</b>( relayChannel, callback(err, state) )  
Gets the state of the specified relay channel: "true" for on and "false" for off.  

&#x20;<a href="#api-relay-toggle-relayChannel-callback-err-Switches-the-state-of-the-specified-relay-channel-on-if-it-s-off-off-if-it-s-on" name="api-relay-toggle-relayChannel-callback-err-Switches-the-state-of-the-specified-relay-channel-on-if-it-s-off-off-if-it-s-on">#</a> relay<b>.toggle</b>( relayChannel, callback(err) )  
Switches the state of the specified relay channel: on if it's off; off if it's on.  

&#x20;<a href="#api-relay-turnOff-relayChannel-callback-err-Switches-off-the-specified-relay-channel" name="api-relay-turnOff-relayChannel-callback-err-Switches-off-the-specified-relay-channel">#</a> relay<b>.turnOff</b>( relayChannel, callback(err) )  
Switches off the specified relay channel.  

&#x20;<a href="#api-relay-turnOn-relayChannel-callback-err-Switches-on-the-specified-relay-channel" name="api-relay-turnOn-relayChannel-callback-err-Switches-on-the-specified-relay-channel">#</a> relay<b>.turnOn</b>( relayChannel, callback(err) )  
Switches on the specified relay channel.  

###Events
&#x20;<a href="#api-relay-on-error-callback-err-Emitted-upon-error" name="api-relay-on-error-callback-err-Emitted-upon-error">#</a> relay<b>.on</b>( 'error', callback(err) )  
Emitted upon error.  

&#x20;<a href="#api-relay-on-latch-callback-channel-state-Emitted-when-the-latch-state-boolean-on-or-off-is-changed-for-a-channel" name="api-relay-on-latch-callback-channel-state-Emitted-when-the-latch-state-boolean-on-or-off-is-changed-for-a-channel">#</a> relay<b>.on</b>( 'latch', callback(channel, state))  
Emitted when the latch state (boolean on *or* off ) is changed for a channel.  

&#x20;<a href="#api-relay-on-ready-callback-Emitted-upon-first-successful-communication-between-the-Tessel-and-the-module" name="api-relay-on-ready-callback-Emitted-upon-first-successful-communication-between-the-Tessel-and-the-module">#</a> relay<b>.on</b>( 'ready', callback() )  
Emitted upon first successful communication between the Tessel and the module.  

###License
MIT or Apache 2.0, at your option
