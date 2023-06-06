# PIXEL: A SOCIAL EXPERIMENT IN CONNECTION


Step into the world of Pixel, where two giant wooden Gameboys beckon from distant public places. With a single press of the start button, a mysterious connection is forged between them, and you find yourself face-to-face with a pixelated stranger.

Guided only by your voices, you and your partner embark on a journey of discovery. Randomly generated questions appear on the screen, encouraging you to share and connect on a deeper level. The twist? You can't see each other clearly, only pixelated fragments of your beings.

Pixel is a captivating social experiment that explores the power of vulnerability and human connection. Join us as we delve into the profound impact of limited visual information on our willingness to share, understand, and embrace the unknown.

Welcome to Pixel, where strangers meet, secrets unfold, and the pixelated tapestry of our lives reveals the beauty of true connection. Press "start" and let the experiment begin.

If you want to experience the magic of Pixel firsthand and discover the surprising insights it unveils, we invite you to watch our video and visit our website. Immerse yourself in this unique social experiment that challenges the boundaries of connection.

## Information

#### Video
[<img src="Images_Readme/Tumbnail.png" width="100%">](https://www.youtube.com/watch?v=-LSQLKc2v48&ab_channel=JadeSleeckx )

#### Our Website
https://www.pixelgroup.info/

## Installation code

can make this text better: This code has a backend and front end. The backend is the server using easyRTC, this is used for making the connection between the 2 users for the videocall and so that the prompts are connected to each other so both have the same question
### Front End

### Back End




EasyRTC Server Example
======================

This folder contains all the files you'll need to create a simple server with EasyRTC, Express, and Socket.io. You can copy these files where you wish.

Files and Folders:
------------------

 - package.json - Provides project information allowing npm to find and install required modules.
 - server.js - Server code.
 - server_ssl.js - Server code for doing ssl using included keys, for testing purposes.
 - localhost.(key/crt) - self-signed keys for local host.
 - /static/ - Root folder for web server. Put html files here!

 
Installing Required Modules:
----------------------------

 - Type `npm install` in console.
 - This will read the package.json file to find and install the required modules including EasyRTC, Express, and Socket.io.
 - Required modules will go into a new 'node_modules' subfolder


Running the Server:
-------------------

 - Type `npm start` in console.


Viewing the examples:
---------------------

 - In your WebRTC enabled browser, visit your server address including the port. By default port 8080 is used.
 - http://localhost:8080/

Running the Server using docker:
-------------------

 - Type `npm run docker:build` then `npm run docker:start` in console.

Note: Require Docker to be installed.

Running the Server using docker-compose:
-------------------

 - Type `npm run docker-compose:start` in console.

Note: Require docker-compose to be installed.


Manualy build and run container
-------------------

Build:
> docker build . -t easyrtc

Run default:
> docker run -it --name easyrtc -p 8080:8080 easyrtc

Run HTTP server:
> docker run -it --name easyrtc --rm -p 8080:8080 easyrtc run server

Run HTTPS server:
>  docker run -it --name easyrtc --rm -p 8443:8443 easyrtc run server_ssl

Run HTTPS server with custom certs:
>  docker run -it --name easyrtc --rm -p 8443:8443 -v $(pwd)/certs/:/usr/src/app/certs/:ro easyrtc run server_ssl



