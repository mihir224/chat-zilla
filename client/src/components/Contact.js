import React from 'react';
import '../styles/About.css';

function Contact(){
    return (
        <div id='about-div' style={{alignSelf:'flex-start'}}>
        <h1>Contact Us</h1>
        <p id='about-txt' style={{textAlign:'center'}}>Feel free to ask anything. Hit me up at <a id='mail' href='mailto:' target='_blank'>mihirsaini25@gmail.com</a> for any queries.</p>
        </div>
    )
}

export default Contact;