// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var serveStatic = require('serve-static');  // serve static files
var socketIo = require("socket.io");        // web socket external module

// This sample is using the easyrtc from parent folder.
// To use this server_example folder only without parent folder:
// 1. you need to replace this "require("../");" by "require("open-easyrtc");"
// 2. install easyrtc (npm i open-easyrtc --save) in server_example/package.json

var easyrtc = require("open-easyrtc"); // EasyRTC internal module

// Set process name
process.title = "node-easyrtc";

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var app = express();
app.use(serveStatic('static', {'index': ['index.html']}));

// Start Express http server on port 8080
var webServer = http.createServer(app);

// Start Socket.io so it attaches itself to Express server
var socketServer = socketIo.listen(webServer, {"log level":1});

socketServer.on('connection', (socket) => {
    
})

const prompts = [
    'If you could swap lives with one of your friends, who would it be?',
    'What is the most important thing you have learned about yourself in the past year?',
    'What is the biggest challenge you are currently facing in your life?',
    'If you could change one thing about the world, what would it be?',
    'What is your nickname?',
    'What was your best birthday ever?',
    'If money were no object, what would you do?',
    'What is one item on your bucket list?',
    'How do you make the world a better place?',
    'What is the nicest act you secretly did for someone?',
    'How do you define success in your life.'
  
  ];
  
  function generatePrompt() {
    // Get a random prompt from the array
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const prompt = prompts[randomIndex];
  
    socketServer.emit('prompt', prompt);
  }
  

  
  
  function startTimer(duration, display) {
    var start = Date.now(),
    diff,
    minutes,
    seconds;
  
  function timer() {
  // get the number of seconds that have elapsed since 
  // startTimer() was called
    diff = duration - (((Date.now() - start) / 1000) | 0);
  
  // does the same job as parseInt truncates the float
    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;
  
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    display.textContent = minutes + ":" + seconds; 
  
  if (diff <= 0) {
  // add one second so that the count down starts at the full duration
  // example 05:00 not 04:59
  start = Date.now() + 1000;
  }
  };
  // we don't want to wait a full second before the timer starts
  timer();
  setInterval(timer, 1000);
  }

      // Call the generatePrompt function every 5 minutes
      setInterval(generatePrompt, 5 * 60 * 100);
  
      // Initialize the prompt on page load
      generatePrompt();


// 

// Cross-domain workaround presented below:
/*
socketServer.origins(function(origin, callback) {
    if (origin && ![
        'http://localhost:8080',
        '*'
    ].includes(origin)) {
        return callback('origin not allowed', false);
    }
    callback(null, true);
});
*/

easyrtc.setOption("logLevel", "debug");

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", function(socket, easyrtcid, msg, socketCallback, callback) {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function(err, connectionObj){
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});

        console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", function(connectionObj, roomName, roomParameter, callback) {
    console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
var rtc = easyrtc.listen(app, socketServer, null, function(err, rtcRef) {
    console.log("Initiated");

    rtcRef.events.on("roomCreate", function(appObj, creatorConnectionObj, roomName, roomOptions, callback) {
        console.log("roomCreate fired! Trying to create: " + roomName);

        appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
    });
});



// Listen on port 8080
webServer.listen(process.env.PORT || 8080, function () {
    console.log('listening on http://localhost:8080');
});
