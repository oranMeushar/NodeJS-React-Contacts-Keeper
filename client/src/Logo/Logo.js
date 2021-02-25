import React from 'react';
import './Logo.css';
import contactImage from '../assets/contacts.ico';

const Logo = () =>{
    return(
        <div className="Logo">
            <img src={contactImage} alt="contacts"/>
        </div>
    )
}

export default Logo;