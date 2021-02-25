import React,{useEffect} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions/auth';
import * as api from '../util/api';

const Logout = (props) => {
    useEffect(async() =>{
        const endpoint = 'auth/logout';
        await api.get(endpoint);
        props.onLogout();
    },[])
    return(
        <Redirect to='/login'/>
    )
}

const mapDispatchToProps =(dispatch) =>{
    return{
        onLogout:()=>dispatch(actions.onLogout())
    }
} 

export default connect(null, mapDispatchToProps)(Logout);