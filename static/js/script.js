/*
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
*/