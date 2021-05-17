'use strict';

//Defining some global utility variables
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;

//Initialize turn/stun server here
//turnconfig will be defined in public/js/config.js
var pcConfig = turnConfig;

//Set local stream constraints
var localStreamConstraints = {
    audio: true,
    video: {
     facingMode: "environment"
    }
};

var room;

var primus = Primus.connect("/", {
     reconnect: {
         max: Infinity // Number: The max delay before we try to reconnect.
       , min: 500 // Number: The minimum delay before we try reconnect.
       , retries: 10 // Number: How many times we should try to reconnect.
     }
});

// Saving call in db
var dispatcher = sessionStorage.getItem("dispatcher");

if(dispatcher == 0){
     var user = sessionStorage.getItem("id");

     var today = new Date();
     var dateSegment = today.getDate() + '' + (today.getMonth()+1) + '' + today.getFullYear() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
     
     var codeSegment = Math.floor(Math.random() * 1000000000) + 100000000;

     room = dateSegment + '.' + codeSegment;

     var data = {
          user_id: user,
          room: room,
     };

     fetch("/create_call", {
          method: "POST", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })

     primus.write({
          "action": "Update calls",
     });
}
else if(dispatcher == 1){
     var dispatcher = sessionStorage.getItem("id");

     var url_string = window.location.href;
     var url = new URL(url_string);
     var id = url.searchParams.get("id");
     room = url.searchParams.get("room");

     var data = {
          call_id: id,
          dispatcher_id: dispatcher,
          active: 0,
     };

     fetch("/update_call", {
          method: "PUT", 
          headers: {
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
     })

     primus.write({
          "action": "Update calls",
     });
}

//Initializing socket.io
var socket = io.connect();

//Ask server to add in the room if room name is provided by the user
if (room !== '') {
     socket.emit('create or join', room);
     console.log('Attempted to create or  join room', room);
}

//Defining socket events

//Event - Client has created the room i.e. is the first member of the room
socket.on('created', function(room) {
     console.log('Created room ' + room);
     isInitiator = true;
});

//Event - Room is full
socket.on('full', function(room) {
     console.log('Room ' + room + ' is full');
});

//Event - Another client tries to join room
socket.on('join', function (room){
     console.log('Another peer made a request to join room ' + room);
     console.log('This peer is the initiator of room ' + room + '!');
     isChannelReady = true;
});

//Event - Client has joined the room
socket.on('joined', function(room) {
     console.log('joined: ' + room);
     isChannelReady = true;
});

//Event - server asks to log a message
socket.on('log', function(array) {
     console.log.apply(console, array);
});


//Event - for sending meta for establishing a direct connection using WebRTC
//The Driver code
socket.on('message', function(message, room) {
     console.log('Client received message:', message,  room);
     if (message === 'got user media') {
          console.log("ik geraak in de if");
          maybeStart();
     } 
     else if (message.type === 'offer') {
          if (!isInitiator && !isStarted) {
               maybeStart();
          }
          pc.setRemoteDescription(new RTCSessionDescription(message));
          doAnswer();
     } 
     else if (message.type === 'answer' && isStarted) {
          pc.setRemoteDescription(new RTCSessionDescription(message));
     } 
     else if (message.type === 'candidate' && isStarted) {
          var candidate = new RTCIceCandidate({
          sdpMLineIndex: message.label,
          candidate: message.candidate
          });
          pc.addIceCandidate(candidate);
     } 
     else if (message === 'bye' && isStarted) {
          handleRemoteHangup();
     }
});
  


//Function to send message in a room
function sendMessage(message, room) {
     console.log('Client sending message: ', message, room);
     socket.emit('message', message, room);
}



//Displaying Local Stream and Remote Stream on webpage
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
console.log("Going to find Local media");
navigator.mediaDevices.getUserMedia(localStreamConstraints)
.then(gotStream)
.catch(function(e) {
     alert('getUserMedia() error: ' + e.name);
});

//If found local stream
function gotStream(stream) {
     console.log('Adding local stream.');
     localStream = stream;
     localVideo.srcObject = stream;
     sendMessage('got user media', room);
     if (isInitiator) {
          maybeStart();
     }
}

console.log('Getting user media with constraints', localStreamConstraints);

//If initiator, create the peer connection
function maybeStart() {
     console.log("ik geraak in de maybeStart functie");
     console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
     if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
          console.log('>>>>>> creating peer connection');
          createPeerConnection();
          pc.addStream(localStream);
          isStarted = true;
          console.log('isInitiator', isInitiator);
          if (isInitiator) {
               doCall();
          }
     }
}

primus.on("data", (json) => {
     if(json.action === "Switch camera"){
          console.log("outside " + localStreamConstraints.video.facingMode);
          if(localStreamConstraints.video.facingMode == "environment"){
               localStreamConstraints = {
                    audio: true,
                    video: {
                         facingMode: "user"
                    }
               };

               pc.removeStream(localStream);

               navigator.mediaDevices.getUserMedia(localStreamConstraints)
               .then(gotStream)
               .catch(function(e) {
                    alert('getUserMedia() error: ' + e.name);
               });

               console.log("if " + localStreamConstraints.video.facingMode);
          }
          else if(localStreamConstraints.video.facingMode == "user"){
               localStreamConstraints = {
                    audio: true,
                    video: {
                         facingMode: "environment"
                    }
               };

               pc.removeStream(localStream);

               navigator.mediaDevices.getUserMedia(localStreamConstraints)
               .then(gotStream)
               .catch(function(e) {
                    alert('getUserMedia() error: ' + e.name);
               });
               
               console.log("else if " + localStreamConstraints.video.facingMode);
          }
     }
});

//Sending bye if user closes the window
window.onbeforeunload = function() {
     sendMessage('bye', room);
};


//Creating peer connection
function createPeerConnection() {
     try {
          pc = new RTCPeerConnection(pcConfig);
          pc.onicecandidate = handleIceCandidate;
          pc.onaddstream = handleRemoteStreamAdded;
          pc.onremovestream = handleRemoteStreamRemoved;
          console.log('Created RTCPeerConnnection');
     } catch (e) {
          console.log('Failed to create PeerConnection, exception: ' + e.message);
          alert('Cannot create RTCPeerConnection object.');
          return;
     }
}

//Function to handle Ice candidates generated by the browser
function handleIceCandidate(event) {
     console.log('icecandidate event: ', event);
     if (event.candidate) {
          sendMessage({
               type: 'candidate',
               label: event.candidate.sdpMLineIndex,
               id: event.candidate.sdpMid,
               candidate: event.candidate.candidate
          }, room);
     } 
     else {
          console.log('End of candidates.');
     }
}

function handleCreateOfferError(event) {
     console.log('createOffer() error: ', event);
}

//Function to create offer
function doCall() {
     console.log('Sending offer to peer');
     pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

//Function to create answer for the received offer
function doAnswer() {
     console.log('Sending answer to peer.');
     pc.createAnswer().then(
          setLocalAndSendMessage,
          onCreateSessionDescriptionError
     );
}

//Function to set description of local media
function setLocalAndSendMessage(sessionDescription) {
     pc.setLocalDescription(sessionDescription);
     console.log('setLocalAndSendMessage sending message', sessionDescription);
     sendMessage(sessionDescription, room);
}

function onCreateSessionDescriptionError(error) {
     trace('Failed to create session description: ' + error.toString());
}

//Function to play remote stream as soon as this client receives it
function handleRemoteStreamAdded(event) {
     console.log('Remote stream added.');
     remoteStream = event.stream;
     remoteVideo.srcObject = remoteStream;
}

function handleRemoteStreamRemoved(event) {
     console.log('Remote stream removed. Event: ', event);
}

function hangup() {
     console.log('Hanging up.');
     stop();
     sendMessage('bye',room);
}

function handleRemoteHangup() {
     console.log('Session terminated.');
     stop();
     isInitiator = false;
}

function stop() {
     isStarted = false;
     pc.close();
     pc = null;
}