var selfEasyrtcid = "";


function connect() {
    easyrtc.setVideoDims(640,480);
    //easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure, {
        url: "https://creative-coding-ap.herokuapp.com/demo_audio_video_simple.html",
        secure: true
    });
}

/*
function clearConnectList() {
    var otherClientDiv = document.getElementById('otherClients');
    while (otherClientDiv.hasChildNodes()) {
        otherClientDiv.removeChild(otherClientDiv.lastChild);
    }
}


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
    }
}
*/


function performCall(otherEasyrtcid) {
    easyrtc.hangupAll();

    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherEasyrtcid, successCB, failureCB);
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("iam").innerHTML = "I am " + easyrtc.cleanId(easyrtcid);
    //toegevoegd
    var roomName = "myroom";
    easyrtc.joinRoom("myRoom", null, function(roomName, otherEasyrtcid) {
        performCall(selfEasyrtcid);
    });

    //performCall(selfEasyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
