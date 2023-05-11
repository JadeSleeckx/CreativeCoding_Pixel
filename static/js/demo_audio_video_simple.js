var selfEasyrtcid = "";
document.getElementById('callerVideo').style.display = 'block';

function convertListToButtons (roomName, data, isPrimary) {
    clearConnectList();
    var otherClientDiv = document.getElementById('otherClients');
    for(var easyrtcid in data) {
        var button = document.createElement('button');
        button.onclick = function(easyrtcid) {
            return function() {
                performCall(easyrtcid);
            };
        }(easyrtcid);

        var label = document.createTextNode(easyrtc.idToName(easyrtcid));
        button.appendChild(label);
        otherClientDiv.appendChild(button);

        //toegevoegd button wegdoen
        otherClientDiv.removeChild(button);
    }
    //toegevoegd
    if (Object.keys(data).length === 1) {
        var otherEasyrtcid = Object.keys(data)[0];
        performCall(otherEasyrtcid);
    }
}

function connect() {
    easyrtc.setVideoDims(640,480);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
}


function clearConnectList() {
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
}

function performCall(otherEasyrtcid) {
    easyrtc.hangupAll();

    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherEasyrtcid, successCB, failureCB);
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);

    performCall(selfEasyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}

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
  
    // Display the prompt on the page
    const promptElement = document.getElementById('prompt');
    promptElement.textContent = prompt;
  }
  
  // Call the generatePrompt function every 5 minutes
  setInterval(generatePrompt, 5 * 60 * 100);
  
  // Initialize the prompt on page load
  generatePrompt();
  
  
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


// Variable for webcam
/*
function setup() {
    createCanvas(400, 400);
    // Set the pixel density to 1
    pixelDensity(1);
    // Get the webcam feed
    callerVideo = callerVideo;
    // Hide the DOM element for the image <video>
    callerVideo.hide();
    noStroke();
}
  
function draw() {
    background(220);
    // Display camera image
    image(callerVideo, 0, 0);
    // Load camera image pixels
    callerVideo.loadPixels();
    // Loop through every 10th x and 10th y location
    for(let x = 0; x < callerVideo.width; x+=10) {
        for(let y = 0; y < callerVideo.height; y+=10) {
        // Get an array of rgba values for each pixel
        // [r,g,b,a]
        let colorFromVideo = callerVideo.get(x,y);
        // Get the brightness from the rgba array
        fill( colorFromVideo );
        // Draw a 10x10 rectangle
        rect(x, y, 100, 100);
        }
    }    
}
*/