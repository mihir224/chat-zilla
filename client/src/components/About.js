import React from 'react';
import '../styles/About.css';

function About(){
    return(
        <div id='about-div' >
            <h1>About Us</h1>
            <p id='about-txt'>ChatZilla is an innovative real-time messaging web application built on the robust foundation of socket.io. Offering a suite of features including user authentication, chat storage, and the capability for users to seamlessly create and join different rooms, ChatZilla is at the forefront of dynamic online communication. <br/> <br/> Currently in active development, I, Mihir Saini, the developer, am diligently working on integrating cutting-edge video and voice calling functionality using WebRTC. This exciting addition will elevate the user experience, providing a comprehensive platform for both text and multimedia communication. Feel free to explore and test the existing chat features, gaining a firsthand experience of the seamless communication environment that ChatZilla aims to deliver. <br/> <br/>Stay tuned for further updates as we continue to enhance and refine the application for an even more immersive user experience.</p>
        </div>
    )
}

export default About;