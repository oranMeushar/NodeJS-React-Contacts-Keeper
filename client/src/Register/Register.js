import React,{useState} from 'react';
import './Register.css';
import PeopleSrearch from '../assets/people-search.svg';
import Profile from '../assets/profile.svg';
import user from '../assets/user.png';
import padlock from '../assets/padlock.png';
import emailImg from '../assets/email.png';
import * as api from '../util/api';
import * as actions from '../store/actions/auth'
import {connect} from 'react-redux';

const Register = (props) =>{
    const [userName, setUserName] = useState({
        value:'',
        activeError:''
    });
    const [email, setEmail] = useState({
        value:'',
        activeError:''
    });
    const [password, setPassword] = useState({
        value:'',
        activeError:''
    });
    const [passwordConfirm, setPasswordConfirm] = useState({
        value:'',
        activeError:''
    });
    
    const handleSuccessResponse = (data)=>{
        props.onSuccess(data.data.token);
        props.history.push('/contacts');    
    }

    const handleFailureResponse = (data) =>{
        if (data.errors) {
            for (const key in data.errors) {
                switch (key) { 
                    case 'name':
                        setUserName({value:data.errors[key].message, activeError:'activeError'});
                        break;
                    case 'email':
                        setEmail({value:data.errors[key].message, activeError:'activeError'});
                        break;
                    case 'password':
                        setPassword({value:'', activeError:'activeError'});
                        break;
                    case 'passwordConfirm':
                        setPasswordConfirm({value:'', activeError:'activeError'});
                        break;
                    default:
                        break;
                }
            }
        }
        if (data.message.includes('11000')) {
            setEmail({value:'Email already exists', activeError:'activeError'});
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();  
        const endPoint = 'auth/register';
        const stateObj = {
            name:userName.value,
            email:email.value,
            password:password.value,
            passwordConfirm:passwordConfirm.value
        };
        const [result, data] = await api.post(endPoint, stateObj);
        if (result.status === 201) {
            handleSuccessResponse(data);
        }
        else{
            handleFailureResponse(data);
        }
    }

    return(
        <form className="Register" onSubmit={handleSubmit}>
            <div className="Register-wrapper">
                <img className="Register-people-search"src={PeopleSrearch} alt="people-search"/>
                <div className="Register-right">
                    <img className="Register-profile" src={Profile} alt="profile"/>
                    <h1>sign up</h1>
                    <label htmlFor ="username"className="input-wrapper">
                        <input 
                        value={userName.value} 
                        type="text" 
                        id="username"  
                        name="username" 
                        placeholder="&nbsp;"
                        onChange={(e)=>setUserName({...userName, value:e.target.value})}
                        onFocus={(e)=>setUserName({...userName, activeError:'' })}
                        className={userName.activeError} />
                        <span>UserName</span>
                        <img src={user} alt="user"/>
                    </label>
                    <label htmlFor ="email"className="input-wrapper">
                        <input 
                        value={email.value} 
                        type="email" 
                        id="email"  
                        name="email" 
                        placeholder="&nbsp;"
                        onChange={(e)=>setEmail({...email, value:e.target.value})} 
                        onFocus={(e)=>setEmail({...email, activeError:'' })}
                        className={email.activeError}/>
                        <span>Email</span>
                        <img src={emailImg} alt="user"/>
                    </label>
                    <label htmlFor ="password"className="input-wrapper">
                        <input 
                        value = {password.value} 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder= "&nbsp;" 
                        onChange={(e)=>setPassword({...password, value:e.target.value})}
                        onFocus={(e)=>setPassword({...password, activeError:'' })}
                        className={password.activeError}/>
                        <span>Password</span>
                        <span className="password-min-length">*6 length min</span>
                        <img src={padlock} alt="padlock"/>
                    </label>
                    <label htmlFor ="passwordConfirom"className="input-wrapper">
                        <input 
                        value={passwordConfirm.value} 
                        type="password" 
                        id="passwordConfirom"  
                        name="passwordConfirom" 
                        placeholder="&nbsp;"
                        onChange={(e)=>setPasswordConfirm({...passwordConfirm, value:e.target.value})}
                        onFocus={(e)=>setPasswordConfirm({...passwordConfirm, activeError:'' })}
                        className={passwordConfirm.activeError}/>
                        <span>Confirm Password</span>
                        <img src={padlock} alt="padlock"/>
                    </label>
                    <button className='Register-submit' type="submit">Register</button>
                </div>
            </div>
        </form>
    );
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token) =>dispatch(actions.onSuccess(token))
    }
}


export default connect(null, mapDispatchToProps)(Register);