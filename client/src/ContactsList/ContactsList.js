import React,{useState, useEffect, useRef} from 'react';
import './ContactsList.css';
import ContactCard from '../ContactCard/ContactCard';
import * as api from '../util/api';
import rfdc from 'rfdc';

const ContactsList = (props) =>{
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [filteredContacts, setFilteredContacts] = useState(props.contacts);
    const inputRef = React.createRef();

    useEffect(()=>{
        inputRef.current.checked = 'checked';
        setFilteredContacts(props.contacts)
    },[props.contacts])

    useEffect(()=>{
        const contactsCopy = rfdc()(props.contacts);
        const filtered = contactsCopy.filter((contact)=>{
            return contact[searchBy.toLocaleLowerCase().trim()].includes(search.toLocaleLowerCase().trim())    
        });
        setFilteredContacts(filtered);  
    }, [search, searchBy])

    const handleDeleteButton = async(contactId) =>{
        const endpoint = 'contacts';
        const [resault, data] = await api.del(endpoint, contactId);
        if (resault.status === 200) {
            let contactsCopy = [...props.contacts];
            contactsCopy = contactsCopy.filter((contact)=>{
                return contact._id !== contactId
            });
            props.setContacts(contactsCopy);
        }
    }

    const handleEditButton = (contact) =>{
        props.setName(contact.name);
        props.setEmail(contact.email);
        props.setPhone(contact.phone);
        props.setAddress(contact.address);
        props.setIsEdit({
            value:true,
            contactId:contact._id
        });
    }

    return(
        <div className="ContactsList">
            <h1>Contacts</h1>
            <input className="ContactsList-search" type="text" placeholder="Search contact..." onChange={(e)=>setSearch(e.target.value)}/>
            <h2>Search by:</h2>
            <div className="ContactsList-radios">
                <label htmlFor="name">
                    Name<input type="radio"  ref={inputRef} id="name" name="search-type" value="name" onChange={()=>setSearchBy('name')}/>  
                </label>
                <label htmlFor="email">
                    Email<input type="radio"  id="email" name="search-type" value="email" onChange={()=>setSearchBy('email')}/>  
                </label>
                <label htmlFor="phone">
                    Phone<input type="radio"  id="phone" name="search-type" value="phone" onChange={()=>setSearchBy('phone')}/>  
                </label>
                <label htmlFor="address">
                    Address<input type="radio"  id="address" name="search-type" value="address" onChange={()=>setSearchBy('address')}/>  
                </label>
                
            </div>

            <div className="ContactsList-wrapper">
                {
                    filteredContacts.map((contact) =>{
                        return (
                           <ContactCard 
                           key={contact._id}
                            contact={contact}
                            delete = {() =>handleDeleteButton(contact._id)}
                            edit = {()=>handleEditButton(contact)}/> 
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ContactsList;