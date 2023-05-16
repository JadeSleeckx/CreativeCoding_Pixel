
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

window.addEventListener("load", (event) => {
    const video = document.getElementById('callerVideo');
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled = false;

    video.addEventListener('timeupdate', function() {
        if(!this.paused && !this.ended) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
    }, false);

    setInterval(function() {
        video.dispatchEvent(new Event('timeupdate'));
    }, 30);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
/*
document.addEventListener('DOMContentLoaded', function() {
    let callerVideo = document.getElementById("callerVideo");
    let start = document.getElementById("start-screen");
    let loading = document.getElementById("loading-screen");
    let intro = document.getElementById("intro");
    let intro2 = document.getElementById("intro2");

    function displayVideo() {
        callerVideo = "block";
        start.start.style.display = "block";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function displayStart() {
        start.style.display = "block";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function hideStart() {
        start.style.display = "none";
            loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function displayLoading() {
        start.style.display = "none";
        loading.style.display = "block";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function hideLoading() {
        start.style.display = "none";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function displayIntro () {
        start.style.display = "none";
        loading.style.display = "none";
        intro.style.display = "block";
        intro2.style.display = "none";
    }

    function hideIntro () {
        start.style.display = "none";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }

    function displayIntro2 () {
        start.style.display = "none";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "block";
    }

    function hideIntro2 () {
        start.style.display = "none";
        loading.style.display = "none";
        intro.style.display = "none";
        intro2.style.display = "none";
    }



    function resetGame() {
        displayStart();
    }

    window.onload = function () {
        resetGame();
    };

    var socket = io();

    socket.on('prompt', function(prompt) {
        var promptElement = document.getElementById("prompt");
        promptElement.textContent = prompt;
    });


    var ws;

    var wsUri = "ws://192.168.100.1:1880/ws";
        
    function wsConnect() {
        console.log("connect", wsUri);
        ws = new WebSocket(wsUri);
        
        ws.onmessage = function (msg) {
            console.log(msg.data);
            if (msg.data === "groen") {
                hideStart();
                displayLoading();
            setTimeout(function() {
                hideLoading();
                displayIntro();
                setTimeout(function() {
                    hideIntro();
                    displayIntro2();
                    setTimeout(function() {
                        hideIntro2();
                    }, 10000);
                }, 10000);
            }, 15000);
                
            } else if (msg.data ==="rood") {
                resetGame();
                }

        }
        
            ws.onopen = function () {
                console.log("Connected");
            }
        
            ws.onclose = function () {
                console.log("Disconnected");
                // in case of lost connection tries to reconnect every 3 secs
                setTimeout(wsConnect, 3000);
            }
        
            ws.disconnect = function () {
                console.log("Disconnected");
            }
        }
        
        window.onload = wsConnect();
    });




/*
    function setup() {
        console.log('setup')
        createCanvas(400, 400);
        // Set the pixel density to 1
        pixelDensity(1);
        // Get the webcam feed
        callerVideo = new p5.MediaElement(document.getElementById('callerVideo'));
        // Hide the DOM element for the image <video>
        //callerVideo.hide();
        noStroke();
    }
      
    function draw() {

        console.log('draw')
        background(220);
        // Display camera image
        image(callerVideo, 0, 0);
        console.log(callerVideo)
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

    