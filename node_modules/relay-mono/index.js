// Copyright 2014 Technical Machine, Inc. See the COPYRIGHT
// file at the top-level directory of this distribution.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// http://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or http://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.

var util = require('util');
var events = require('events');

var invalidChannel = 'Invalid relay channel. Expected 1 or 2.';

function isInvalidChannel(channel) {
	return channel !== 1 && channel !== 2;
}

function Relay(hardware, callback) {
	// Save the port
	this.hardware = hardware;

	// Set the gpios as output
	this.hardware.digital[0].output(false);
	this.hardware.digital[1].output(false);
	this.hardware.digital[2].output(false);

	// The relays are open by default
	this.currentStates = [false, false];

	// Emit the ready event
	setImmediate(function() {
		this.emit('ready');
		callback && callback(null, this);
	}.bind(this));
}

util.inherits(Relay, events.EventEmitter);

Relay.prototype._setValue = function(channel, value, callback) {

	if (isInvalidChannel(channel)) {
		return callback && callback(new Error(invalidChannel));
	}
	else {
		// Get the relay
		var relay = this.hardware.digital[channel - 1];
		// Set the value of that gpio
		relay.write(value);

		// Set our current state vars
		this.currentStates[channel -1] = (value ? true : false);

		// Call the callback
		if (callback) {
			callback();
		}
		// Set the event
		setImmediate(function() {
			this.emit('latch', channel, value);
		}.bind(this));
	}
};

// Gets the state of the specified relay channel
Relay.prototype.getState = function(channel, callback) {
	if (isInvalidChannel(channel)) {
		return callback && callback(new Error(invalidChannel));
	}
	else {
		callback && callback(null, this.currentStates[channel - 1]);
	}
};

Relay.prototype.setState = function(channel, state, callback) {
	this._setValue(channel, state, callback);
};

// Switches the state of the specified relay channel: on if it's off; off if it's on
Relay.prototype.toggle = function(channel, callback) {
	this.getState(channel, function gotState(err, state) {
		if (err) {
			return callback && callback(err);
		}
		else {
			this._setValue(channel, !state, callback);
		}
	}.bind(this));
};

// Switches off the specified relay channel
Relay.prototype.turnOff = function(channel, delay, callback) {
	this._setValue(channel, false, function (err) {
		if (typeof delay == 'function') {
			delay(err);
		} else {
			setTimeout(callback, delay, err);
		}
	});
};

// Switches on the specified relay channel
Relay.prototype.turnOn = function(channel, delay, callback) {
	this._setValue(channel, true, function (err) {
		if (typeof delay == 'function') {
			delay(err);
		} else {
			setTimeout(callback, delay, err);
		}
	});
};

function use(hardware, callback) {
	return new Relay(hardware, callback);
}

exports.use = use;
exports.Relay = Relay;
