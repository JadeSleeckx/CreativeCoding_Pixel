let container = document.getElementById("demoContainer");
let start = document.getElementById("start-screen");
let loading = document.getElementById("loading-screen");
let intro = document.getElementById("intro");
let intro2 = document.getElementById("intro2");
let callerVideo = document.getElementById("callerVideo");

function displayVideo() {
    start.style.display = "none";
    loading.style.display = "none";
    intro.style.display = "none";
    intro2.style.display = "none";
    callerVideo.muted = false;
}

function displayStart() {
    start.style.display = "block";
    loading.style.display = "none";
    intro.style.display = "none";
    intro2.style.display = "none";
    container.style.opacity = "0%";
    callerVideo.muted = true;
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


function displayContainer () {
    start.style.display = "none";
    loading.style.display = "none";
    intro.style.display = "none";
    intro2.style.display = "none";
    container.style.opacity = "100%";
    callerVideo.muted = false;
}

function resetGame() {
    displayStart();
}



var socket = io();

socket.on('prompt', function(prompt) {
    var promptElement = document.getElementById("prompt");
    promptElement.textContent = prompt;
});

socket.on('raspberry', function(data) {
    //
});


var ws;

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('ip');
//eerst :1880
var wsUri = "wss://192.168.100.1:443/ws";

if (myParam == "3") {
    wsUri = "wss://192.168.100.3:443/ws";
}
/*var wsUri = "ws://127.0.0.1/ws";*/
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
                    Audio.muted =false;
                    displayContainer();
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


