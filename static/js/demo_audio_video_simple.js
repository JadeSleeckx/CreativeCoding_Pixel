var selfEasyrtcid = "";

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


// Variable for webcam

function setup() {
    createCanvas(400, 400);
    // Set the pixel density to 1
    pixelDensity(1);
    // Get the webcam feed
    callerVideo = createCapture(VIDEO);
    // Hide the DOM element for the image <video>
    callerVideo.hide();
    noStroke();
}

function draw() {
    // Get the caller video element
    var callerVideo = document.getElementById('callerVideo');
    
    // Create a new offscreen canvas to draw the pixels on
    var canvas = document.createElement('canvas');
    canvas.width = callerVideo.videoWidth;
    canvas.height = callerVideo.videoHeight;
    
    // Draw the current video frame onto the offscreen canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(callerVideo, 0, 0, canvas.width, canvas.height);
    
    // Get the pixel data from the offscreen canvas
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Loop through every 10th x and 10th y location
    for (var x = 0; x < canvas.width; x += 10) {
      for (var y = 0; y < canvas.height; y += 10) {
            // Calculate the index of the current pixel in the imageData array
            var index = (x + y * imageData.width) * 4;
        
            // Get the brightness of the pixel (average of R, G, and B values)
            var brightness = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
        
            // Set the fill color to the brightness value
            fill(brightness);
        
            // Draw a 10x10 rectangle at the current x and y location
            rect(x, y, 10, 10);
        }
    }
}
  
  
  /*
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
       rect(x, y, 10, 10);
     }
    }    
  }
  */