Paho-JQuery-Plugin
==================

Plugin based off of the paho mqtt client library project.

This is a JQuery plugin based on the Paho JavaScript MQTT library.  This plugin requires that you have this on your server.
Their library can be found on their website

http://www.eclipse.org/paho/clients/js/

Usage
==================
This allows you to subscribe and recieve message from an MQTT broker over websockets.  Useage is as follows:

<script type="text/javascript" src="./js/jquery.mqttws31.js"></script>

<script type="text/javascript">
	$( "pahoClient" ).pahoMqttClient({
		callback: function(message) {
			$("#myID").html(message);
		},
		
		host: 	  "localhost",
		port: 	  "6500",
		clientID: "testClient1",
		topic:	  "hello/world"
	});
});
</script>

<div id="myID"></div>

TODO:
==================
-Add sending of MQTT messages to the broker
