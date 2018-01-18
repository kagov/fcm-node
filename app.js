var express = require('express'),
    expressLogging = require('express-logging'),
    logger = require('logops');

var app = express();
app.use(expressLogging(logger));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var firebase = require("./firebase");

var server = require('http').Server(app);

var port = 3000
server.listen(port);
console.log('Listening on port '+port);

app.post('/notify', function(req,res,next) {

    /**
     * request is of the format
     * {
	"title": "My title",
	"body": "My message body",
	"fcmToken": "your_device_token"  # can also be an array if you want to send it to multiple devices
}
     */
    var notificationData = req.body;
    firebase.sendNotification(notificationData); // add a callback if you want to
    next();

}) ;