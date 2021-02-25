import React,{useState} from 'react';
import './Login.css';
import PeopleSrearch from '../assets/people-search.svg';
import Profile from '../assets/profile.svg';
import user from '../assets/user.png';
import padlock from '../assets/padlock.png';
import emailImg from '../assets/email.png';
import {Link} from 'react-router-dom';
import * as api from '../util/api';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';

const Login = (props) =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSuccessResponse = (data)=>{
        props.onSuccess(data.data.token);
        props.history.push('/contacts');    
    }

    const handleFailureResponse = (data) =>{
        setError(data.message);
        setTimeout(() => {
            setError(null)
        }, 4000);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();  
        const endPoint = 'auth/login';
        const stateObj = {
            email,
            password 
        };
        const [result, data] = await api.post(endPoint, stateObj);
        if (result.status === 200) {
            handleSuccessResponse(data);
        }
        else{
            handleFailureResponse(data);
        }
    }

    let errorMessage = null;
    if (error) {
        errorMessage = (<h1 className="error-message">{error}</h1>)
    }
    return(
        <>
        
        <form className="Login" onSubmit={handleSubmit}>
        {errorMessage}
            <div className="Login-wrapper">
                <img className="Login-people-search"src={PeopleSrearch} alt="people-search"/>
                <div className="Login-right">
                    <img className="Login-profile" src={Profile} alt="profile"/>
                    <h1>welcome</h1>
                    <label htmlFor ="email"className="input-wrapper">
                        <input  
                            type="email" 
                            id="email"  
                            name="email"
                            value={email} 
                            placeholder="&nbsp;"
                            onChange={(e)=>setEmail(e.target.value)} />
                        <span>Email</span>
                        <img src={emailImg} alt="user"/>
                    </label>
                    <label htmlFor ="password"className="input-wrapper">
                        <input  
                            type="password" 
                            id="password" 
                            name="password"
                            value={password} 
                            placeholder= "&nbsp;" 
                            onChange={(e)=>setPassword(e.target.value)}/>
                        <span>Password</span>
                        <img src={padlock} alt="padlock"/>
                    </label>
                    <Link to="/forgotPassword">Forgot Password?</Link>
                    <button className='Login-submit' type="submit">Login</button>
                </div>
            </div>
        </form>
        </>
    );
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token) =>dispatch(actions.onSuccess(token))
    }
}
export default connect(null, mapDispatchToProps)(Login);