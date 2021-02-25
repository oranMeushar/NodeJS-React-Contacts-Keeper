import React,{useState} from 'react';
import './NewContact.css';
import user from '../assets/user.png';
import emailImg from '../assets/email.png';
import * as api from '../util/api';
import rfdc from 'rfdc';

const NewContact = (props) =>{
    const [error, setError] = useState(null);

    const handleSuccessResponse = (data) =>{
        const dataCopy = rfdc()(props.contacts);
        props.setName('');
        props.setEmail('');
        props.setPhone('');
        props.setAddress('');
        if (!props.isEdit.value) {
            dataCopy.push(data.data.contact);
        }
        else{
            let index = dataCopy.findIndex((contact) =>{
                return contact._id === props.isEdit.contactId
            });
            let foundContact = dataCopy.find((contact) =>{
                return contact._id === props.isEdit.contactId
            });
            foundContact = data.data.contact;
            dataCopy.splice(index,1,foundContact)
        }
        props.setContacts(dataCopy);
        props.setIsEdit({value:false, contactId:null});
    }

    const handleFailureResponse = (data) =>{
        let errorText = '';
        for (const key in data.errors) {
            errorText += data.errors[key].message;
        }
        setError(errorText);
        setTimeout(() => {
            setError(null);
        }, 2000);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (props.name.length !== 0 || props.email.length !== 0 || 
            props.phone.length !== 0 || props.address.length !== 0) {
            const endPoint = props.isEdit.value?`contacts/${props.isEdit.contactId}` :'contacts';
            const stateObj = {
                name:props.name,
                email:props.email,
                phone:props.phone,
                address:props.address
            };
            let [result, data] = [null, null];

            if (props.isEdit.value) {
                [result, data] = await api.patch(endPoint, stateObj)
            }
            else{
                [result, data] = await api.post(endPoint, stateObj);
            }
            if (result.status === 201 || result.status === 200) {
                handleSuccessResponse(data);
            }
            else{
                handleFailureResponse(data);
            } 
        }
        else{
            setError('Contact details are empty'); 
            setTimeout(() => {
                setError(null);
            }, 2000);
        }
    }
    return(
        <div className="NewContact">
            <form action="" className="NewContact-form" onSubmit={handleSubmit}>
            {error?<h1 className="NewContact-error">{error}</h1>:null}
                <h1>{props.isEdit.value?`Edit`: `New`} Contact</h1>
                <label htmlFor="name">
                    Name:
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={props.name}
                    onChange={(e)=>props.setName(e.target.value)}/>
                </label>
                <label htmlFor="email">
                    Email:
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={props.email}
                    onChange={(e)=>props.setEmail(e.target.value)}/>
                </label>
                <label htmlFor="phone">
                    Phone:
                    <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={props.phone}
                    onChange={(e)=>props.setPhone(e.target.value)}/>
                </label>
                <label htmlFor="address">
                    Address:
                    <input 
                    type="text" 
                    name="address" 
                    id="address" 
                    value={props.address}
                    onChange={(e)=>props.setAddress(e.target.value)}/>
                </label>
                <button 
                className='NewContact-submit' 
                type="submit">{props.isEdit.value?`Edit`:`Create`}  Contact</button>
            </form>
        </div>
    )
}

export default NewContact;