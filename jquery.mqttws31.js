/*******************************************************************************
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * and Eclipse Distribution License v1.0 which accompany this distribution. 
 *
 * The Eclipse Public License is available at 
 *    http://www.eclipse.org/legal/epl-v10.html
 * and the Eclipse Distribution License is available at 
 *   http://www.eclipse.org/org/documents/edl-v10.php.
 *
 * Author:
 *    Kristopher Clark
 *
 * Notes:
 *	  This plugin requires mqttws31.js which can be found at this location:
 *	  http://www.eclipse.org/paho/clients/js/
 *	  This plugin maintains the same license as the Paho project that this
 *    plugin is based on.
 *******************************************************************************/

var client;
var topic;

function onConnect() {
	client.subscribe(topic);
}

function onConnectionLost(responseObject) {
	console.log(responseObject.errorMessage);
}

function onMessageArrived(message) {
	console.log(message.payloadString);
}

(function ( $ ) {
	// Load additional JS files
	$.holdReady(true);
	$.getScript("/mqtt/js/mqttws31.js")
		.done(function(script, textStatus) {
			console.log("mqttws31.js: loaded");
			
			$.fn.extend({				
				mqttOptions: mqttSettings = {
					clientID : "JQuery Plugin",
					host	 : "localhost",
					port	 : "6500",
					topic	 : "hello/world",
					client  : null
				},
				
				mqttMessageArrived: function(message) {
					console.log(message.payloadString);
				},
				
				mqttConnectionLost: function(responseObject) {
					console.log(responseObject.errorMessage);
				},
				
				mqttOnConnect: function() {
					console.log("Connected!");
					
					this.mqttOptions.client.subscribe(this.mqttOptions.topic);
				},
				
				pahoMqttClient: function( options ) {
					var message;
					
					this.mqttOptions.clientID = options.clientID;
					this.mqttOptions.host     = options.host;
					this.mqttOptions.port     = options.port;
					this.mqttOptions.topic    = options.topic;
					
					topic = this.mqttOptions.topic;
					
					client = new Paho.MQTT.Client(this.mqttOptions.host, Number(this.mqttOptions.port), this.mqttOptions.clientID);
					client.onConnectionLost = onConnectionLost;
					
					client.onMessageArrived = function(message) {
						console.log(message.payloadString);
						
						options.callback(message.payloadString);
					};
					
					client.connect({onSuccess:onConnect});
					
					return message;
				}
			});
			
			$.holdReady(false);
		})
			.fail(function(jqxhr, settings, exception) {
				console.log("mqttws31.js: failed");
				$.holdReady(false);
	});	 
}( jQuery ));