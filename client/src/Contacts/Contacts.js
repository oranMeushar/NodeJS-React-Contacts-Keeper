import React,{useState, useEffect} from 'react';
import './Contacts.css';
import NewContact from '../NewContact/NewContact';
import ContactsList from '../ContactsList/ContactsList';
import * as api from '../util/api';
import {connect} from 'react-redux';

const Contacts = (props) => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isEdit, setIsEdit] = useState({
        value:false,
        contactId:null
    })

    useEffect(async() =>{
        if (!props.token) {
            props.history.push('/login')
        }
        const endPoint = 'contacts';
        const [result, data] = await api.get(endPoint);

        if (result.status === 200) {
            setContacts(data.data.contacts)
        }
    }, []);

    return(
        <div className="Contacts">
            <NewContact 
            contacts={contacts} 
            setContacts={setContacts}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            setAddress={setAddress}
            setIsEdit={setIsEdit}
            name={name}
            email={email}
            phone={phone}
            address={address}
            isEdit={isEdit}
            />
            
            <ContactsList 
            contacts={contacts} 
            setContacts={setContacts}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            setAddress={setAddress}
            setIsEdit={setIsEdit}
            name={name}
            email={email}
            phone={phone}
            address={address}
            isEdit={isEdit}/>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
      token:state.auth.token
    }
  }
export default connect(mapStateToProps)(Contacts);