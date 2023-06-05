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
    'How do you define success in your life.',
    'What song was or do you want to be the your first dance at your wedding?',
    'What song would make the best theme music for you?',
    'What is the most irrational superstition you have?',
    'What is the weirdest food combination you enjoy?',
    'What is the stupidest thing you ever did on a dare?',
    'What is the worst date you have ever been on?',
    'Who is the most embarrassing person you had a crush on?',
    'What is your idea of the perfect day?',
    'If you could swap lives with one of your friends, who would it be?',
    'Who knows the most secrets about you?',
    'What are your must-have qualities in a best friend?',
    'If you had to get a tattoo today, what would you get?',
    'If you could have free meals for life at one fast food chain, which one would you choose?',
    'What is the most embarrassing thing your parents have ever done?',
    'What is a lie or exaggeration you said to impress a crush?',
    'What is the silliest you have ever felt?',
    'When was the last time you laughed so hard that you cried?',
    'What does your mother yell at you when she’s angry?',
    'What is a telltale sign that you are upset?',
    'What is your nickname?',
    'What is the wackiest thing you ever did to help a friend?',
    'What fictional character would you most like to be friends with?',
    'What is your favorite topic to talk about?',
    'What is your preferred method of communication?',
    'Where is your happy place?',
    'Where is your secret hideout?',
    'What would your dream house look like?',
    'Which family member are you closest to?',
    'What is a habit you picked up from your parents?',
    'What is the meanest thing you ever did to a sibling or that a sibling did to you?',
    'What was your best birthday ever?',
    'What is your most treasured possession?',
    'What three words best describe me?',
    'How did we first meet?',
    'What is your favorite memory of us together?',
    'What is something you would like to do together someday?',
    'What is one goal you have for the near future?',
    'What are you looking forward to this month?',
    'What is one fact every friend should know about you?',
    'What is the best meal you have ever eaten?',
    'What is one thing that only your closest friends and family know about you?'
  
  ];
  let prompt
  function generatePrompt() {
    // Get a random prompt from the array
    const randomIndex = Math.floor(Math.random() * prompts.length);
    prompt = prompts[randomIndex];
  
    
  }

      // Call the generatePrompt function every 5 minutes
      setInterval(generatePrompt, 2 * 60 * 1000);
  
      // Initialize the prompt on page load
      generatePrompt();

      setInterval(()=> {
        socketServer.emit('prompt', prompt);
      }, 10 * 1000);



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
