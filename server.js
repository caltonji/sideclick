var express = require('express');
var app = express();

var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the
// twilio back end
var client = new twilio.RestClient('AC2dceb711b11dc52eab8dcba69ef9bc15', 'e6bb4d3e089d38d917b0b144af94b453');

var sendMessage = function() {
  console.log("yo");
    client.sms.messages.create({
        to:'+12245672736',
        from:'7082942538',
        body:'Test, ignore.'
    }, function(error, message) {
        // The HTTP request to Twilio will run asynchronously. This callback
        // function will be called when a response is received from Twilio
        // The "error" variable will contain error information, if any.
        // If the request was successful, this value will be "falsy"
        if (!error) {
            // The second argument to the callback will contain the information
            // sent back by Twilio for the request. In this case, it is the
            // information about the text messsage you just sent:
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);

            console.log('Message sent on:');
            console.log(message.dateCreated);
            // res.send(message);
        } else {
            console.log('Oops! There was an error.');
        }
    });
};

var makeCall = function() {
    //This REST call using the master/default account for the client...
    client.makeCall({
        to:'+18477294512',
        from:'+12245672736',
        url:'http://example.com/someTwiml.php'
    }, function(err, call) {
        if (err) {
            console.log({err : err});
        } else {
            console.log('This call\'s unique ID is: ' + call.sid);
            console.log('This call was created at: ' + call.dateCreated);
        }
    });
}

app.get('/', function (req, res) {
    sendMessage();
    res.send();
});



app.listen(3003, function () {
  console.log("Started server on 3003");
});