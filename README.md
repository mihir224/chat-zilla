## ChatZilla

ChatZilla is a chat application powered by Socket.IO, designed to provide real-time messaging capabilities for users. 

## Current Progress

- Initialised socket.IO events
- Developed a responsive chat interface 
- Tested the working of socket events on both client and server side
- Developed interactive sign in and home pages
- Configured MongoDB cloud and initialised collections: Message, Room and User on the server side
- Initialised routes and controllers
- Implemented JWT auth
- API tested all routes
- Implemented signin/signup functionality
- Implemented chat storage
- Added a rooms page and join room functionality


***This project has limited functionality as of now (entry level functionality for socket.io) but I do plan to add more functionality like admin roles and PWA compatibility***

***Note: In production, the JWT isn't visible at the client side due to browser security and the cookie being httpOnly. For this reason, even though user is authenticated by the server upon signin, due to absence of JWT, the user cannot perform any of the CUD operations in production. I'm currently working towards fixing this. You can still, setup the project locally and it will work fine.***