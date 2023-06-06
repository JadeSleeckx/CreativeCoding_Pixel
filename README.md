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

This code has a backend and frontend. The backend, which is the server using easyRTC, establishes the connection between the two users for the videocall. It also ensures that the prompts are connected to each other, so both users have the same question. The file 'server.js' utilizes the backend. The frontend encompasses everything else, including all the HTML, CSS, and two script files.

- install the required modules:

```
$npm install
```

- start the server:

```
$npm start
```


For more information and further steps, please refer to the details below.

## Back End

#### Viewing the call:
 - Start the localhost
    ```
    $npm run server
    ```

 - In your WebRTC enabled browser, visit your server address including the port. By default port 8080 is used.

 - Surf to http://localhost:8080/

 #### Explanation Code:
 - The code sets up a server using Node.js and the EasyRTC framework for real-time communication

 - It loads required modules such as `http`, `express`, `serveStatic`, and `socketIo`.

 - It imports the EasyRTC module for handling real-time communication functionalities.

 - The process name is set to "node-easyrtc" for identification purposes.

 - An Express app is created and configured to serve static files from a "static" subfolder.

 - An HTTP server is created using the Express app.

 - A Socket.io server is started and attached to the Express server for handling web socket connections.

 - The code defines an array of prompts that will be used in the social experiment.

 - A function is created to randomly select a prompt from the array and store it in the 'prompt' variable.

 - The generatePrompt function is called initially and every 2 minutes thereafter to update the prompt.

 - An interval is set to emit the current prompt to the connected socket clients every 10 seconds.

 - EasyRTC options are configured, setting the log level to "debug".

 - The code overrides the default easyrtcAuth event listener to access its callback and handle authentication.

 - Upon joining a room, the code logs the stored credential for each connection.

 - The EasyRTC server is started and listens for incoming connections.

 - The HTTP server listens on port 8080 (or an environment-specified port) for client requests.


## Front End

## External Setup

### Materials
 - Laptop
 - Raspberry Pi
 - 4 buttons
 - 2 screens
 - 2 webcams

### 2 Gameboys

We have made 2 different ways to make the gameboy, using a lasercutter (wood) or using a cutting plotter (cardboard), you ofcourse can try to put something together yourself, this is you're choice.

The files you need for the lasercutter or cutting plotter are displayed in the folder recources. The Instructions of the detailes and how to use it are in the folder. These are our 2 gameboys, 1 in cardboard, 1 in wood.








