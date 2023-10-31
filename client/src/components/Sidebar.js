import React from 'react';
import '../styles/Sidebar.css';

function Sidebar(){
    return (
        <div id='side-bar'>
        <div>
        <label id='list-label' htmlFor='user-list'>Users Connected</label>
        <ul className='sb-list' id='user-list'>
            <li>FDSF</li>
            <li>dadf</li>
        </ul>
        </div>
        <div>
        <label id='list-label' htmlFor='options-list'>Options</label>
        <ul id='options-list' className='sb-list'>
            <li>Call</li>
            <li>Video</li>
        </ul>
        </div>
        </div>
    )
}

export default Sidebar;