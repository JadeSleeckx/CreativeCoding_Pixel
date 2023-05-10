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
