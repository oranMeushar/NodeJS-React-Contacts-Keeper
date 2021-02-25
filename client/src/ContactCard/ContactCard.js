import React from 'react';
import './ContactCard.css';
import user from '../assets/user.png';
import emailImg from '../assets/email.png';
import phoneImg from '../assets/phone.png';
import homeImg from '../assets/home.png';

const ContactCard = (props) =>{
    return(
        <div className="ContactCard">
            <div className="ContactCard-detail">
                <img src={user} alt="user"/>
                <h2>{props.contact.name}</h2>
            </div>
            <div className="ContactCard-detail ContactCard-detail-left">
                <img src={emailImg} alt="emailImg"/>
                <h2>{props.contact.email}</h2>
            </div>
            <div className="ContactCard-detail">
                <img src={phoneImg} alt="phone"/>
                <h2>{props.contact.phone}</h2>
            </div>
            <div className="ContactCard-detail ContactCard-detail-left">
                <img src={homeImg} alt="address"/>
                <h2>{props.contact.address}</h2>
            </div>
            <div className="ContactCard-buttons">
                <button 
                className="ContactCard-edit"
                onClick={props.edit}>Edit</button>
                
                <button 
                className="ContactCard-delete"
                onClick={props.delete}>Delete</button>
            </div>

        </div>
    )
}

export default ContactCard;