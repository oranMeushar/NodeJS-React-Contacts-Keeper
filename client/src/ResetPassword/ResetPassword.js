import React, {useState} from 'react';
import './ResetPassword.css';
import padlock from '../assets/padlock.png';
import * as api from '../util/api';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth'

const ResetPassword = (props) => {
    const [password, setPassword] = useState({
        value:'',
        activeError:''
    });
    const [passwordConfirm, setPasswordConfirm] = useState({
        value:'',
        activeError:''
    });



    const handleSuccessResponse = ()=>{
        props.history.push('/login');    
    }

    const handleFailureResponse = (data) =>{
        if (data.errors) {
            for (const key in data.errors) {
                switch (key) { 
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
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();  
        const endPoint = `auth/resetPassword/${props.match.params.resetToken}`;
        const stateObj = {
            password:password.value,
            passwordConfirm:passwordConfirm.value
        };
        const [result, data] = await api.post(endPoint, stateObj);
        if (result.status === 200) {
            handleSuccessResponse();
        }
        else{
            handleFailureResponse(data);
        }
    }


    return(
        <form className="ResetPassword" onSubmit={handleSubmit}>
            <div className="ResetPassword-wrapper">
                    <h1>Reset password</h1>
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
                    <button className='ResetPassword-submit' type="submit">Reset Password</button>
                </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onSuccess:(token) =>dispatch(actions.onSuccess(token))
    }
}

export default connect(null, mapDispatchToProps)(ResetPassword);